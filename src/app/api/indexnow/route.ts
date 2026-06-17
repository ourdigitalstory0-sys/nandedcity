import { NextRequest, NextResponse } from 'next/server';

import { clusters } from '../../../data/clusters';
import { blogs } from '../../../data/blogs';

export async function GET(request: NextRequest) {
  // CRON_SECRET Security Guard
  const authHeader = request.headers.get('Authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized. Invalid CRON_SECRET.' }, { status: 401 });
  }

  const host = "www.nanded-city.in";
  // The unique key for IndexNow for this domain
  // In a production environment, this should match a hosted text file at the server root.
  const key = "a5f8b9e6c4d742e983f1a0b5c7d8e9fa"; 

  const urlList = [
    `https://${host}/`,
    `https://${host}/blog`,
    `https://${host}/about-us`,
    `https://${host}/legal-compliance`,
    `https://${host}/projects`,
    `https://${host}/mr/2-bhk-flats`,
    `https://${host}/mr/bungalow-plots`,
    `https://${host}/lp/2-bhk-flats`,
    `https://${host}/lp/3-bhk-luxury`,
    `https://${host}/lp/na-bungalow-plots`,
    ...clusters.map((c) => `https://${host}/cluster/${c.id}`),
    ...blogs.map((b) => `https://${host}/blog/${b.slug}`)
  ];

  const payload = {
    host: host,
    key: key,
    keyLocation: `https://${host}/${key}.txt`,
    urlList: urlList
  };

  try {
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      return NextResponse.json({ 
        success: true, 
        message: "Successfully submitted properties to IndexNow (Bing/Yandex).", 
        urlsSubmitted: urlList.length 
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: "Failed to submit to IndexNow API.", 
        status: response.status 
      }, { status: 500 });
    }
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      message: "Network Error contacting IndexNow API.", 
      error: error.message 
    }, { status: 500 });
  }
}
