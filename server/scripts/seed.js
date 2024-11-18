import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Shop from '../models/Shop.js';
import Product from '../models/Product.js';

dotenv.config();

const shops = [
    { name: 'Shop 1', description: 'This is the first shop.', owner: '60d5ec49f1b2c8b1f8c8e1a1', category: '60d5ec49f1b2c8b1f8c8e1a2', floor: 1, image: 'https://via.placeholder.com/150' },
    { name: 'Shop 2', description: 'This is the second shop.', owner: '60d5ec49f1b2c8b1f8c8e1a1', category: '60d5ec49f1b2c8b1f8c8e1a2', floor: 2, image: 'https://via.placeholder.com/150' },
    { name: 'Shop 3', description: 'This is the third shop.', owner: '60d5ec49f1b2c8b1f8c8e1a1', category: '60d5ec49f1b2c8b1f8c8e1a2', floor: 3, image: 'https://via.placeholder.com/150' },
];

const products = [
    { name: 'Product 1', price: 10.99, description: 'This is the first product.', image: 'https://via.placeholder.com/150', shop: null },
    { name: 'Product 2', price: 15.99, description: 'This is the second product.', image: 'https://via.placeholder.com/150', shop: null },
    { name: 'Product 3', price: 20.99, description: 'This is the third product.', image: 'https://via.placeholder.com/150', shop: null },
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to the database.');

        // Clear existing data
        await Shop.deleteMany({});
        await Product.deleteMany({});

        // Insert shops
        const createdShops = await Shop.insertMany(shops);
        console.log('Shops created:', createdShops);

        // Assign shops to products
        products.forEach((product, index) => {
            product.shop = createdShops[index % createdShops.length]._id;
        });

        // Insert products
        const createdProducts = await Product.insertMany(products);
        console.log('Products created:', createdProducts);

        // Close the connection
        await mongoose.connection.close();
        console.log('Database seeding completed.');
    } catch (error) {
        console.error('Error seeding the database:', error);
    }
};

seedDatabase();
