# Danus.in Web

Modern frontend untuk platform Pre-Order mahasiswa, dibangun dengan Next.js 15 (App Router), React 19, TypeScript 5.7, dan Shadcn UI.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript 5.7
- **Styling**: Tailwind CSS 4 + Tailwind CSS Animate
- **UI Components**: Shadcn UI (Radix UI + Tailwind)
- **State Management**: Zustand 5
- **Data Fetching**: TanStack Query v5 & Server Actions
- **Forms & Validation**: React Hook Form + Zod
- **HTTP Client**: Axios (with interceptors) & Fetch API
- **Code Quality**: Biome

## 📁 Struktur Project

Struktur folder telah dioptimalkan untuk skalabilitas dan keterbacaan:

```
danusin-frontend/
├── actions/                     # Server Actions (Next.js)
│   └── auth/                   # Auth actions (login, register, logout)
│
├── app/                         # Next.js App Router
│   ├── (auth)/                 # Route Group: Authentication (Login, Register)
│   ├── (main)/                 # Route Group: Main App (Dashboard, Products, etc.)
│   ├── api/                    # API Routes (jika diperlukan)
│   ├── globals.css             # Global styles
│   └── layout.tsx              # Root layout
│
├── components/                  # Reusable components
│   ├── auth/                   # Auth specific components (Forms)
│   ├── layout/                 # Layout components (Header, Sidebar, Navbar)
│   ├── products/               # Product specific components
│   ├── ui/                     # Shadcn UI base components
│   └── providers.tsx           # Global providers (QueryClient, Theme, etc.)
│
├── constants/                  # Static constants
│   ├── messages.ts             # Standard response messages
│   ├── routes.ts               # Route path constants
│   └── status.ts               # Status enums/constants
│
├── hooks/                      # Custom React Hooks
│   └── use-products.ts         # Product related hooks
│
├── lib/                        # Core utilities & configuration
│   ├── api-client.ts           # Axios instance setup
│   ├── config.ts               # Centralized environment config
│   └── utils.ts                # Helper functions (cn, formatters)
│
├── schemas/                    # Zod Validation Schemas
│   └── auth/                   # Auth schemas (Login, Register)
│
├── services/                   # API Service Layer (Data Fetching)
│   └── products.service.ts     # Product API services
│
├── stores/                     # Global State Management (Zustand)
│   └── ui.store.ts             # UI state (modals, sidebar, etc.)
│
├── types/                      # TypeScript Type Definitions
│
├── public/                     # Static Assets (Images, Icons)
│
├── next.config.ts              # Next.js Configuration
├── tailwind.config.ts          # Tailwind Configuration
├── biome.json                  # Biome Linting & Formatting Config
└── package.json
```

## 🔧 Installation

### Prerequisites

- Node.js >= 22.0.0
- npm / pnpm / yarn
- Backend API Danus.in sudah berjalan

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
   ```

3. **Setup environment**

   Buat file `.env` di root folder dan sesuaikan konfigurasi dengan backend Anda:

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

   Aplikasi akan berjalan di `http://localhost:3001`.

## 🌐 Integrasi Backend

Aplikasi ini menggunakan pendekatan hybrid untuk komunikasi dengan backend:

1. **Server Actions (`/actions`)**:
   Digunakan untuk mutasi data yang sensitif atau membutuhkan eksekusi di server, seperti proses **Login** dan **Register**. Konfigurasi URL diambil secara terpusat dari `lib/config.ts`.

2. **Service Layer (`/services`)**:
   Digunakan untuk data fetching standar (seperti mengambil list produk) menggunakan `api-client` (Axios) yang sudah terkonfigurasi dengan interceptor untuk penanganan token otomatis.

## 🛠️ Development Scripts

```bash
# Menjalankan server development
npm run dev

# Build untuk production
npm run build
npm start

# Memeriksa tipe data (TypeScript)
npm run type-check

# Linting & Formatting kode (menggunakan Biome)
npm run lint
npm run lint:fix
npm run format
```
