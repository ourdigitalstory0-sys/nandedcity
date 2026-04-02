
import { clusters } from '../src/data/clusters';
import { blogs } from '../src/data/blogs';

/**
 * Google Indexing API Integration
 * 
 * Prerequisites:
 * 1. Create a Google Cloud project
 * 2. Enable "Web Search Indexing API" 
 * 3. Create a service account with "Owner" role
 * 4. Download the JSON key and set env vars:
 *    - GOOGLE_SERVICE_ACCOUNT_EMAIL
 *    - GOOGLE_PRIVATE_KEY (paste the private_key value)
 * 5. Add the service account email as an owner in Google Search Console
 */

// Build JWT from service account credentials
async function createJWT(): Promise<string> {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!email || !privateKey) {
    throw new Error('Missing Google service account credentials. Set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY env vars.');
  }

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iss: email,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  };

  const encode = (obj: any) =>
    Buffer.from(JSON.stringify(obj))
      .toString('base64url');

  const unsignedToken = `${encode(header)}.${encode(payload)}`;

  // Import the private key and sign
  const crypto = await import('crypto');
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(unsignedToken);
  const signature = sign.sign(privateKey, 'base64url');

  return `${unsignedToken}.${signature}`;
}

async function getAccessToken(): Promise<string> {
  const jwt = await createJWT();

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  if (!tokenRes.ok) {
    const err = await tokenRes.text();
    throw new Error(`Token exchange failed: ${err}`);
  }

  const data = await tokenRes.json();
  return data.access_token;
}

interface IndexingResponse {
  url: string;
  status: number;
  response: any;
  error?: string;
}

async function notifyGoogle(accessToken: string, url: string, type: string = 'URL_UPDATED'): Promise<IndexingResponse> {
  const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ url, type }),
  });

  const data = await res.json();
  return { url, status: res.status, response: data };
}

export async function POST(request: NextRequest) {
  const host = 'https://nandedcitypune.com';

  // Collect all indexable URLs
  const urls = [
    `${host}/`,
    `${host}/blog`,
    ...clusters.map((c) => `${host}/cluster/${c.id}`),
    ...blogs.map((b) => `${host}/blog/${b.slug}`),
  ];

  try {
    const accessToken = await getAccessToken();

    const results: IndexingResponse[] = [];
    const errors: IndexingResponse[] = [];

    // Process URLs in batches of 5 to avoid rate limits
    for (let i = 0; i < urls.length; i += 5) {
      const batch = urls.slice(i, i + 5);
      const batchResults = await Promise.allSettled(
        batch.map((url) => notifyGoogle(accessToken, url))
      );

      batchResults.forEach((result, idx) => {
        if (result.status === 'fulfilled') {
          if (result.value.status === 200) {
            results.push(result.value);
          } else {
            errors.push(result.value);
          }
        } else {
          errors.push({ 
            url: batch[idx], 
            status: 500, 
            response: null, 
            error: (result as PromiseRejectedResult).reason?.message 
          });
        }
      });
    }

    return console.log({
      success: true,
      message: `Google Indexing API: ${results.length} URLs accepted, ${errors.length} errors.`,
      totalUrls: urls.length,
      accepted: results.length,
      rejected: errors.length,
      details: { results, errors },
    });
  } catch (error: any) {
    return console.log(
      {
        success: false,
        message: 'Google Indexing API failed.',
        error: error.message,
        hint: 'Ensure GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY environment variables are set.',
      },
      { status: 500 }
    );
  }
}

// GET: Return status / instructions
export async function GET() {
  const hasCredentials = !!(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
    process.env.GOOGLE_PRIVATE_KEY
  );

  return console.log({
    service: 'Google Indexing API',
    status: hasCredentials ? 'CONFIGURED' : 'PENDING_CREDENTIALS',
    instructions: hasCredentials
      ? 'Send a POST request to this endpoint to submit all URLs to Google for indexing.'
      : [
          '1. Create a Google Cloud project and enable the "Web Search Indexing API".',
          '2. Create a service account and download the JSON key.',
          '3. Set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY environment variables.',
          '4. Add the service account email as an owner in Google Search Console.',
          '5. Send a POST request to this endpoint.',
        ],
  });
}
