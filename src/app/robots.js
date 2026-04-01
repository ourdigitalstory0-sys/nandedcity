export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://nandedcitypune.com/sitemap.xml',
    host: 'https://nandedcitypune.com',
  };
}
