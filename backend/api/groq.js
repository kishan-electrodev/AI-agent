import Groq from "groq-sdk";

export default async function handler(req, res) {
  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({ error: "API key not configured" });
  }

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  if (req.method === 'GET') {
    return res.json({ message: "it is okay and work" });
  } else if (req.method === 'POST') {
    try {
      const { message } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }
      const chatCompletion = await getGroqChatCompletion(groq, message);
      const reply = chatCompletion.choices[0]?.message?.content || "";
      res.json({ reply });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}

async function getGroqChatCompletion(groq, message = "Explain the importance of fast language models") {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: message,
      },
    ],
    model: "llama3-70b-8192",
  });
}
