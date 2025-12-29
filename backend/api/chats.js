import {sql} from '../db/index.js';

export default async function handler(req, res) {
    try{
        // POST - create a new chat
        if (req.method === 'POST') {
            const {user_id, title} = req.body;

            if (!user_id || !title) {
                return res.status(400).json({error: 'Missing required fields'});
            }

            const result = await sql`
                INSERT INTO chats (user_id, title)
                VALUES (${user_id}, ${title})
                RETURNING *;
            `;

            return res.status(200).json(result[0]);
        }    
            // GET - list user's chats
            if (req.method === 'GET') {
                const {user_id} = req.query;

                if (!user_id) {
                    return res.status(400).json({error: 'Missing user_id'});
                }

                const chats = await sql`
                    SELECT * FROM chats
                    WHERE user_id = ${user_id}
                    ORDER BY created_at DESC;
                `;

                return res.status(200).json(chats);
            }
            
            // anything else - method not allowed
            return res.status(405).json({error: 'Method not allowed'});
            
        } catch (error) {
            console.error('Error handling /api/chats request:', error);
            return res.status(500).json({error: 'Internal server error'});
        }
    }