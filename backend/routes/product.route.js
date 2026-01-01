import express from 'express';
import { createProducts, deleteProducts, getProducts, updateProducts } from '../controllers/product.controller.js';

const router=express.Router();

// fetching the products
router.get("/",getProducts)
// create a product
router.post("/",createProducts);
// delete the product
router.delete("/:id",deleteProducts);
//update the product
router.put("/:id",updateProducts);

export default router;