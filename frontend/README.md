## soscancer Frontend (Vite + React)

### Requirements

- Node.js 18+
- npm or pnpm

### Setup

```bash
cd frontend
npm install
# or: pnpm install
```

### Run Dev Server

```bash
npm run dev
# or: pnpm dev
```

### Production Build

```bash
npm run build
# Preview build
npm run preview
```

### API Base URL

The frontend expects the backend at `http://localhost:8000` by default. To change it, create a `.env` file with:
```
VITE_API_BASE_URL=http://localhost:8000
```

