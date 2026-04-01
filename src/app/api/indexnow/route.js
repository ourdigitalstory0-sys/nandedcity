import { NextResponse } from 'next/server';
import { clusters } from '../../../data/clusters';

export async function GET() {
  const host = "nandedcitypune.com";
  // The unique key for IndexNow for this domain
  // In a production environment, this should match a hosted text file at the server root.
  const key = "a5f8b9e6c4d742e983f1a0b5c7d8e9fa"; 

  const urlList = [
    `https://${host}/`,
    ...clusters.map((c) => `https://${host}/cluster/${c.id}`)
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
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      message: "Network Error contacting IndexNow API.", 
      error: error.message 
    }, { status: 500 });
  }
}
