# বাজার দর — Bazar Dor

A Bangladeshi daily essentials price tracking web app. Browse products by category, view today's prices with ▲/▼ change indicators, and see market-wise price breakdowns — all with secure authentication.

## 🔗 Live Site

https://bazar-dor-web-liart.vercel.app

## 🛠️ Technologies Used

- **Next.js 16** (App Router, Server Components, Turbopack)
- **TypeScript**
- **Tailwind CSS**
- **BetterAuth** — Email/Password + Google + GitHub OAuth
- **MongoDB** — User & session storage
- **React-Toastify** — Toast notifications
- **Lucide React** — Icons

## ✨ 5 Key Features

1. **Daily Price Tracking** — View today's prices for essential products (rice, fish, vegetables, meat, oil) with ▲/▼ change indicators and Bengali numerals.

2. **Category Filtering with Sort** — Browse products by category (চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ, মসলা) with real-time sorting by price (low-to-high, high-to-low).

3. **Top Movers Section** — See top 6 price risers and fallers at a glance on the homepage with color-coded badges (red for increases, green for decreases).

4. **Market-wise Price Breakdown** — Detailed product pages showing minimum, maximum, and average prices across different bazaars (Karwan Bazar, Shantinagar, etc.) with a comparison table.

5. **Secure Authentication** — Sign in with email/password, Google, or GitHub. Product details page is protected — only logged-in users can access it. Profile update feature with BetterAuth.

## 📄 Pages

- **`/`** — Home with hero, top movers, and all products
- **`/category/[slug]`** — Category-wise filtered products with sort
- **`/product/[slug]`** — Product details with market prices (protected)
- **`/signin`** — Sign in with email/password or social
- **`/signup`** — Sign up with email/password or social
- **`/profile`** — User profile (protected)
- **`/profile/update`** — Update user name (protected)
- **404** — Custom not-found page

## 🔐 Authentication

Powered by BetterAuth with:
- Email/Password sign up & sign in
- Google OAuth
- GitHub OAuth
- Protected product details and profile routes
- Session persistence with MongoDB
- Profile update functionality

## 🚀 Run Locally

```bash
# Clone the repository
git clone https://github.com/shourovkumar/bazar-dor.git

# Navigate into project
cd bazar-dor

# Install dependencies
npm install

# Setup environment variables (.env)
# BETTER_AUTH_SECRET=your-secret
# BETTER_AUTH_URL=http://localhost:3000
# MONGODB_URI=mongodb+srv://...
# GOOGLE_CLIENT_ID=...
# GOOGLE_CLIENT_SECRET=...
# GITHUB_CLIENT_ID=...
# GITHUB_CLIENT_SECRET=...

# Run dev server
npm run dev


Open http://localhost:3000 in your browser.

## 👤 Author

**Shourov Kumar**
- GitHub: [@shourovkumar](https://github.com/shourovkumar)
- Live Site: [Bazar Dor](https://bazar-dor-web-liart.vercel.app)

---

© 2026 বাজার দর (Bazar Dor) — All rights reserved.
