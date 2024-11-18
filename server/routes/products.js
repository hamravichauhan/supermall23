// server/routes/products.js
import express from 'express';
import auth from '../middleware/auth.js';
import { 
    createProduct, 
    updateProduct, 
    deleteProduct, 
    getProducts, 
    getProductById, 
    getProductsByShop, 
    compareProducts 
} from '../controllers/productController.js';

const router = express.Router();

router.post('/', auth, createProduct);
router.put('/:id', auth, updateProduct);
router.delete('/:id', auth, deleteProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.get('/shop/:shopId', getProductsByShop);
router.post('/compare', compareProducts);

export default router;
