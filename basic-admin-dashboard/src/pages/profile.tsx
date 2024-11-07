import { useSession } from "next-auth/react";
import React, { useState } from "react";
import axios from 'axios';

const Profile = () => {
    const { data: session } = useSession();
    const[profile, setprofile] = useState({ name: '', email: ''});


    const handleUpdate = async () =>{
        try {
            const response = await axios.put('/api/users/profile', profile);
            console.log('Profile updated:', response.data);
        }
        catch (error){
            console.error('Profile update failed:', error);
        }
    };

    if(!session){
        return <p>Please log in to view your profile.</p>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-80 p-4 bg-white shado rounded">
                <h2 className="mb-4 text=2xl font-bold text-center">Profile</h2>
            </div>
            <input
            type = "text"
            name="name"
            value={profile.name}
            onChange={(e) => setprofile({...profile, name: e.target.value})}
            placeholder="Name"
            className="w-full p-2 mb-2 border rounded"
            />
            
            <input
            type = "email"
            name="email"
            value={profile.email}
            onChange={(e) => setprofile({...profile, email: e.target.value})}
            placeholder="Email"
            className="w-full p-2 mb-2 border rounded"
            />
            <button onClick={handleUpdate} className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                Update Profile
            </button>
        </div>
    );
};

export default Profile;