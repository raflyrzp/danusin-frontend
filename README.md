# Danus.in Web

Modern frontend untuk platform Pre-Order mahasiswa, dibangun dengan Next.js 15 (App Router), React 19, TypeScript 5.7, dan Shadcn UI.

## 🚀 Tech Stack

- **Framework**: Next.js 15.1 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript 5.7
- **Styling**: Tailwind CSS 3.4 + Tailwind CSS Animate
- **UI Components**: Shadcn UI (Radix UI + Tailwind)
- **State Management**: Zustand 5
- **Data Fetching**: TanStack Query v5
- **Forms & Validation**: React Hook Form + Zod
- **HTTP Client**: Axios 1.7 (with interceptors)
- **Theming**: next-themes (Light/Dark mode)
- **Icons**: Lucide React
- **Date Utilities**: date-fns 4
- **Code Quality**: Biome 1.9
- **Dev Tools**: React Query Devtools, TypeScript strict mode

## 📁 Struktur Project

```
danus-in-web/
├── app/                         # Next.js App Router
│   ├── (auth)/                 # Auth routes group
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── (main)/                 # Main routes group
│   │   ├── products/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── orders/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── dashboard/
│   │   │   ├── buyer/
│   │   │   │   └── page.tsx
│   │   │   └── seller/
│   │   │       ├── products/
│   │   │       │   ├── new/
│   │   │       │   │   └── page.tsx
│   │   │       │   ├── [id]/
│   │   │       │   │   └── edit/
│   │   │       │   │       └── page.tsx
│   │   │       │   └── page.tsx
│   │   │       ├── orders/
│   │   │       │   └── page.tsx
│   │   │       └── page.tsx
│   │   └── profile/
│   │       └── page.tsx
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Landing page
│   ├── globals.css             # Global styles
│   ├── error.tsx               # Global error boundary
│   └── not-found.tsx           # 404 page
│
├── components/                  # Reusable components
│   ├── ui/                     # Shadcn UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── textarea.tsx
│   │   ├── select.tsx
│   │   ├── dialog.tsx
│   │   ├── form.tsx
│   │   ├── label.tsx
│   │   ├── badge.tsx
│   │   ├── tabs.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── popover.tsx
│   │   ├── avatar.tsx
│   │   ├── toast.tsx
│   │   ├── sonner.tsx
│   │   └── separator.tsx
│   ├── layout/                 # Layout components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── navbar.tsx
│   │   └── sidebar.tsx
│   ├── auth/                   # Auth components
│   │   ├── login-form.tsx
│   │   └── register-form.tsx
│   ├── products/               # Product components
│   │   ├── product-card.tsx
│   │   ├── product-list.tsx
│   │   └── product-form.tsx
│   ├── orders/                 # Order components
│   │   ├── order-card.tsx
│   │   └── order-status-badge.tsx
│   └── providers.tsx           # App-level providers (Query, Theme)
│
├── lib/                        # Core utilities & config
│   ├── config.ts               # App & API config
│   ├── utils.ts                # Helper functions (format, cn, etc)
│   └── api-client.ts           # Axios instance with interceptors
│
├── services/                   # API layer
│   ├── auth.service.ts
│   ├── products.service.ts
│   ├── orders.service.ts
│   ├── users.service.ts
│   ├── notifications.service.ts
│   ├── upload.service.ts
│   └── dashboard.service.ts
│
├── hooks/                      # Custom React hooks
│   ├── use-auth.ts
│   ├── use-products.ts
│   ├── use-orders.ts
│   ├── use-notifications.ts
│   ├── use-media-query.ts
│   └── use-debounce.ts
│
├── store/                      # Zustand stores
│   ├── auth.store.ts
│   ├── cart.store.ts
│   └── ui.store.ts
│
├── types/                      # TypeScript types
│   ├── index.ts                # Shared domain types (User, Product, Order, etc)
│   └── api.types.ts            # API response & error types
│
├── constants/                  # App constants
│   ├── routes.ts               # Route helpers
│   ├── status.ts               # Order status & colors
│   └── messages.ts             # Default success/error messages
│
├── public/                     # Static assets
│   ├── images/
│   └── icons/
│
├── next.config.ts              # Next.js config
├── tailwind.config.ts          # Tailwind config
├── postcss.config.js           # PostCSS config
├── tsconfig.json               # TypeScript config
├── biome.json                  # Biome lint & format config
├── package.json                # Dependencies & scripts
└── README.md                   # Dokumentasi ini
```

## 🔧 Installation

### Prerequisites

- Node.js >= 22.0.0
- npm / pnpm / yarn
- Backend API Danus.in sudah berjalan (default: `http://localhost:3000/api/v1`)

### Steps

