import {MetadataRoute} from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/private/",
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: "/test/",
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: "/tmp/",
      },
    ],
    host: "piyolamarket.uz",
    sitemap: "https://piyolamarket.uz/sitemap.xml",
  }
}
