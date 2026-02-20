# 📋 PROMPT TEMPLATES - NovaNext Blog Generator

Copy-paste prompt di bawah ini ke LLM mana pun (ChatGPT, Gemini, Claude, dll).
Hasil output-nya **langsung paste ke `content/draft.mdx`**, lalu jalankan `npm run new-post`. Selesai! ✅

---

## 🔍 PROMPT 1: Cari Judul Blog Terbaik

Gunakan prompt ini **PERTAMA** untuk mendapatkan ide judul blog. Setelah dapat judul, gunakan Prompt 2.

```
Kamu adalah seorang content strategist dan SEO expert berpengalaman untuk digital agency Indonesia bernama "NovaNext" (novanext.id).

NovaNext adalah IT Agency yang menyediakan jasa:
- Pembuatan website profesional & custom
- Pembuatan aplikasi mobile (Android & iOS)
- Sistem POS/Kasir digital
- Digital Marketing & SEO
- Google Ads & Meta Ads management

Target audience: UMKM, startup, dan bisnis menengah di Indonesia yang ingin go digital.

TUGAS:
Buatkan 15 ide judul blog dalam Bahasa Indonesia yang:
1. Relevan dengan kebutuhan target audience (bisnis yang butuh website/aplikasi/digital marketing)
2. Punya search volume tinggi (gunakan keyword yang sering dicari di Google Indonesia)
3. Bisa di-ranking di Google karena targetnya long-tail keyword
4. Kontennya BISA DISISIPKAN promosi terselubung untuk jasa NovaNext secara natural tanpa terasa iklan
5. Judul harus clickbait tapi tetap informatif dan tidak misleading
6. Format judul harus SEO-friendly (mengandung keyword utama di awal)

Untuk setiap judul, berikan juga:
- Target keyword utama
- Estimasi search intent (informational/commercial/transactional)
- Ide angle promosi NovaNext yang bisa disisipkan
- Skor potensi SEO (1-10)

Format output:
| No | Judul Blog | Target Keyword | Search Intent | Angle Promosi NovaNext | Skor SEO |
```

---

## ✍️ PROMPT 2: Generate Blog Post Lengkap (1x Copy-Paste, Langsung Jadi!)

**Ganti `[JUDUL BLOG]` dengan judul pilihan dari Prompt 1, lalu paste hasilnya langsung ke `content/draft.mdx`.**

```
Kamu adalah content writer profesional dan SEO expert untuk blog NovaNext (novanext.id), sebuah IT Agency Indonesia.

INFORMASI NOVANEXT:
- Website: https://novanext.id
- WhatsApp Konsultasi: https://wa.me/6281224621353?text=Halo%20NovaNext,%20saya%20tertarik%20konsultasi.
- Layanan: Website custom, aplikasi mobile, sistem kasir POS, SEO, Google Ads, Meta Ads
- Target market: UMKM, startup, bisnis menengah di Indonesia
- USP: Harga terjangkau, kualitas premium, konsultasi gratis, tim berpengalaman

TUGAS:
Buatkan artikel blog lengkap dengan judul: "[JUDUL BLOG]"

ATURAN FORMAT OUTPUT (SANGAT PENTING!):
Output HARUS berupa file MDX lengkap dengan frontmatter. Format PERSIS seperti ini:

---
title: "Judul artikel lengkap di sini"
description: "Meta description SEO 150-160 karakter yang menarik dan mengandung keyword utama"
date: "YYYY-MM-DD"
author: "NovaNext Team"
tags: ["keyword1", "keyword2", "keyword3", "keyword4"]
image: "/blog/default.jpg"
---

[ISI ARTIKEL DIMULAI DI SINI]

ATURAN PENULISAN KONTEN:
1. Bahasa Indonesia santai, mudah dipahami semua kalangan, tapi tetap profesional
2. Gunakan "kamu" bukan "Anda" agar terasa friendly
3. Panjang artikel MINIMAL 1500 kata agar bagus untuk SEO
4. Struktur heading: gunakan ## untuk H2 dan ### untuk H3 (JANGAN gunakan # H1)
5. Setiap section harus informatif dan memberikan value nyata ke pembaca
6. Sertakan emoji yang relevan di beberapa heading (jangan berlebihan)
7. Gunakan **bold** untuk menekankan poin penting
8. Sertakan bullet points dan numbered list untuk readability
9. Jika relevan, tambahkan tabel perbandingan menggunakan format Markdown
10. JANGAN tulis ulang judul sebagai H1 di konten (judul sudah ada di frontmatter)
11. Langsung mulai dari ## (H2) pertama

PROMOSI TERSELUBUNG (WAJIB!):
- Sisipkan 2-3 kali mention NovaNext secara NATURAL di dalam konten
- JANGAN terasa seperti iklan! Harus mengalir natural dalam konteks artikel
- Gunakan format link: [NovaNext](/) atau [konsultasi gratis dengan NovaNext](https://wa.me/6281224621353?text=Halo%20NovaNext,%20saya%20tertarik%20konsultasi.)
- Sisipkan di bagian tips/saran, kesimpulan, atau dalam blockquote:
  > 💡 **Tips Pro:** [kalimat yang menyebut NovaNext secara natural]
- Di bagian Kesimpulan, akhiri dengan CTA soft ke NovaNext

ATURAN FRONTMATTER:
- title: Judul lengkap artikel (sama dengan yang diminta)
- description: Meta description 150-160 karakter, harus menarik dan mengandung keyword utama
- date: Gunakan tanggal hari ini dalam format YYYY-MM-DD
- author: "NovaNext Team"
- tags: Array 3-5 keyword relevan dalam lowercase, keyword utama harus ada di posisi pertama
- image: "/blog/default.jpg"

PENTING: Output HANYA berisi file MDX mentah. JANGAN tambahkan penjelasan, komentar, atau teks lain di luar file MDX. JANGAN bungkus dalam code block (```). Langsung mulai dari --- frontmatter.
```

---

## 🚀 WORKFLOW LENGKAP (3 Langkah Saja!)

### Langkah 1: Generate Konten
1. Copy **Prompt 1** ke LLM → pilih judul terbaik
2. Copy **Prompt 2** ke LLM → ganti `[JUDUL BLOG]` dengan judul pilihan
3. Copy SELURUH output dari LLM

### Langkah 2: Paste & Generate
1. Buka file `content/draft.mdx`
2. Select All (Ctrl+A) → Paste (Ctrl+V) → Save (Ctrl+S)
3. Buka terminal, jalankan:
   ```
   npm run new-post
   ```

### Langkah 3: Deploy
```bash
git add .
git commit -m "blog: judul blog"
git push
```
✅ Vercel otomatis deploy! Sitemap & RSS otomatis update! 🎉

---

## 💡 TIPS

- **Konsistensi**: Publish minimal 2-3 artikel per minggu untuk SEO optimal
- **Internal Linking**: Di setiap artikel baru, sisipkan link ke artikel lama yang relevan
- **Update**: Artikel lama bisa di-update dengan tanggal baru untuk re-index Google
- **Meta Description**: Pastikan selalu 150-160 karakter dan mengandung keyword utama
