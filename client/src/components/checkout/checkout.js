import React, { useState } from 'react';
import axios from 'axios';

const Checkout = ({ cartItems, onCheckoutComplete }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCheckout = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('/api/checkout', { items: cartItems });
            onCheckoutComplete(response.data);
        } catch (err) {
            setError('Checkout failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            {error && <p className="error">{error}</p>}
            <ul>
                {cartItems.map(item => (
                    <li key={item._id}>
                        {item.name} - ${item.price} x {item.quantity}
                    </li>
                ))}
            </ul>
            <button onClick={handleCheckout} disabled={loading}>
                {loading ? 'Processing...' : 'Complete Checkout'}
            </button>
        </div>
    );
};

export default Checkout;
