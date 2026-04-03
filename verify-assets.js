const fs = require('fs');
const https = require('https');
const http = require('http');

const fileContent = fs.readFileSync('src/data/clusters.ts', 'utf-8');

// Regex to find all URLs matched to image/heroImage/qrImage
const urlRegex = /https?:\/\/[^\s"',]+/g;
const matchedUrls = fileContent.match(urlRegex) || [];

const uniqueUrls = [...new Set(matchedUrls)].filter(u => 
  u.includes('png') || 
  u.includes('jpg') || 
  u.includes('jpeg') || 
  u.includes('webp') || 
  u.includes('wp-content') || 
  u.includes('assets')
);

console.log(`Found ${uniqueUrls.length} unique asset URLs to verify.`);

async function checkUrl(urlStr) {
  return new Promise((resolve) => {
    const parsed = new URL(urlStr);
    const client = parsed.protocol === 'https:' ? https : http;
    const req = client.request(urlStr, { method: 'HEAD', timeout: 5000 }, (res) => {
      resolve({ url: urlStr, status: res.statusCode });
    });
    
    req.on('error', (e) => {
      resolve({ url: urlStr, status: 'ERROR', message: e.message });
    });
    
    req.on('timeout', () => {
      req.destroy();
      resolve({ url: urlStr, status: 'TIMEOUT' });
    });
    
    req.end();
  });
}

async function verifyAll() {
  const brokenUrls = [];
  const validUrls = [];
  
  for (const url of uniqueUrls) {
    const result = await checkUrl(url);
    if (result.status >= 400 || result.status === 'ERROR' || result.status === 'TIMEOUT') {
      brokenUrls.push(result);
    } else {
      validUrls.push(result);
    }
  }
  
  console.log('\n--- VERIFICATION RESULTS ---');
  console.log(`Valid assets: ${validUrls.length}`);
  console.log(`Broken assets: ${brokenUrls.length}\n`);
  
  if (brokenUrls.length > 0) {
    console.error('BROKEN ASSETS FOUND:');
    brokenUrls.forEach(b => console.error(`${b.status}: ${b.url}`));
  } else {
    console.log('✅ ALL VISUAL ASSETS ARE HEALTHY AND NON-BROKEN.');
  }
}

verifyAll();
