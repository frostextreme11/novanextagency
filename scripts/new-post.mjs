/**
 * ============================================
 *  NovaNext Blog Post Generator (v2 - Super Robust)
 * ============================================
 *  
 *  CARA PAKAI:
 *  1. Paste konten blog (hasil dari LLM) ke file: content/draft.mdx
 *  2. Jalankan: npm run new-post
 *  3. Selesai! File otomatis dipindahkan ke content/blog/[slug].mdx
 *
 *  Script ini SANGAT ROBUST dan bisa handle:
 *  - Frontmatter yang benar (---)
 *  - Frontmatter yang rusak / semua di satu baris
 *  - Tanpa frontmatter sama sekali (auto-extract judul dari heading)
 *  - Format apapun dari LLM manapun
 *
 * ============================================
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, "..");
const DRAFT_FILE = path.join(ROOT_DIR, "content", "draft.mdx");
const BLOG_DIR = path.join(ROOT_DIR, "content", "blog");

// Ensure directories exist
if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
}

function generateSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
        .substring(0, 80); // limit slug length
}

function getToday() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

/**
 * Extract a quoted value from text like: title: "Some Title"
 */
function extractQuotedValue(text, key) {
    // Try: key: "value" or key: 'value'
    const regex = new RegExp(`${key}\\s*:\\s*["']([^"']+)["']`, "i");
    const match = text.match(regex);
    return match ? match[1] : null;
}

/**
 * Extract array value from text like: tags: ["a", "b", "c"]
 */
