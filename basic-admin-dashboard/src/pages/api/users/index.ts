import type { NextApiRequest, NextApiResponse } from "next";
import { loadUsers, savedUsers } from '../../../utils/userUtils';

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const users = loadUsers();

    switch(req.method){
        case 'GET':
            return res.status(200).json(users);

        case 'POST':{
            const{ name, email, contact, photo} = req.body;
            const newUser = {id:Date.now(), name, email, contact, photo};
            users.push(newUser);
            savedUsers(users);
            return res.status(201).json(newUser);
        }

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            return res.status(405).end('Method ${req.method} Not Allowed');
    }
}