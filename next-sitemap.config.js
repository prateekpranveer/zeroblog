/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://zeroframedrop.com', // ✅ Your live site URL
  generateRobotsTxt: true,               // ✅ Automatically generate robots.txt
  sitemapSize: 5000,                     // ✅ Adjust if needed
  changefreq: 'weekly',                  // ✅ Optional
  priority: 0.7,                         // ✅ Optional
  exclude: ['/studio/*'],                // ✅ Optional: Exclude Sanity Studio or other paths
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/studio' }, // Example
    ],
  },
};
