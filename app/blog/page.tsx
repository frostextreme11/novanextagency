import { getAllPosts, getAllTags } from "@/lib/blog";
import type { Metadata } from "next";
import BlogListClient from "./BlogListClient";

export const metadata: Metadata = {
    title: "Blog - Tips Digital Marketing, Website & Teknologi | NovaNext",
    description:
        "Baca artikel terbaru seputar tips pembuatan website, digital marketing, SEO, dan teknologi dari tim NovaNext. Update setiap minggu!",
    openGraph: {
        title: "Blog NovaNext - Tips Digital & Teknologi",
        description:
            "Baca artikel terbaru seputar tips pembuatan website, digital marketing, SEO, dan teknologi.",
        type: "website",
        url: "https://novanext.id/blog",
    },
};

export default function BlogPage() {
    const posts = getAllPosts();
    const tags = getAllTags();

    return <BlogListClient posts={posts} tags={tags} />;
}
