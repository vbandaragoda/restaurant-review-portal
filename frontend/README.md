# TasteLanka frontend

Responsive Next.js App Router frontend implemented from the TasteLanka Figma design.

```bash
npm install
npm run dev
```

Set `NEXT_PUBLIC_API_URL` to the Spring Boot backend origin, without a trailing `/api/v1` path. For example,
use `https://tastelanka-api.onrender.com` in Vercel. It defaults to `http://localhost:8080` for local development.

Useful checks:

```bash
npm run lint
npm run build
```
