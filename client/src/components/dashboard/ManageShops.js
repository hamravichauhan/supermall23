import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageShops = () => {
    const [shops, setShops] = useState([]);
    const [newShopName, setNewShopName] = useState('');
    const [newShopDescription, setNewShopDescription] = useState('');
    const [editingShop, setEditingShop] = useState(null);

    useEffect(() => {
        const fetchShops = async () => {
            const response = await axios.get('/api/shops');
            setShops(response.data);
        };
        fetchShops();
    }, []);

    const addShop = async () => {
        const response = await axios.post('/api/shops', { 
            name: newShopName, 
            description: newShopDescription 
        });
        setShops([...shops, response.data]);
        resetForm();
    };

    const updateShop = async () => {
        const response = await axios.put(`/api/shops/${editingShop._id}`, { 
            name: newShopName, 
            description: newShopDescription 
        });
        setShops(shops.map(shop => (shop._id === editingShop._id ? response.data : shop)));
        resetForm();
    };

    const deleteShop = async (id) => {
        await axios.delete(`/api/shops/${id}`);
        setShops(shops.filter(shop => shop._id !== id));
    };

    const startEditing = (shop) => {
        setEditingShop(shop);
        setNewShopName(shop.name);
        setNewShopDescription(shop.description);
    };

    const resetForm = () => {
        setEditingShop(null);
        setNewShopName('');
        setNewShopDescription('');
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold">Manage Shops</h2>
            <div className="mt-4">
                <input
                    type="text"
                    value={newShopName}
                    onChange={(e) => setNewShopName(e.target.value)}
                    placeholder="New Shop Name"
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    value={newShopDescription}
                    onChange={(e) => setNewShopDescription(e.target.value)}
                    placeholder="Shop Description"
                    className="border p-2 rounded ml-2"
                />
                {editingShop ? (
                    <button onClick={updateShop} className="bg-blue-600 text-white p-2 rounded ml-2">
                        Update Shop
                    </button>
                ) : (
                    <button onClick={addShop} className="bg-blue-600 text-white p-2 rounded ml-2">
                        Add Shop
                    </button>
                )}
            </div>
            <ul className="mt-4">
                {shops.map(shop => (
                    <li key={shop._id} className="flex justify-between items-center border-b py-2">
                        <div>
                            <strong>{shop.name}</strong> - {shop.description}
                        </div>
                        <div>
                            <button onClick={() => startEditing(shop)} className="bg-yellow-600 text-white p-1 rounded mr-2">
                                Edit
                            </button>
                            <button onClick={() => deleteShop(shop._id)} className="bg-red-600 text-white p-1 rounded">
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageShops;
