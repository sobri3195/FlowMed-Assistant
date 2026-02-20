import { NextRequest, NextResponse } from "next/server";

type IncomingMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatRequestBody = {
  messages?: IncomingMessage[];
};

const MAX_MESSAGE_LENGTH = 2000;

function sanitizeMessages(messages: IncomingMessage[]): IncomingMessage[] {
  return messages
    .filter((item) => item && (item.role === "user" || item.role === "assistant") && typeof item.content === "string")
    .map((item) => ({
      role: item.role,
      content: item.content.trim().slice(0, MAX_MESSAGE_LENGTH)
    }))
    .filter((item) => item.content.length > 0);
}

function buildMockReply(lastMessage: string): string {
  return `Terima kasih, saya sudah menerima pertanyaan Anda: "${lastMessage}".\n\nIni adalah balasan mock dari FlowMed Assistant. Untuk jawaban final, hubungkan ke provider AI pada environment Vercel.`;
}

async function callOpenAIProvider(messages: IncomingMessage[]): Promise<string> {
  const apiKey = process.env.AI_API_KEY;
  if (!apiKey) {
    throw new Error("AI_API_KEY belum diset.");
  }

  const baseUrl = process.env.AI_BASE_URL || "https://api.openai.com/v1";
  const model = process.env.AI_MODEL || "gpt-4o-mini";

  const response = await fetch(`${baseUrl.replace(/\/$/, "")}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      messages
    })
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Provider error (${response.status}): ${detail || "Unknown error"}`);
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  const reply = data.choices?.[0]?.message?.content?.trim();
  if (!reply) {
    throw new Error("Provider tidak mengembalikan respons.");
  }

  return reply;
}

async function callGroqProvider(messages: IncomingMessage[]): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY belum diset.");
  }

  const model = process.env.GROQ_MODEL || "llama-3.1-8b-instant";

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.4
    })
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Groq error (${response.status}): ${detail || "Unknown error"}`);
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  const reply = data.choices?.[0]?.message?.content?.trim();
  if (!reply) {
    throw new Error("Groq tidak mengembalikan respons.");
  }

  return reply;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ChatRequestBody;
    const sanitized = sanitizeMessages(body.messages || []);

    if (sanitized.length === 0) {
      return NextResponse.json({ error: "messages tidak valid." }, { status: 400 });
    }

    const provider = process.env.AI_PROVIDER || "mock";

    let reply = "";
    if (provider === "mock") {
      const lastUserMessage = [...sanitized].reverse().find((message) => message.role === "user");
      reply = buildMockReply(lastUserMessage?.content || "");
    } else if (provider === "openai") {
      reply = await callOpenAIProvider(sanitized);
    } else if (provider === "groq") {
      reply = await callGroqProvider(sanitized);
    } else {
      return NextResponse.json(
        { error: "AI_PROVIDER tidak didukung. Gunakan mock, openai, atau groq." },
        { status: 400 }
      );
    }

    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Terjadi kesalahan internal." },
      { status: 500 }
    );
  }
}
