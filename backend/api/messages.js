import {sql} from '../db/index.js';

export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try{
        // POST - save a message
        if (req.method === 'POST') {
            const {chat_id, user_id, role, text} = req.body;

            if (!chat_id || !user_id || !role || !text) {
                return res.status(400).json({error: 'Missing required fields'});
            }

            const result = await sql`
                INSERT INTO messages (chat_id, user_id, role, text)
                VALUES (${chat_id}, ${user_id}, ${role}, ${text})
                RETURNING *;
            `;

            return res.status(200).json(result[0]);
        }    
            // GET - fetch all messages of a chat
            if (req.method === 'GET') {
                const {chat_id} = req.query;

                if (!chat_id) {
                    return res.status(400).json({error: 'Missing chat_id'});
                }

                const messages = await sql`
                    SELECT * FROM messages
                    WHERE chat_id = ${chat_id}
                    ORDER BY created_at DESC;
                `;

                return res.status(200).json(messages);
            }
            
            // anything else - method not allowed
            return res.status(405).json({error: 'Method not allowed'});
            
        } catch (error) {
            console.error('Error handling /api/messages request:', error);
            return res.status(500).json({error: 'Internal server error'});
        }
    }