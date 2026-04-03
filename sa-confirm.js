const fs = require('fs');
const crypto = require('crypto');
const http = require('https');

const keyPath = '/Users/vikasyewle/Downloads/thematic-gift-461211-f1-a2ecf3247eb6.json';
const keyData = JSON.parse(fs.readFileSync(keyPath, 'utf8'));

async function createJWT() {
  const email = keyData.client_email;
  const privateKey = keyData.private_key;

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iss: email,
    scope: 'https://www.googleapis.com/auth/siteverification',
    aud: 'https://oauth2.googleapis.com/token',
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
  const res = await fetch('https://oauth2.googleapis.com/token', {
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

async function confirmToken(accessToken) {
  const res = await fetch('https://www.googleapis.com/siteVerification/v1/webResource?verificationMethod=FILE', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      site: {
        identifier: 'https://www.nanded-city.in/',
        type: 'SITE',
      },
    }),
  });
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

(async () => {
  const token = await getAccessToken();
  await confirmToken(token);
})();
