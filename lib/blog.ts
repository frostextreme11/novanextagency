import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface BlogPost {
    slug: string;
    title: string;
    description: string;
    date: string;
    author: string;
    tags: string[];
    image?: string;
    readingTime: string;
    content: string;
}

export interface BlogPostMeta {
    slug: string;
    title: string;
    description: string;
    date: string;
    author: string;
    tags: string[];
    image?: string;
    readingTime: string;
}

function ensureBlogDir() {
    if (!fs.existsSync(BLOG_DIR)) {
        fs.mkdirSync(BLOG_DIR, { recursive: true });
    }
}

export function getAllPosts(): BlogPostMeta[] {
    ensureBlogDir();

    const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

    const posts = files
        .map((filename) => {
            const slug = filename.replace(/\.mdx$/, "");
            const filePath = path.join(BLOG_DIR, filename);
            const fileContent = fs.readFileSync(filePath, "utf-8");
            const { data, content } = matter(fileContent);
            const stats = readingTime(content);

            return {
                slug,
                title: data.title || "Untitled",
                description: data.description || "",
                date: data.date || new Date().toISOString(),
                author: data.author || "NovaNext Team",
                tags: data.tags || [],
                image: data.image || null,
                readingTime: stats.text,
            } as BlogPostMeta;
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
    ensureBlogDir();

    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
        return null;
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    const stats = readingTime(content);

    return {
        slug,
        title: data.title || "Untitled",
        description: data.description || "",
        date: data.date || new Date().toISOString(),
        author: data.author || "NovaNext Team",
        tags: data.tags || [],
        image: data.image || null,
        readingTime: stats.text,
        content,
    };
}

export function getAllSlugs(): string[] {
    ensureBlogDir();

    return fs
        .readdirSync(BLOG_DIR)
        .filter((f) => f.endsWith(".mdx"))
        .map((f) => f.replace(/\.mdx$/, ""));
}

export function getAllTags(): string[] {
    const posts = getAllPosts();
    const tagSet = new Set<string>();
    posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet).sort();
}
