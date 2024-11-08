import React, {useState} from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";


const Login = () =>{
    const [formData, setFormData] = useState({email: '', password: ''});
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        const result = await signIn('credentials', {
            redirect: false,
            email: formData.email,
            password: formData.password,
        });

        if(result?.ok){
            router.push('/dashboard');
        }
        else{
            console.error('Login failed:', result?.error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md w-80">
                <h2 className="mb-4 text-2xl font-bold text-center">Log In</h2>
                <input
                type = "email"
                name = "email"
                placeholder="Email"
                value = {formData.email}
                onChange={handleChange}
                className="w-full p-2 mb-2 border rounded"
                />
                <input
                type = "password"
                name = "password"
                placeholder="Password"
                value = {formData.password}
                onChange={handleChange}
                className="w-full p-2 mb-2 border rounded"
                />
                <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                    Log In
                </button>
                <p className="mt-2 text-center">
                    Don't have an account? <Link href ='/auth/signup' className="text-blue-500">Sign Up</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;