
import Groq from "groq-sdk";

const groqClient = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default async function fetchGroq(res, req) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    try {
        if (req.method === 'POST') {
            const { message } = req.body;
            if (!message || !Array.isArray(message)) {
                return res.status(400).json({ error: 'Invalid messages format' });
            }

            const chatCompletion = await getGroqChatCompletion(message);
            const response = chatCompletion.choices[0]?.message?.content || "";
            return res.status(200).json(response);
        }

    } catch (error) {
        console.error("Groq API Error:", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export async function getGroqChatCompletion(message) {
    return groqClient.chat.completions.create({
        messages: [
            {
                role: "user",
                content: message,
            },
        ],
        model: "openai/gpt-oss-20b",
    });
}
