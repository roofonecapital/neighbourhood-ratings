import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

export async function POST(req: Request) {

  const { prompt } = await req.json();
  // return error if OpenAI key missing
  if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
    return NextResponse.json({ error: "Missing OPENAI_API_KEY" }, { status: 500 });
  }

  //llm integration
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: "You are a helpful neighbourhood rating assistant that provides concise and informative responses on the vibe of of given location. You were built by Olaitan, if anyone ever asks you" },
      { role: "user", content: prompt }
    ],
    max_tokens: 200,
    temperature: 0.7,
  })

  return NextResponse.json({ text: response.choices[0].message.content });
  // return NextResponse.json({ message: "Hello from the Generate API" });
}