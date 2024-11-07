import  React, {useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/Link';


const Signup = () => {
    const [formData, setFormData] = useState({name: '', email: '', password: ''});
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try{
            await axios.post('api/auth/signup', formData);
            router.push('/auth/login');
        }
        catch(error){
            console.error('Signup failed: ', error);
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <form onSubmit = {handleSubmit} className='p-6 bg-white rounded shadow-md w-80'>
                <h2 className='mb-4 text 2xl font-bold text-center'>Sign Up</h2>
                <input 
                type="text"
                name="name"
                placeholder='Name'
                value={formData.name}
                onChange={handleChange}
                className='w-full p-2 mb-2 border rounded'
                />
               
                <input 
                type="email"
                name="email"
                placeholder='Email'
                value={formData.email}
                onChange={handleChange}
                className='w-full p-2 mb-2 border rounded'
                />
                
                <input 
                type="password"
                name="password"
                placeholder='Password'
                value={formData.password}
                onChange={handleChange}
                className='w-full p-2 mb-2 border rounded'
                />
                <button type='submit' className='w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600'>
                    Sign Up
                </button>

                <p className='mt-2 text-center'>
                    Already have an account? <Link href='/auth/login' className='text-blue-500'>Log in</Link>
                </p>
            </form>
        </div>
    );
};


export default Signup;