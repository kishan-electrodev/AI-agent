import {sql} from '../db/index.js';

export default async function handler(req, res) {
    try{
        // POST - save or find user
        if (req.method === 'POST') {
            const {id, email, name} = req.body;

            if (!id || !email || !name) {
                return res.status(400).json({error: 'Missing required fields'});
            }

            //check if user exists
            const exists = await sql`
                SELECT * FROM users
                WHERE id = ${id};
            `;
            if (exists.length > 0) {
                return res.status(200).json(exists[0]);
            }

            //create new user
            const result = await sql`
                INSERT INTO users (id, email, name)
                VALUES (${id}, ${email}, ${name})
                RETURNING *;
            `;

            return res.status(200).json(result[0]);
        }
           
        // anything else - method not allowed
        return res.status(405).json({error: 'Method not allowed'});
            
        } catch (error) {
            console.error('Error handling /api/users request:', error);
            return res.status(500).json({error: 'Internal server error'});
        }
    }