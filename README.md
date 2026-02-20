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

Variabel tambahan yang sudah disiapkan di `.env.example`:

- OpenAI: `OPENAI_API_KEY`, `OPENAI_ORG_ID`, `OPENAI_PROJECT_ID`
- Anthropic: `ANTHROPIC_API_KEY`
- Gemini: `GEMINI_API_KEY`
- AWS: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`
- Stripe: `STRIPE_API_KEY`, `STRIPE_WEBHOOK_SECRET`
- GitHub: `GITHUB_TOKEN`
- Slack/Discord: `SLACK_BOT_TOKEN`, `DISCORD_BOT_TOKEN`
- Twilio/SendGrid: `TWILIO_AUTH_TOKEN`, `SENDGRID_API_KEY`
- Mapbox/Supabase: `MAPBOX_API_KEY`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`

> Gunakan `.env.local` untuk nilai asli secret key, jangan commit nilai secret ke repository.

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
