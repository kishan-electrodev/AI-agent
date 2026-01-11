import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';
import chatsHandler from './api/chats.js';
import messagesHandler from './api/messages.js';
import usersHandler from './api/users.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
import Groq from "groq-sdk";
import { groq } from '@ai-sdk/groq';
import { generateText } from 'ai';

const groqClient = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function main() {
    const chatCompletion = await getGroqChatCompletion();
    // Print the completion returned by the LLM.
    console.log(chatCompletion.choices[0]?.message?.content || "");
}

export async function getGroqChatCompletion() {
    return groqClient.chat.completions.create({
        messages: [
            {
                role: "user",
                content: "Explain the importance of fast language models",
            },
        ],
        model: "openai/gpt-oss-20b",
    });
}

const { text } = await generateText({
  model: groq('llama-3.3-70b-versatile'),
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});

console.log(text);
const sql = neon(process.env.DATABASE_URL);

// Create table if not exists
// async function createTable(){
//     await sql`CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, email TEXT, created_at TIMESTAMP DEFAULT NOW())`;
//     await sql`CREATE TABLE IF NOT EXISTS chats (id SERIAL PRIMARY KEY, user_id TEXT REFERENCES users(id), title TEXT, created_at TIMESTAMP DEFAULT NOW())`;
//     await sql`CREATE TABLE IF NOT EXISTS messages (id SERIAL PRIMARY KEY, chat_id INT REFERENCES chats(id), user_id TEXT, role TEXT, text TEXT, created_at TIMESTAMP DEFAULT NOW())`;
// }

// createTable();

// app.post('/api/chats', chatsHandler);
// app.all('/api/messages', messagesHandler);
// app.all('/api/users', usersHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})