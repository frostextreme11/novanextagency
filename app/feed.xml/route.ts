import { getAllPosts } from "@/lib/blog";

export async function GET() {
    const baseUrl = "https://novanext.id";
    const posts = getAllPosts();

    const rssItems = posts
        .map(
            (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>hello@novanext.id (${post.author})</author>
      ${post.tags.map((tag) => `<category>${tag}</category>`).join("\n      ")}
    </item>`
        )
        .join("");

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog NovaNext - Tips Digital Marketing &amp; Teknologi</title>
    <description>Artikel terbaru seputar tips pembuatan website, digital marketing, SEO, dan teknologi dari tim NovaNext.</description>
    <link>${baseUrl}/blog</link>
    <language>id</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`;

    return new Response(rss, {
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "s-maxage=3600, stale-while-revalidate",
        },
    });
}
