// server/routes/shops.js
import express from 'express';
import auth from '../middleware/auth.js';
import shopController from '../controllers/shopController.js';

const router = express.Router();

router.post('/', auth, shopController.createShop);
router.put('/:id', auth, shopController.updateShop);
router.delete('/:id', auth, shopController.deleteShop);
router.get('/', shopController.getShops);
router.get('/:id', shopController.getShopById);
router.get('/category/:categoryId', shopController.getShopsByCategory);
router.get('/floor/:floorNumber', shopController.getShopsByFloor);

export default router;

