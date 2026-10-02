import { getAllPosts } from "@/lib/blog";
import { TEST_SHOWCASES } from "@/lib/test-showcases";
import type { MetadataRoute } from "next";

// ponytail: single auto-updating sitemap for static pages, blog posts, and all live test showcases.
export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://novanext.id";

    // Static core pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${baseUrl}/test-showcase`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/showcase`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/about-us`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
    ];

    // Dynamic blog posts
    const posts = getAllPosts();
    const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    // Dynamic test showcases (deep indexed for search engines)
    const showcasePages: MetadataRoute.Sitemap = TEST_SHOWCASES.map((item) => ({
        url: `${baseUrl}/test-showcase?id=${encodeURIComponent(item.id)}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    return [...staticPages, ...blogPages, ...showcasePages];
}
