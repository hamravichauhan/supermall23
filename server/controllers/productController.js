// server/controllers/productController.js
import Product from '../models/Product.js';
import Shop from '../models/Shop.js';

export const createProduct = async (req, res) => {
    try {
        const shop = await Shop.findById(req.body.shop);
        if (!shop) {
            return res.status(404).json({ msg: 'Shop not found' });
        }

        const product = new Product({
            ...req.body,
            shop: shop._id
        });

        await product.save();
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        res.json(updatedProduct);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        await product.remove();
        res.json({ msg: 'Product removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('shop', 'name');
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('shop', 'name');
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export const getProductsByShop = async (req, res) => {
    try {
        const products = await Product.find({ shop: req.params.shopId });
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export const compareProducts = async (req, res) => {
    try {
        const { productIds } = req.body;
        const products = await Product.find({ _id: { $in: productIds } });
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
