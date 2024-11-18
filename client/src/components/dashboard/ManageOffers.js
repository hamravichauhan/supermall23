import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageOffers = () => {
    const [offers, setOffers] = useState([]);
    const [newOfferTitle, setNewOfferTitle] = useState('');
    const [newOfferDescription, setNewOfferDescription] = useState('');
    const [newOfferDiscount, setNewOfferDiscount] = useState('');
    const [editingOffer, setEditingOffer] = useState(null);

    useEffect(() => {
        const fetchOffers = async () => {
            const response = await axios.get('/api/offers');
            setOffers(response.data);
        };
        fetchOffers();
    }, []);

    const addOffer = async () => {
        const response = await axios.post('/api/offers', { 
            title: newOfferTitle, 
            description: newOfferDescription, 
            discount: newOfferDiscount 
        });
        setOffers([...offers, response.data]);
        setNewOfferTitle('');
        setNewOfferDescription('');
        setNewOfferDiscount('');
    };

    const updateOffer = async () => {
        const response = await axios.put(`/api/offers/${editingOffer._id}`, { 
            title: newOfferTitle, 
            description: newOfferDescription, 
            discount: newOfferDiscount 
        });
        setOffers(offers.map(offer => (offer._id === editingOffer._id ? response.data : offer)));
        setEditingOffer(null);
        setNewOfferTitle('');
        setNewOfferDescription('');
        setNewOfferDiscount('');
    };

    const deleteOffer = async (id) => {
        await axios.delete(`/api/offers/${id}`);
        setOffers(offers.filter(offer => offer._id !== id));
    };

    const startEditing = (offer) => {
        setEditingOffer(offer);
        setNewOfferTitle(offer.title);
        setNewOfferDescription(offer.description);
        setNewOfferDiscount(offer.discount);
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold">Manage Offers</h2>
            <div className="mt-4">
                <input
                    type="text"
                    value={newOfferTitle}
                    onChange={(e) => setNewOfferTitle(e.target.value)}
                    placeholder="Offer Title"
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    value={newOfferDescription}
                    onChange={(e) => setNewOfferDescription(e.target.value)}
                    placeholder="Offer Description"
                    className="border p-2 rounded ml-2"
                />
                <input
                    type="number"
                    value={newOfferDiscount}
                    onChange={(e) => setNewOfferDiscount(e.target.value)}
                    placeholder="Discount %"
                    className="border p-2 rounded ml-2"
                />
                {editingOffer ? (
                    <button onClick={updateOffer} className="bg-blue-600 text-white p-2 rounded ml-2">
                        Update Offer
                    </button>
                ) : (
                    <button onClick={addOffer} className="bg-purple-600 text-white p-2 rounded ml-2">
                        Add Offer
                    </button>
                )}
            </div>
            <ul className="mt-4">
                {offers.map(offer => (
                    <li key={offer._id} className="flex justify-between items-center border-b py-2">
                        {offer.title} - {offer.description} - {offer.discount}%
                        <div>
                            <button onClick={() => startEditing(offer)} className="bg-yellow-600 text-white p-1 rounded mr-2">
                                Edit
                            </button>
                            <button onClick={() => deleteOffer(offer._id)} className="bg-red-600 text-white p-1 rounded">
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageOffers;
