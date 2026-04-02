import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Nanded City Pune | Exclusive Offers & Pricing",
  description: "Secure the best pricing with zero brokerage for premium 2, 2.5, and 3 BHK luxury flats at Nanded City, Sinhagad Road, Pune.",
  robots: {
    index: false, // Essential: We DO NOT want Google indexing ad-specific landing pages and causing duplicate content penalties.
    follow: false,
  }
};

export default function LandingPageLayout({ children }: { children: React.ReactNode }) {
  // We use CSS to hide the global header and footer since they are injected by the root layout.
  // This traps the user on the landing page, dramatically increasing conversion rates for Ads.
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        #site-header, #site-footer, .floating-action-bar { 
          display: none !important; 
        }
        main {
          padding-top: 0 !important;
        }
      `}} />
      <div className="landing-page-wrapper">
        {children}
      </div>
    </>
  );
}
