import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "नांदेड सिटी पुणे | Nanded City Pune Residential Projects",
  description: "नांदेड सिटी पुणे (सिंहगड रोड) मधील सर्वोत्कृष्ट 2 BHK आणि 3 BHK लक्झरी फ्लॅट्स आणि एन.ए. (N.A.) बंगलो प्लॉट्स. १०% बुकींग अमाउंट आणि शून्य ब्रोकरेज.",
  openGraph: {
    title: "नांदेड सिटी पुणे | Nanded City Pune Residential Projects",
    description: "नांदेड सिटी पुणे (सिंहगड रोड) मधील सर्वोत्कृष्ट 2 BHK, 3 BHK आणि बंगलो प्लॉट्स.",
    locale: "mr_IN",
    type: "website",
  },
  alternates: {
    canonical: 'https://nandedcitypune.com/mr',
    languages: {
      'mr-IN': 'https://nandedcitypune.com/mr',
    },
  },
};

export default function MarathiLayout({ children }: { children: React.ReactNode }) {
  // Localized WebSite Schema for Marathi
  const mrWebsiteSchema: any = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://nandedcitypune.com/mr/#website",
    "name": "नांदेड सिटी पुणे",
    "url": "https://nandedcitypune.com/mr",
    "description": "नांदेड सिटी पुणे (सिंहगड रोड) मधील 2 BHK, 3 BHK आणि बंगलो प्लॉट्स.",
    "inLanguage": "mr-IN"
  };

  return (
    <div lang="mr">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mrWebsiteSchema) }}
      />
      {children}
    </div>
  );
}
