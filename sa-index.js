const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const keyPath = './service-account.json';
const keyData = JSON.parse(fs.readFileSync(keyPath, 'utf8'));

// Scope for Indexing API
const SCOPE = 'https://www.googleapis.com/auth/indexing';
const AUDIENCE = 'https://oauth2.googleapis.com/token';

async function createJWT() {
  const email = keyData.client_email;
  const privateKey = keyData.private_key;

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iss: email,
    scope: SCOPE,
    aud: AUDIENCE,
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

async function getAccessToken() {
  const jwt = await createJWT();
  const res = await fetch(AUDIENCE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });
  const data = await res.json();
  return data.access_token;
}

async function notifyIndexing(url, accessToken) {
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
  const data = await res.json();
  return data;
}

// Extract slugs from data files
const extractSlugs = () => {
    const urls = [
        'https://www.nanded-city.in/',
        'https://www.nanded-city.in/blog',
        'https://www.nanded-city.in/about-us',
        'https://www.nanded-city.in/legal-compliance',
        'https://www.nanded-city.in/mr/2-bhk-flats',
        'https://www.nanded-city.in/mr/bungalow-plots',
        'https://www.nanded-city.in/lp/2-bhk-flats',
        'https://www.nanded-city.in/lp/3-bhk-luxury',
        'https://www.nanded-city.in/lp/na-bungalow-plots',
    ];

    // Read clusters
    const clustersContent = fs.readFileSync('src/data/clusters.ts', 'utf-8');
    const clusterIds = clustersContent.match(/id:\s*['"]([^'"]+)['"]/g)?.map(m => m.match(/['"]([^'"]+)['"]/)[1]) || [];
    clusterIds.forEach(id => urls.push(`https://www.nanded-city.in/cluster/${id}`));

    // Read blogs
    const blogsContent = fs.readFileSync('src/data/blogs.ts', 'utf-8');
    const blogSlugs = blogsContent.match(/slug:\s*['"]([^'"]+)['"]/g)?.map(m => m.match(/['"]([^'"]+)['"]/)[1]) || [];
    blogSlugs.forEach(slug => urls.push(`https://www.nanded-city.in/blog/${slug}`));

    return [...new Set(urls)];
};

(async () => {
  try {
    console.log('🚀 Starting "Hard-Force" Indexing for Nanded City...');
    const accessToken = await getAccessToken();
    const urls = extractSlugs();
    
    console.log(`📡 Found ${urls.length} target URLs to index.`);

    for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        console.log(`[${i+1}/${urls.length}] Pinging Google for: ${url}`);
        const result = await notifyIndexing(url, accessToken);
        if (result.error) {
            console.error(`❌ Error indexing ${url}:`, result.error.message);
        } else {
            console.log(`✅ Success: ${url}`);
        }
        // Small delay to avoid rate limiting
        await new Promise(r => setTimeout(r, 200));
    }

    console.log('\n🌟 "Hard-Force" Indexing Complete. Search dominance incoming.');
  } catch (err) {
    console.error('🔥 Critical error during indexing:', err);
  }
})();