function extractArrayValue(text, key) {
    const regex = new RegExp(`${key}\\s*:\\s*\\[([^\\]]+)\\]`, "i");
    const match = text.match(regex);
    if (!match) return [];
    return match[1]
        .split(",")
        .map((v) => v.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
}

/**
 * Try to extract title from first heading in content
 */
function extractTitleFromHeading(content) {
    // Look for # or ## heading
    const match = content.match(/^#{1,2}\s+(.+)$/m);
    return match ? match[1].trim() : null;
}

/**
 * Try standard frontmatter parsing (proper --- delimiters)
 */
function tryStandardFrontmatter(content) {
    const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
    if (!match) return null;

    const fmBlock = match[1].trim();
    const body = match[2].trim();

    // Check if frontmatter block is valid (has key: value pairs on separate lines)
    const lines = fmBlock.split("\n").filter((l) => l.trim());
    const hasMultipleLines = lines.length >= 2;
    const hasKeyValue = lines.some((l) => /^\w+\s*:/.test(l.trim()));

    if (!hasMultipleLines || !hasKeyValue) return null;

    // Parse YAML-like frontmatter
    const data = {};
    let currentKey = null;
    let arrayValues = [];
    let inArray = false;

    for (const line of fmBlock.split("\n")) {
        const trimmed = line.trim();

        if (inArray && trimmed.startsWith("- ")) {
            arrayValues.push(trimmed.slice(2).replace(/^["']|["']$/g, "").trim());
            continue;
        }

        if (inArray && currentKey) {
            data[currentKey] = arrayValues;
            inArray = false;
            arrayValues = [];
            currentKey = null;
        }

        const kvMatch = trimmed.match(/^(\w+)\s*:\s*(.*)$/);
        if (kvMatch) {
            const key = kvMatch[1];
            let value = kvMatch[2].trim();

            if (!value || value === "|") {
                currentKey = key;
                inArray = true;
                arrayValues = [];
                continue;
            }

            const inlineArr = value.match(/^\[(.+)\]$/);
            if (inlineArr) {
                data[key] = inlineArr[1]
                    .split(",")
                    .map((v) => v.trim().replace(/^["']|["']$/g, ""));
                continue;
            }

            data[key] = value.replace(/^["']|["']$/g, "");
        }
    }

    if (inArray && currentKey) {
        data[currentKey] = arrayValues;
    }

    return { data, body };
}

/**
 * Try to parse broken frontmatter (all on one line, missing closing ---, etc.)
 */
function tryBrokenFrontmatter(content) {
    // Remove leading --- and any ## markdown artifacts
    let text = content.replace(/^---\s*\n?/, "").replace(/^##\s*/, "");

    // Try to find title in the first few lines
    const title = extractQuotedValue(text, "title");
    if (!title) return null;

    const description = extractQuotedValue(text, "description") || "";
    const date = extractQuotedValue(text, "date") || getToday();
    const author = extractQuotedValue(text, "author") || "NovaNext Team";
    const tags = extractArrayValue(text, "tags");
    const image = "/blog/default.jpg";

    // Extract body: everything after the frontmatter line(s)
    // Find where the actual content starts (first line that doesn't contain key: "value" patterns)
    const lines = content.split("\n");
    let bodyStartIndex = 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // Skip empty lines, --- lines, and lines that look like frontmatter
        if (
            line === "" ||
            line === "---" ||
            line.startsWith("##") && line.includes("title:") ||
            /^(title|description|date|author|tags|image)\s*:/.test(line)
        ) {
            bodyStartIndex = i + 1;
            continue;
        }

        // If line contains multiple frontmatter fields (broken single-line format)
        if (line.includes('title:') && line.includes('description:')) {
            bodyStartIndex = i + 1;
            continue;
        }

        // This line looks like content, stop here
        break;
    }

    const body = lines.slice(bodyStartIndex).join("\n").trim();

    return {
        data: { title, description, date, author, tags, image },
        body,
    };
}

/**
 * Last resort: no frontmatter at all, just extract from content
 */
function tryNoFrontmatter(content) {
    // Clean up content (remove any stray --- at the top)
    let cleanContent = content.replace(/^---\s*\n?/, "").trim();

    const title = extractTitleFromHeading(cleanContent);
    if (!title) return null;

    // Remove the title heading from body
    const body = cleanContent.replace(/^#{1,2}\s+.+\n?/, "").trim();

    return {
        data: {
            title,
            description: title,
            date: getToday(),
            author: "NovaNext Team",
            tags: [],
            image: "/blog/default.jpg",
        },
        body,
    };
}

/**
 * Main parser: tries multiple strategies
 */
function parseContent(content) {
    // Strategy 1: Standard frontmatter
    let result = tryStandardFrontmatter(content);
    if (result && result.data.title) {
        console.log("   ℹ️  Format: Standard frontmatter ✓");
        return result;
    }

    // Strategy 2: Broken frontmatter (single line, missing ---, etc.)
    result = tryBrokenFrontmatter(content);
    if (result && result.data.title) {
        console.log("   ℹ️  Format: Auto-recovered from broken frontmatter ✓");
        return result;
    }

    // Strategy 3: No frontmatter at all, extract from content
    result = tryNoFrontmatter(content);
    if (result && result.data.title) {
        console.log("   ℹ️  Format: Auto-generated from content headings ✓");
        return result;
    }

    return null;
}

/**
 * Build a proper MDX file from parsed data
 */
function buildMDX(data, body) {
    const tags = Array.isArray(data.tags) ? data.tags : [];
    const tagsStr = tags.map((t) => `"${t}"`).join(", ");

    return `---
title: "${(data.title || "").replace(/"/g, '\\"')}"
description: "${(data.description || "").replace(/"/g, '\\"')}"
date: "${data.date || getToday()}"
author: "${data.author || "NovaNext Team"}"
tags: [${tagsStr}]
image: "${data.image || "/blog/default.jpg"}"
---

${body}
`;
}

/**
 * Fix broken links in content (some LLMs add google search URLs)
 */
function fixBrokenLinks(content) {
    // Fix: https://www.google.com/search?q=/ → /
    content = content.replace(/https:\/\/www\.google\.com\/search\?q=\//g, "/");
    // Fix: https://www.google.com/search?q=https:// → https://
    content = content.replace(
        /https:\/\/www\.google\.com\/search\?q=https:\/\//g,
        "https://"
    );
    // Fix URL-encoded versions
    content = content.replace(
        /https:\/\/www\.google\.com\/search\?q=[^)\s]*/g,
        (match) => {
            try {
                const decoded = decodeURIComponent(match.replace("https://www.google.com/search?q=", ""));
                return decoded;
            } catch {
                return match;
            }
        }
    );
    return content;
}

function main() {
    console.log("\n╔══════════════════════════════════════════════════╗");
    console.log("║    🚀 NovaNext Blog Post Generator v2            ║");
    console.log("╚══════════════════════════════════════════════════╝\n");

    // Check if draft file exists
    if (!fs.existsSync(DRAFT_FILE)) {
        const template = `Paste konten blog dari LLM ke sini.
Script ini akan otomatis mendeteksi judul, deskripsi, tags, dan konten.

Contoh format (tapi format apapun juga bisa):

---
title: "Judul Blog"
description: "Deskripsi SEO"
date: "${getToday()}"
author: "NovaNext Team"
tags: ["tag1", "tag2"]
image: "/blog/default.jpg"
---

## Heading pertama

Isi konten...
`;
        fs.mkdirSync(path.dirname(DRAFT_FILE), { recursive: true });
        fs.writeFileSync(DRAFT_FILE, template, "utf-8");
        console.log("📄 File draft telah dibuat: content/draft.mdx\n");
        console.log("📋 CARA PAKAI:");
        console.log("   1. Buka file: content/draft.mdx");
        console.log("   2. Paste konten blog dari LLM (format apapun)");
        console.log("   3. Save file (Ctrl+S)");
        console.log("   4. Jalankan lagi: npm run new-post\n");
        process.exit(0);
    }

    // Read draft file
    let content = fs.readFileSync(DRAFT_FILE, "utf-8").trim();

    if (!content || content.length < 50) {
        console.log("❌ File content/draft.mdx kosong atau terlalu pendek!");
        console.log("   Paste konten blog ke file tersebut lalu jalankan lagi.\n");
        process.exit(1);
    }

    // Check if it's still the template
    if (content.includes("Paste konten blog dari LLM ke sini")) {
        console.log("❌ File content/draft.mdx masih berisi template default!");
        console.log("   Ganti isinya dengan konten blog dari LLM, lalu jalankan lagi.\n");
        process.exit(1);
    }

    // Fix broken links from LLM
    content = fixBrokenLinks(content);

    // Parse the content
    console.log("   🔍 Menganalisis format draft...\n");
    const parsed = parseContent(content);

    if (!parsed) {
        console.log("❌ Tidak bisa mendeteksi judul blog dari file draft!");
        console.log("   Pastikan konten memiliki frontmatter dengan title,");
        console.log("   atau setidaknya ada heading (## Judul) di dalam konten.\n");
        process.exit(1);
    }

    const { data, body } = parsed;
    const title = data.title;

    if (!title) {
        console.log("❌ Judul blog tidak ditemukan!");
        process.exit(1);
    }

    // Generate slug and target path
    const slug = generateSlug(title);
    const targetFile = path.join(BLOG_DIR, `${slug}.mdx`);

    if (fs.existsSync(targetFile)) {
        console.log(`   ⚠️  File sudah ada, akan di-overwrite: ${slug}.mdx`);
    }

    // Build proper MDX and save
    const finalMDX = buildMDX(data, body);
    fs.writeFileSync(targetFile, finalMDX, "utf-8");

    // Reset draft file
    const emptyTemplate = `Paste konten blog dari LLM ke sini.
File ini akan direset otomatis setelah publish.

Format apapun bisa: dengan frontmatter, tanpa frontmatter, bahkan format berantakan dari LLM.
Script akan otomatis mendeteksi judul, deskripsi, tags, dan konten.
`;
    fs.writeFileSync(DRAFT_FILE, emptyTemplate, "utf-8");

    // Success
    console.log("╔══════════════════════════════════════════════════╗");
    console.log("║    ✅ Blog Post Berhasil Dibuat!                  ║");
    console.log("╚══════════════════════════════════════════════════╝");
    console.log("");
    console.log(`   📝 Judul  : ${title}`);
    console.log(`   📁 File   : content/blog/${slug}.mdx`);
    console.log(`   🔗 URL    : /blog/${slug}`);
    console.log(`   🏷️  Tags   : ${(data.tags || []).join(", ") || "(none)"}`);
    console.log(`   📅 Tanggal: ${data.date || getToday()}`);
    console.log(`   ✍️  Author : ${data.author || "NovaNext Team"}`);
    console.log("");
    console.log("   🗺️  Sitemap akan otomatis ter-update!");
    console.log("   📡 RSS Feed akan otomatis ter-update!");
    console.log("");
    console.log("   🚀 Langkah selanjutnya:");
    console.log("   ────────────────────────");
    console.log(`   git add .`);
    console.log(`   git commit -m "blog: ${title}"`);
    console.log(`   git push`);
    console.log("");
    console.log("   ✨ Vercel akan otomatis deploy! 🎉\n");
}

main();
