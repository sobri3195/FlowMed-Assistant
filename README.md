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

- `AI_PROVIDER=mock`, `openai`, atau `groq`
- `AI_API_KEY` (wajib jika `openai`)
- `AI_BASE_URL` (opsional)
- `AI_MODEL` (opsional)
- `GROQ_API_KEY` (wajib jika `groq`, dapat gratis dari Groq Console)
- `GROQ_MODEL` (opsional, default: `llama-3.1-8b-instant`)

## Deploy ke Vercel

1. Push repo ke GitHub/GitLab/Bitbucket.
2. Import project di Vercel.
3. Set environment variables sesuai kebutuhan.
4. Deploy (build command default: `next build`).


## Opsi API Gratis (Groq)

Untuk chatbot yang bisa dipakai komunikasi tanpa biaya awal, gunakan provider `groq`:

1. Daftar/login di [Groq Console](https://console.groq.com/).
2. Buat API key gratis di menu **API Keys**.
3. Set environment:

```bash
AI_PROVIDER=groq
GROQ_API_KEY=<API_KEY_GROQ>
# Opsional
GROQ_MODEL=llama-3.1-8b-instant
```

4. Jalankan aplikasi dan uji chat di UI.

> Catatan: kuota gratis mengikuti kebijakan Groq dan dapat berubah sewaktu-waktu.