1. **Clone repository**

   ```bash
   git clone https://github.com/raflyrzp/danusin-frontend.git
   cd danusin-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # atau
   pnpm install
   # atau
   yarn install
   ```

3. **Setup environment**

   ```bash
   cp .env.local.example .env.local
   ```

   Edit `.env.local` dan sesuaikan dengan URL backend dan konfigurasi lain:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
   NEXT_PUBLIC_API_TIMEOUT=30000
   NEXT_PUBLIC_APP_NAME=Danus.in
   NEXT_PUBLIC_APP_URL=http://localhost:3001
   ```

4. **Run development server**

   ```bash
   npm run dev
   ```

   Aplikasi akan berjalan di:

   ```
   http://localhost:3001
   ```

5. **Optional: Type checking & linting**

   ```bash
   # Cek type TypeScript
   npm run type-check

   # Cek kualitas kode
   npm run lint

   # Perbaiki otomatis & format
   npm run lint:fix
   npm run format
   ```

## 🌐 Integrasi dengan Backend

Aplikasi frontend ini dirancang untuk terhubung dengan **Danus.in API** dengan base URL:

```text
http://localhost:3000/api/v1
```

Endpoint utama yang digunakan:

- `POST /auth/register` – Registrasi
- `POST /auth/login` – Login (mengambil JWT)
- `GET /auth/me` – Profil user saat ini
- `GET /products` – List produk
- `GET /products/:id` – Detail produk
- `POST /orders` – Buat pesanan
- `GET /orders/me` – Riwayat pesanan buyer
- `GET /orders/seller/incoming` – Pesanan masuk seller
- `GET /notifications` – Notifikasi user
- `POST /upload/image` – Upload gambar produk
- `GET /dashboard/seller/summary` – Ringkasan seller
- `GET /dashboard/buyer/summary` – Ringkasan buyer

Semua request ke endpoint yang membutuhkan autentikasi akan otomatis menyertakan JWT dari `localStorage` melalui **Axios interceptor** di `lib/api-client.ts`.

## 🧩 Fitur Utama (High-level)

- Halaman landing dengan hero section dan CTA
- Autentikasi:
  - Login dengan email/NIM + password
  - Registrasi user baru
  - Menyimpan token JWT di localStorage
  - Proteksi route untuk halaman yang butuh login
- Products:
  - List produk (public)
  - Filter & search produk
  - Detail produk
  - Dashboard seller: kelola produk (list, create, edit)
- Orders:
  - Buyer: membuat pesanan, melihat riwayat
  - Seller: melihat pesanan masuk, update status
- Dashboard:
  - Buyer: ringkasan pesanan & pengeluaran
  - Seller: ringkasan revenue, pesanan, dan produk
- Notifications:
  - List notifikasi
  - Tandai notifikasi sebagai sudah dibaca
- Upload:
  - Upload gambar produk via `/upload/image`
- UI:
  - Komponen reusable dengan Shadcn UI
  - Dark mode support
  - Toast/notification dengan Sonner

## 🛠️ Development

### Available Scripts

```bash
# Development mode
npm run dev

# Build untuk production
npm run build

# Jalankan build production
npm start

# Cek type TypeScript
npm run type-check

# Linting & formatting (Biome)
npm run lint
npm run lint:fix
npm run format
```

## 🧪 Struktur API Client & State

- `lib/api-client.ts` – Axios instance dengan:

  - Base URL dari `NEXT_PUBLIC_API_URL`
  - Timeout dari `NEXT_PUBLIC_API_TIMEOUT`
  - Interceptor untuk otomatis menyisipkan header `Authorization: Bearer <token>`
  - Global error handling (401 redirect ke login)

- `store/auth.store.ts` – Zustand store untuk:

  - Menyimpan user & token
  - login / logout
  - state loading & error

- `hooks/use-auth.ts` – Hook utilitas:
  - `useAuth()` untuk state user saat ini
  - `useLogin()` dan `useRegister()` (React Query mutation)
  - `useRequireAuth()` untuk proteksi halaman

## 🎨 UI & Styling

- **Tailwind CSS** untuk utility-first styling
- **Shadcn UI** untuk komponen dasar (button, input, card, dialog, dll)
- **Tailwind CSS Animate** untuk animasi halus
- **Dark Mode** dengan `next-themes`:
  - Menggunakan class `dark` di HTML
  - Theme switcher bisa ditambahkan di navbar

## 🔐 Authentication (Frontend)

- Token JWT disimpan di `localStorage` (bisa diubah ke cookies/HttpOnly jika dibutuhkan)
- Axios interceptor menambahkan header:

  ```http
  Authorization: Bearer <token>
  ```

- Jika API mengembalikan `401`, frontend:
  - Menghapus token
  - Redirect ke `/login`

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'feat: add amazing feature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

---

## Happy Coding! ✨🚀
