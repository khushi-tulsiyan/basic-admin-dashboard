import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import {readFileSync, writeFile, writeFileSync} from 'fs';
import path from 'path';

const USERS_FILE_PATH = path.resolve('src', 'data', 'users.json');

const loadUsers = () => JSON.parse(readFileSync(USERS_FILE_PATH, 'utf-8'));

const saveUsers = (users: any) => writeFileSync(USERS_FILE_PATH, JSON.stringify(users, null, 2));

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials:{
                email:{ label: "Email", type: "text"},
                password: { label: "Password", type: "password"}
            },
            authorize: async(credentials) => {
                const users = loadUsers();
                const user = users.find((u:any) => u.email === credentials?.email);

                if(user && bcrypt.compareSync(credentials!.password, user.password)) {
                    return { id: user.id, name: user.name, email: user.email};
                }

                return null;
            }
        })
    ],

    callbacks:{
        async session({ session, user}) {
            session.user = user;
            return session;
        }
    },
    secret:'YOUR_SECRET',
});