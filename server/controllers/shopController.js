// server/controllers/shopController.js
import Shop from '../models/Shop.js';

export const createShop = async (req, res) => {
    try {
        const shop = new Shop(req.body);
        await shop.save();
        res.json(shop);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export const updateShop = async (req, res) => {
    try {
        const shop = await Shop.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!shop) {
            return res.status(404).json({ msg: 'Shop not found' });
        }
        res.json(shop);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export const deleteShop = async (req, res) => {
    try {
        const shop = await Shop.findById(req.params.id);
        if (!shop) {
            return res.status(404).json({ msg: 'Shop not found' });
        }
        await shop.remove();
        res.json({ msg: 'Shop removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export const getShops = async (req, res) => {
    try {
        const shops = await Shop.find();
        res.json(shops);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export const getShopById = async (req, res) => {
    try {
        const shop = await Shop.findById(req.params.id)
            .populate('owner', ['name', 'email'])
            .populate('category', ['name']);
        
        if (!shop) {
            return res.status(404).json({ msg: 'Shop not found' });
        }
        
        res.json(shop);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export const getShopsByCategory = async (req, res) => {
    try {
        const shops = await Shop.find({ category: req.params.categoryId })
            .populate('owner', ['name', 'email'])
            .populate('category', ['name']);
        res.json(shops);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export const getShopsByFloor = async (req, res) => {
    try {
        const shops = await Shop.find({ floor: req.params.floorNumber })
            .populate('owner', ['name', 'email'])
            .populate('category', ['name']);
        res.json(shops);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export default {
    createShop,
    updateShop,
    deleteShop,
    getShops,
    getShopById,
    getShopsByCategory,
    getShopsByFloor
};
