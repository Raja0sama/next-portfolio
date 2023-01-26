/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.SITE_URL || "https://rajaosama.me";
module.exports = {
  siteUrl,
  generateRobotsTxt: true, // (optional)
  additionalSitemaps: [`${siteUrl}/serversite.xml`],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
  // ...other options
};
