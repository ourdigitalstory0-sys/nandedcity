const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

// Configuration
const SITE_URL = 'https://www.nanded-city.in';
const INDEXNOW_KEY = 'a5f8b9e6c4d742e983f1a0b5c7d8e9fa';
const SERVICE_ACCOUNT_PATH = './service-account.json';

// Google Indexing API Config
const GOOGLE_SCOPE = 'https://www.googleapis.com/auth/indexing';
const GOOGLE_AUDIENCE = 'https://oauth2.googleapis.com/token';

async function createGoogleJWT(keyData) {
  const email = keyData.client_email;
  const privateKey = keyData.private_key;

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iss: email,
    scope: GOOGLE_SCOPE,
    aud: GOOGLE_AUDIENCE,
    iat: now,
    exp: now + 3600,
  };

  const encode = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url');
  const unsignedToken = `${encode(header)}.${encode(payload)}`;

  const sign = crypto.createSign('RSA-SHA256');
  sign.update(unsignedToken);
  const signature = sign.sign(privateKey, 'base64url');

  return `${unsignedToken}.${signature}`;
}

async function getGoogleAccessToken(keyData) {
  const jwt = await createGoogleJWT(keyData);
  const res = await fetch(GOOGLE_AUDIENCE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });
  
  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Google Auth Failed: ${error}`);
  }
  
  const data = await res.json();
  return data.access_token;
}

async function notifyGoogle(url, accessToken) {
  const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      url: url,
      type: 'URL_UPDATED',
    }),
  });
  return await res.json();
}

async function notifyIndexNow(urls) {
  const payload = {
    host: new URL(SITE_URL).hostname,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });
  
  return res.status;
}

// Extract URLs from project data
function getAllUrls() {
  const urls = [
    `${SITE_URL}/`,
    `${SITE_URL}/blog`,
    `${SITE_URL}/projects`,
    `${SITE_URL}/about-us`,
    `${SITE_URL}/legal-compliance`,
    `${SITE_URL}/mr/2-bhk-flats`,
    `${SITE_URL}/mr/bungalow-plots`,
    `${SITE_URL}/lp/2-bhk-flats`,
    `${SITE_URL}/lp/3-bhk-luxury`,
    `${SITE_URL}/lp/na-bungalow-plots`,
  ];

  try {
    // Read clusters
    const clustersContent = fs.readFileSync('src/data/clusters.ts', 'utf-8');
    const clusterIds = clustersContent.match(/id:\s*['"]([^'"]+)['"]/g)?.map(m => m.match(/['"]([^'"]+)['"]/)[1]) || [];
    clusterIds.forEach(id => urls.push(`${SITE_URL}/cluster/${id}`));

    // Read blogs
    const blogsContent = fs.readFileSync('src/data/blogs.ts', 'utf-8');
    const blogSlugs = blogsContent.match(/slug:\s*['"]([^'"]+)['"]/g)?.map(m => m.match(/['"]([^'"]+)['"]/)[1]) || [];
    blogSlugs.forEach(slug => urls.push(`${SITE_URL}/blog/${slug}`));
  } catch (err) {
    console.warn('⚠️ Could not read data files for dynamic URLs, using static list only.');
  }

  return [...new Set(urls)];
}

async function main() {
  console.log('🌌 Starting Sovereign SEO Sweep...');
  const urls = getAllUrls();
  console.log(`🔗 Found ${urls.length} URLs to process.`);

  // 1. IndexNow (Bing/Yandex) - Batch submission
  console.log('\n🚀 Pinging IndexNow (Bing/Yandex)...');
  try {
    const status = await notifyIndexNow(urls);
    if (status === 200) {
      console.log('✅ IndexNow: Success (200)');
    } else {
      console.log(`❌ IndexNow: Failed (Status ${status})`);
    }
  } catch (err) {
    console.error('🔥 IndexNow Error:', err.message);
  }

  // 2. Google Indexing API - Sequential submission
  console.log('\n🚀 Pinging Google Indexing API...');
  if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
    console.log('⚠️ service-account.json not found. Skipping Google Indexing.');
  } else {
    try {
      const keyData = JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_PATH, 'utf8'));
      const accessToken = await getGoogleAccessToken(keyData);
      
      for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        process.stdout.write(`[${i+1}/${urls.length}] ${url} ... `);
        const result = await notifyGoogle(url, accessToken);
        if (result.error) {
          console.log(`❌ ${result.error.message}`);
        } else {
          console.log('✅');
        }
        // Throttling to avoid Google rate limits
        await new Promise(r => setTimeout(r, 200));
      }
    } catch (err) {
      console.error('🔥 Google Indexing Error:', err.message);
    }
  }

  console.log('\n🌟 Sovereign SEO Sweep Complete.');
}

main().catch(err => {
  console.error('💥 Critical Error:', err);
  process.exit(1);
});
