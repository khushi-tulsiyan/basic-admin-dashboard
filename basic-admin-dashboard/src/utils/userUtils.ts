import { readFileSync, writeFileSync } from "fs";
import path from 'path';

const USERS_FILE_PATH = path.resolve('src', 'data', 'users.json');

export const loadUsers = () => JSON.parse(readFileSync(USERS_FILE_PATH, 'utf-8'));

export const savedUsers = (users: any) => writeFileSync(USERS_FILE_PATH, JSON.stringify(users, null, 2));