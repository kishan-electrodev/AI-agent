import Groq from "groq-sdk";
import dotenv from 'dotenv';

dotenv.config();


const groqClient = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export default async function fetchGroq(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    // const { message } = req.body;
    message = "Hello, Groq!";

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message must be a string" });
    }

    const chatCompletion = await getGroqChatCompletion(message);

    const reply =
      chatCompletion.choices?.[0]?.message?.content || "";

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Groq API Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function getGroqChatCompletion(message) {
  return groqClient.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
      {
        role: "user",
        content: message,
      },
    ],
  });
}


