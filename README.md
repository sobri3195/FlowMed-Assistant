# FlowMed Assistant

Aplikasi chat mobile-first dengan Next.js App Router + TypeScript + Tailwind.

## Menjalankan Lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

## Environment Variable

Salin `.env.example` menjadi `.env.local` lalu isi:

- `AI_PROVIDER=mock` atau `openai`
- `AI_API_KEY` (wajib jika `openai`)
- `AI_BASE_URL` (opsional)
- `AI_MODEL` (opsional)

## Deploy ke Vercel

1. Push repo ke GitHub/GitLab/Bitbucket.
2. Import project di Vercel.
3. Set environment variables sesuai kebutuhan.
4. Deploy (build command default: `next build`).
