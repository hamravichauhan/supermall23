import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [newProductName, setNewProductName] = useState('');
    const [newProductPrice, setNewProductPrice] = useState('');
    const [newProductDescription, setNewProductDescription] = useState('');
    const [newProductImage, setNewProductImage] = useState('');
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get('/api/products');
            setProducts(response.data);
        };
        fetchProducts();
    }, []);

    const resetForm = () => {
        setNewProductName('');
        setNewProductPrice('');
        setNewProductDescription('');
        setNewProductImage('');
        setEditingProduct(null);
    };

    const addProduct = async () => {
        const response = await axios.post('/api/products', { 
            name: newProductName, 
            price: newProductPrice, 
            description: newProductDescription, 
            image: newProductImage 
        });
        setProducts([...products, response.data]);
        resetForm();
    };

    const updateProduct = async () => {
        const response = await axios.put(`/api/products/${editingProduct._id}`, { 
            name: newProductName, 
            price: newProductPrice, 
            description: newProductDescription, 
            image: newProductImage 
        });
        setProducts(products.map(product => (product._id === editingProduct._id ? response.data : product)));
        resetForm();
    };

    const deleteProduct = async (id) => {
        await axios.delete(`/api/products/${id}`);
        setProducts(products.filter(product => product._id !== id));
    };

    const startEditing = (product) => {
        setNewProductName(product.name);
        setNewProductPrice(product.price);
        setNewProductDescription(product.description);
        setNewProductImage(product.image);
        setEditingProduct(product);
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
            <div className="flex mb-4">
                <input
                    type="text"
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                    placeholder="Product Name"
                    className="border p-2 rounded"
                />
                <input
                    type="number"
                    value={newProductPrice}
                    onChange={(e) => setNewProductPrice(e.target.value)}
                    placeholder="Product Price"
                    className="border p-2 rounded ml-2"
                />
                <input
                    type="text"
                    value={newProductDescription}
                    onChange={(e) => setNewProductDescription(e.target.value)}
                    placeholder="Product Description"
                    className="border p-2 rounded ml-2"
                />
                <input
                    type="text"
                    value={newProductImage}
                    onChange={(e) => setNewProductImage(e.target.value)}
                    placeholder="Image URL"
                    className="border p-2 rounded ml-2"
                />
                {editingProduct ? (
                    <button onClick={updateProduct} className="bg-blue-600 text-white p-2 rounded ml-2">
                        Update Product
                    </button>
                ) : (
                    <button onClick={addProduct} className="bg-green-600 text-white p-2 rounded ml-2">
                        Add Product
                    </button>
                )}
            </div>
            <ul className="mt-4">
                {products.map(product => (
                    <li key={product._id} className="flex justify-between items-center border-b py-2">
                        <img src={product.image} alt={product.name} className="w-16 h-16 object-cover mr-2" />
                        <div>
                            <strong>{product.name}</strong> - ${product.price} - {product.description}
                        </div>
                        <div>
                            <button onClick={() => startEditing(product)} className="bg-yellow-600 text-white p-1 rounded mr-2">
                                Edit
                            </button>
                            <button onClick={() => deleteProduct(product._id)} className="bg-red-600 text-white p-1 rounded">
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageProducts;
