// server/routes/categories.js
import express from 'express';
import {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategories,
    getCategoryById,
} from '../controllers/categoryController.js';

const router = express.Router();

// Define routes and link to controller functions
router.post('/', createCategory);           // Create a new category
router.put('/:id', updateCategory);         // Update an existing category by ID
router.delete('/:id', deleteCategory);      // Delete a category by ID
router.get('/', getCategories);             // Get all categories
router.get('/:id', getCategoryById);        // Get a category by ID

export default router;
