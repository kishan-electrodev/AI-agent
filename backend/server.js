import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// const sql = neon(process.env.DATABASE_URL);

// // Create table if not exists
// async function createTable(){
//     await sql`CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, email TEXT, creatd_at TIMESTAMP DEFAULT NOW())`;
//     await sql`CREATE TABLE IF NOT EXISTS chats (id SERIAL PRIMARY KEY, user_id TEXT REFERENCES users(id), title TEXT, creatd_at TIMESTAMP DEFAULT NOW())`;
//     await sql`CREATE TABLE IF NOT EXISTS messages (id SERIAL PRIMARY KEY, chat_id INT REFERENCES chats(id), user_id TEXT, role TEXT, text TEXT, creatd_at TIMESTAMP DEFAULT NOW())`;
// }

// createTable();



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})