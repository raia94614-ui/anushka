# 🌟 ANUSHKA (@anushkaunveiled) — Official Creator Portfolio Website

A modern, production-grade, **100% frontend-only** website built for **Anushka** ([@anushkaunveiled](https://www.instagram.com/anushkaunveiled/)).

Designed with a high-end luxury dark aesthetic, Instagram brand gradients, interactive 9:16 Reels player, masonry gallery filtering, interactive post lightboxes, live statistics, brand collaboration guides, and a client-side validated inquiry system.

---

## ✨ Exact Profile Information Configured

- **Name**: `ANUSHKA` (`𝓐𝓷𝓾𝓼𝓱𝓴𝓪 ּ`)
- **Username**: `@anushkaunveiled`
- **Instagram Link**: `https://www.instagram.com/anushkaunveiled/`
- **Bio**: `fashion | lifestyle | travel • documenting life in my element`
- **Followers**: `467`
- **Posts**: `15`
- **Following**: `148`
- **Avatar**: Real profile photo from Instagram (`public/anushka_avatar.jpg`)
- **Location**: `India • Available for Worldwide Collaborations`
- **Contact Email**: `anushkaunveiled.collab@gmail.com`
- **Direct Instagram DM**: `https://ig.me/m/anushkaunveiled`

---

## 🎨 How to Customize Content (Single Centralized Data File)

All text, numbers, links, images, posts, reels, and services are centralized in:
📁 **`src/data/creatorData.js`** (also accessible via `src/data/content.js`)

To update any details:
1. Open [`src/data/creatorData.js`](src/data/creatorData.js).
2. Edit `brand` (Name, bio, tagline, handle, email, links).
3. Edit `stats` (Followers, Posts, Following counts).
4. Update images, video links, titles, captions in `featuredPosts`, `reels`, and `galleryItems`.
5. Modify collaboration packages in `collaborations`.

---

## 🚀 How to Run Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

3. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🌐 Deploy to Vercel / Netlify / GitHub Pages

Since this project is **100% frontend only**, it can be deployed to static hosting providers in seconds:
- **Vercel**: Import repository and click Deploy.
- **Netlify**: Drag & drop the `dist` folder after running `npm run build`.
- **GitHub Pages**: Build and host using GitHub Actions or `gh-pages`.
