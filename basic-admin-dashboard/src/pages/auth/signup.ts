import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';
import {loadUsers, savedUsers} from '@/utils/userUtils';

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method =='POST'){
        const {name, email, password} = req.body;
        const users = loadUsers();

        if(users.find((user:any) =>user.email === email)){
            return res.status(409).json({ message: 'User already exists'});
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = {id: Date.now(), name, email, password: hashedPassword};
        users.push(newUser);
        savedUsers(users);

        return res.status(201).json({message: 'User created', user: newUser});

    }

    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method $(req.method) Not Allowed');
}