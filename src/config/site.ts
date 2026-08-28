export const SITE_CONFIG = {
  name: "Nanded City Township Pune",
  description: "Official residential platform for Nanded City Township Pune, dominating the Pune Real Estate Market on Sinhagad Road and Central Pune. Explore 1, 2, 2.5 & 3 BHK luxury flats and branded NA bungalow plots.",
  baseUrl: "https://www.nanded-city.in",
  contact: {
    phone: "+91 7744009295",
    phoneNumeric: "7744009295",
    address: "Nanded City Township, Sinhagad Road, Pune - 411041",
    whatsapp: "https://wa.me/917744009295?text=Hi,%20I%20am%20interested%20in%20the%20project.",
    whatsappPrompt: "Chat with Sales Expert",
    location: {
      latitude: 18.4425,
      longitude: 73.81,
    },
  },
  social: {
    facebook: "https://www.facebook.com/nandedcitypune",
    instagram: "https://www.instagram.com/nandedcitypune",
  },
  brand: {
    organizationName: "PropSmart Realty",
    developerName: "Nanded City Developers Pune",
    logo: "/nc-logo.png",
    ogImage: "https://nandedcitypune.com/aalaap/assets/img/img-hero-banner-02.jpg",
  },
  seo: {
    primaryKeywords: [
      "Nanded City Township Pune",
      "Nanded City Sinhagad Road",
      "Pune Real Estate Market",
      "Premium Flats in Nanded City",
      "2 BHK Nanded City",
      "3 BHK Sinhagad Road",
      "NA Bungalow Plots Pune",
      "Khadakwasla Real Estate",
      "Top Real Estate in Pune",
      "MahaRERA Registered Projects Pune"
    ].join(", "),
  }
};

export function getWhatsappLink(pathname?: string | null) {
  const base = "https://wa.me/917744009295";
  let text = "Hi, I am interested in Nanded City properties.";
  
  if (pathname) {
    if (pathname.includes('/cluster/')) {
      const slug = pathname.split('/').pop() || '';
      const projectName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      text = `Hi, I am interested in the ${projectName} project at Nanded City.`;
    } else if (pathname.includes('/lp/')) {
      const slug = pathname.split('/').pop() || '';
      const campaignName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      text = `Hi, I am interested in ${campaignName} at Nanded City.`;
    } else if (pathname.includes('/mr/')) {
      const slug = pathname.split('/').pop() || '';
      const campaignName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      text = `Hi, I am interested in ${campaignName} at Nanded City (Marathi Inquiry).`;
    } else if (pathname.includes('/blog/')) {
      const slug = pathname.split('/').pop() || '';
      const blogName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      text = `Hi, I read the article "${blogName}" and am interested in Nanded City.`;
    }
  }
  return `${base}?text=${encodeURIComponent(text)}`;
}
