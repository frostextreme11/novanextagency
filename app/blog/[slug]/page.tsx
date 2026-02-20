import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BlogPostClient from "./BlogPostClient";

// Generate static pages for all blog posts
export async function generateStaticParams() {
    const slugs = getAllSlugs();
    return slugs.map((slug) => ({ slug }));
}

// Dynamic metadata for SEO
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return { title: "Post Not Found" };
    }

    return {
        title: `${post.title} | Blog NovaNext`,
        description: post.description,
        keywords: post.tags,
        authors: [{ name: post.author }],
        openGraph: {
            title: post.title,
            description: post.description,
            type: "article",
            publishedTime: post.date,
            authors: [post.author],
            tags: post.tags,
            url: `https://novanext.id/blog/${slug}`,
            images: post.image
                ? [
                    {
                        url: post.image,
                        width: 1200,
                        height: 630,
                        alt: post.title,
                    },
                ]
                : [],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
        },
    };
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    // JSON-LD Structured Data
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        author: {
            "@type": "Organization",
            name: post.author,
            url: "https://novanext.id",
        },
        publisher: {
            "@type": "Organization",
            name: "NovaNext IT Agency",
            url: "https://novanext.id",
            logo: {
                "@type": "ImageObject",
                url: "https://novanext.id/logo/nn_logo.png",
            },
        },
        datePublished: post.date,
        dateModified: post.date,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://novanext.id/blog/${slug}`,
        },
        image: post.image || "https://novanext.id/logo/nn_logo.png",
        keywords: post.tags.join(", "),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <BlogPostClient post={post} />
        </>
    );
}
