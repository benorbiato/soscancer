## soscancer Frontend (Vite + React)

### Requirements

- Bun 1.1+

### Setup

```bash
cd frontend
bun install
```

### Run Dev Server

```bash
bun run dev
```

### Production Build

```bash
bun run build
# Preview build
bun run preview
```

### API Base URL

The frontend expects the backend at `http://localhost:8000` by default. To change it, create a `.env` file with:

```
VITE_API_BASE_URL=http://localhost:8000
```

### Linting

### shadcn/ui (with Vite)

Reference: [Install shadcn/ui for Vite](https://ui.shadcn.com/docs/installation/vite)

Already configured here:

- Tailwind v4 via `@tailwindcss/vite` plugin in `vite.config.js`
- Path alias `@` → `./src`
- `src/index.css` imports Tailwind (`@import "tailwindcss";`)

CLI (using Bun):

```bash
# Initialize shadcn (creates/updates components.json)
bunx shadcn@latest init

# Add components as needed, e.g. Button
bunx shadcn@latest add button
```

Import example:

```jsx
import { Button } from '@/components/ui/button.jsx'
```

Run ESLint:

```bash
bun run lint
bun run lint:fix  # auto-fix issues where possible
```
