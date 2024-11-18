// server/routes/offers.js
import express from 'express';
import auth from '../middleware/auth.js';
import offerController from '../controllers/offerController.js';

const router = express.Router();

router.post('/', auth, offerController.createOffer);
router.put('/:id', auth, offerController.updateOffer);
router.delete('/:id', auth, offerController.deleteOffer);
router.get('/', offerController.getOffers);
router.get('/:id', offerController.getOfferById); // Ensure this function exists
router.get('/shop/:shopId', offerController.getOffersByShop);

export default router;
