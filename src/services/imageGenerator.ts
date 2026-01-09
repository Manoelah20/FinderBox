// src/services/imageGenerator.ts
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function gerarImagem(descricao: string) {
  const response = await client.images.generate({
    model: "gpt-image-1",
    prompt: descricao,
    size: "512x512"
  });
  return response.data[0].url;
}
