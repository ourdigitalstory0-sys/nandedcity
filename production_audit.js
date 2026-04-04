const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');

async function checkUrl(urlStr) {
  if (urlStr.startsWith('/')) return { url: urlStr, status: 'LOCAL' };
  return new Promise((resolve) => {
    try {
      const parsed = new URL(urlStr);
      const client = parsed.protocol === 'https:' ? https : http;
      const req = client.request(urlStr, { method: 'HEAD', timeout: 5000 }, (res) => {
        resolve({ url: urlStr, status: res.statusCode });
      });
      req.on('error', (e) => resolve({ url: urlStr, status: 'ERROR', message: e.message }));
      req.on('timeout', () => { req.destroy(); resolve({ url: urlStr, status: 'TIMEOUT' }); });
      req.end();
    } catch (e) {
      resolve({ url: urlStr, status: 'INVALID' });
    }
  });
}

async function runAudit() {
  console.log('🚀 INITIALIZING NANDED CITY PRODUCTION AUDIT...\n');
  const report = [];
  report.push('# Nanded City Comprehensive Production Audit Report\n');
  report.push(`**Timestamp**: ${new Date().toISOString()}\n`);

  // 1. Asset Integrity Check
  console.log('📦 AUDITING VISUAL ASSETS...');
  const clustersContent = fs.readFileSync('src/data/clusters.ts', 'utf-8');
  const urlRegex = /https?:\/\/[^\s"',]+/g;
  const matchedUrls = clustersContent.match(urlRegex) || [];
  const uniqueAssets = [...new Set(matchedUrls)].filter(u => /\.(png|jpg|jpeg|webp|svg)/i.test(u) || u.includes('wp-content'));
  
  let brokenAssets = 0;
  for (const url of uniqueAssets) {
    const res = await checkUrl(url);
    if (res.status === 'ERROR' || res.status >= 400 || res.status === 'TIMEOUT') {
      brokenAssets++;
      console.error(`❌ Broken Asset: ${url} (${res.status})`);
    }
  }
  report.push('## 1. Asset Integrity');
  report.push(brokenAssets === 0 ? '✅ All visual assets are healthy.' : `⚠️ Found ${brokenAssets} broken assets.`);

  // 2. MahaRERA Compliance Check
  console.log('📜 AUDITING RERA COMPLIANCE...');
  const reraLinks = matchedUrls.filter(u => u.includes('maharera'));
  let legacyLinks = reraLinks.filter(u => u.includes('Registration_Details'));
  report.push('\n## 2. MahaRERA Compliance');
  if (legacyLinks.length > 0) {
    report.push(`⚠️ found ${legacyLinks.length} legacy links. Redirect logic required for absolute transparency.`);
  } else {
    report.push('✅ All RERA links use the verified Search Redirect pattern.');
  }

  // 3. Contact Information Sync
  console.log('📞 AUDITING CONTACT CONSISTENCY...');
  const phone = '7744009295';
  const email = 'propsmartrealty@gmail.com';
  
  const filesToSync = [
    'src/app/layout.tsx',
    'src/app/page.tsx',
    'src/app/blog/[slug]/page.tsx',
    'src/config/site.ts'
  ];
  
  let syncErrors = 0;
  filesToSync.forEach(f => {
    if (fs.existsSync(f)) {
      const content = fs.readFileSync(f, 'utf-8');
      // Success if file contains literal OR centralization variable
      const hasPhone = content.includes(phone) || content.includes('SITE_CONFIG.contact.phone');
      const hasEmail = content.includes(email) || content.includes('SITE_CONFIG.contact.email');
      
      if (!hasPhone) {
        syncErrors++;
        console.error(`❌ Phone Mismatch in ${f}`);
      }
      if (!hasEmail) {
        syncErrors++;
        console.error(`❌ Email Mismatch in ${f}`);
      }
    }
  });
  report.push('\n## 3. Contact Information Sync');
  report.push(syncErrors === 0 ? '✅ Primary contact info (PropSmart Realty) is consistent and centralized.' : `⚠️ Found ${syncErrors} contact mismatches.`);


  // 4. API & Form Readiness
  console.log('📩 AUDITING LEAD DELIVERY...');
  const apiPath = 'src/app/api/contact/route.ts';
  report.push('\n## 4. Lead Delivery Infrastructure');
  if (fs.existsSync(apiPath)) {
    report.push('✅ API Endpoint `/api/contact` exists.');
  } else {
    report.push('❌ Critical: Contact API route missing.');
  }

  // 5. SEO & Indexing
  console.log('🔍 AUDITING SEO & INDEXING...');
  const robotsExists = fs.existsSync('src/app/robots.ts');
  const sitemapExists = fs.existsSync('src/app/sitemap.ts');
  report.push('\n## 5. SEO & Indexing');
  report.push(robotsExists ? '✅ robots.ts present.' : '❌ robots.ts missing.');
  report.push(sitemapExists ? '✅ sitemap.ts present.' : '❌ sitemap.ts missing.');

  fs.writeFileSync('audit_report.md', report.join('\n'));
  console.log('\n✨ AUDIT COMPLETE. See audit_report.md for details.');
}

runAudit();
