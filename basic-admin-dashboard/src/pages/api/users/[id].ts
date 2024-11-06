import type { NextApiRequest, NextApiResponse } from "next";
import { loadUsers, savedUsers } from "@/utils/userUtils";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const users = loadUsers();
    const {id} = req.query;

    const userIndex = users.findIndex((user: any) => user.id.toString() === id);

    if(userIndex === -1) return res.status(404).json({message: 'User not found'});

    switch(req.method){
        case 'GET':
            return res.status(200).json(users[userIndex]);

        case 'DELETE':
            const deletedUser = users.splice(userIndex, 1)[0];
            savedUsers(users);
            return res.status(200).json(deletedUser);

        default:
            res.setHeader('Allow', ['GET', 'DELETE']);
            return res.status(405).end('Method ${req.method} Not Allowed');
    }
}