// server/controllers/offerController.js
import Offer from '../models/Offer.js';
import Shop from '../models/Shop.js';

export const createOffer = async (req, res) => {
    try {
        const offer = new Offer(req.body);
        await offer.save();
        res.json(offer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export const updateOffer = async (req, res) => {
    try {
        const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!offer) {
            return res.status(404).json({ msg: 'Offer not found' });
        }
        res.json(offer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export const deleteOffer = async (req, res) => {
    try {
        const offer = await Offer.findById(req.params.id);
        if (!offer) {
            return res.status(404).json({ msg: 'Offer not found' });
        }
        await offer.remove();
        res.json({ msg: 'Offer removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export const getOffers = async (req, res) => {
    try {
        const offers = await Offer.find();
        res.json(offers);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const getOffersByShop = async (req, res) => {
    // Implementation here...
};

const getOfferById = async (req, res) => { // Ensure this function is defined
    try {
        const offer = await Offer.findById(req.params.id)
            .populate('shop', ['name'])
            .populate('product', ['name', 'price']);
        
        if (!offer) {
            return res.status(404).json({ msg: 'Offer not found' });
        }
        
        res.json(offer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Exporting all methods
export default {
    createOffer,
    updateOffer,
    deleteOffer,
    getOffers,
    getOffersByShop,
    getOfferById // Ensure this is included
};
