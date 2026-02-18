# Finance Dashboard

React + TypeScript + Vite ile geliştirilmiş, modern bir fintech dashboard uygulaması.

## Özellikler

- **Kimlik doğrulama** — Giriş ve kayıt sayfaları, korumalı rotalar
- **Dashboard** — Özet grafikler, işlemler, transferler ve cüzdan bilgisi
- **Sidebar navigasyon** — Dashboard, Transactions, Invoices, Wallets, Settings
- **Toast bildirimleri** — Non-blocking kullanıcı geri bildirimi (react-hot-toast)
- **Form yönetimi** — React Hook Form + Zod ile type-safe validasyon

## Teknoloji stack’i

| Kategori          | Kütüphane             |
| ----------------- | --------------------- |
| Framework         | React 19, TypeScript  |
| Build             | Vite 7                |
| Stil              | Tailwind CSS          |
| API / state       | TanStack Query, Axios |
| Form & validasyon | React Hook Form, Zod  |
| Grafikler         | Recharts              |
| Routing           | React Router v7       |
| İkonlar           | Lucide React          |

## Proje yapısı (özet)

```
src/
├── components/     # UI bileşenleri, charts, sidebar, navbar
├── config/         # Menü ve uygulama konfigürasyonu
├── context/        # Auth context ve provider
├── layout/         # DashboardLayout
├── lib/            # API client, query keys, auth storage
├── pages/          # Auth, Dashboard, Maintenance
├── router/         # React Router tanımları
├── services/       # authService, dashboardService
├── types/          # TypeScript tipleri
├── utils/          # Yardımcı fonksiyonlar
└── validations/    # Zod şemaları
```

## Başlangıç

### Gereksinimler

- Node.js 18+
- npm veya yarn

### Kurulum

```bash
npm install
```

### Geliştirme sunucusu

```bash
npm run dev
```

Uygulama varsayılan olarak [http://localhost:3000](http://localhost:3000) adresinde açılır.

### Build

```bash
npm run build
```

Üretim build’i `dist/` klasörüne çıkar.

### Önizleme (production build)

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Mimari notları

- **Server state**: TanStack Query ile API verisi cache, refetch ve loading/error state’leri yönetiliyor; client state ile ayrı tutuluyor.
- **Auth**: Context + localStorage ile oturum yönetimi; korumalı sayfalar `ProtectedRoute` ile sarılı.
- **API**: Axios tabanlı merkezi client (`src/lib/api.ts`), servis katmanı (`services/`) ile ayrılmış.
