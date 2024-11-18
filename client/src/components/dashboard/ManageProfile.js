import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ManageProfile = () => {
    const [user, setUser] = useState({ name: '', email: '' });
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const { token } = useSelector(state => state.auth);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('/api/auth/profile', {
                    headers: { 'x-auth-token': token }
                });
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                toast.error('Failed to load profile');
            }
        };

        fetchUserProfile();
    }, [token]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('/api/auth/profile', user, {
                headers: { 'x-auth-token': token }
            });
            setUser(response.data);
            setIsEditing(false);
            toast.success('Profile updated successfully');
        } catch (error) {
            console.error(error);
            toast.error('Failed to update profile');
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold">Manage Profile</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={user.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                <div className="mt-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={user.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                <div className="mt-4">
                    {isEditing ? (
                        <button type="submit" className="bg-blue-600 text-white p-2 rounded">Save</button>
                    ) : (
                        <button type="button" onClick={() => setIsEditing(true)} className="bg-green-600 text-white p-2 rounded">Edit</button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ManageProfile;
