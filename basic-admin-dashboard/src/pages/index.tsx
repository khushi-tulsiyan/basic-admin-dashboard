import { useSession } from 'next-auth/react';
import React, { useEffect, useState} from 'react';
import axios from 'axios';
import Link from 'next/link';

const Dashboard =() => {
    const { data: session }= useSession();
    const[users, setUsers] = useState([]);
    
    useEffect (() =>{
        if(session) {
            axios.get('/api/users').then((response) => {
                setUsers(response.data);
            });
        }
    }, [session]);

    if(!session){
        return <p> Please log in to view the dashboard.</p>;
    }

    return (
        <div className='p-4'>
            <h1 className='mb-4 text-3xl font-bold'>Admin Dashboard</h1>
            <table className='w-full bg-white border'>
                <thead>
                    <tr>
                        <th className='p-2 border'>Name</th>
                        <th className='p-2 border'>Email</th>
                        <th className='p-2 border'>Contact</th>
                        <th className='p-2 border'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: any) => (
                        <tr key = {user.id}>
                            <td className='p-2 border'>{user.name}</td>
                            <td className='p-2 border'>{user.email}</td>
                            <td className='p-2 border'>{user.contact}</td>
                            <td className='p-2 border'>
                                <Link href ={'/dashboard/user/${user.id}'} className='text-blue-500'>View</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;