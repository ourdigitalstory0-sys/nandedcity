'use client';

import { useEffect, useCallback } from 'react';

/**
 * GTM DataLayer Event Helper
 * Provides utility functions for firing conversion events.
 * 
 * Usage: import { fireGtmEvent } from './GtmEvents';
 *        fireGtmEvent('enquiry_form_submit', { cluster: 'Saajgiri', bhk: '3 BHK' });
 */

export function fireGtmEvent(eventName, eventData = {}) {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...eventData,
      timestamp: new Date().toISOString(),
    });
  }
}

// Pre-defined event helpers
export const gtmEvents = {
  enquiryFormSubmit: (clusterName, bhk) => {
    fireGtmEvent('enquiry_form_submit', {
      cluster_name: clusterName,
      bhk_type: bhk,
      form_location: 'cluster_page',
    });
  },
  
  contactFormSubmit: (clusterName) => {
    fireGtmEvent('contact_form_submit', {
      cluster_name: clusterName,
      form_location: 'homepage',
    });
  },

  modalOpen: (context) => {
    fireGtmEvent('modal_open', {
      modal_context: context, // PLOT, APARTMENT, TOWNSHIP, GENERAL
    });
  },

  modalFormSubmit: (context, name) => {
    fireGtmEvent('modal_form_submit', {
      modal_context: context,
      lead_name: name,
    });
  },

  whatsappClick: (source) => {
    fireGtmEvent('whatsapp_click', {
      click_source: source, // header, footer, floating, modal, blog_sidebar
    });
  },

  phoneCallClick: (source) => {
    fireGtmEvent('phone_call_click', {
      click_source: source,
    });
  },

  clusterCardClick: (clusterId, clusterName) => {
    fireGtmEvent('cluster_card_click', {
      cluster_id: clusterId,
      cluster_name: clusterName,
    });
  },

  blogArticleView: (slug, title) => {
    fireGtmEvent('blog_article_view', {
      article_slug: slug,
      article_title: title,
    });
  },
};

/**
 * GtmScript Component — renders the GTM container script.
 * Place this inside <head> in layout.js
 */
export function GtmScript({ gtmId = 'GTM-XXXXXXX' }) {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `,
        }}
      />
    </>
  );
}

/**
 * GtmNoScript Component — renders the GTM noscript fallback.
 * Place this at the top of <body> in layout.js
 */
export function GtmNoScript({ gtmId = 'GTM-XXXXXXX' }) {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
}

export default function GtmEvents() {
  // This component doesn't render anything — it's just an export container
  return null;
}
