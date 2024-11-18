import express from 'express';
import {  listProducts, addProduct, removeProduct, singleProduct } from '../Controllers/productController.js';
import upload from '../Middlewares/multer.js';
import adminAuth from '../Middlewares/adminAuth.js';

const productRoutes = express.Router();


productRoutes.post('/add',adminAuth, upload.fields([{name:'image1', maxCount:1},{name:'image2', maxCount:1},{name:'image3', maxCount:1},{name:'image4', maxCount:1}]), addProduct);
productRoutes.post('/remove',adminAuth,  removeProduct);
productRoutes.post('/single', singleProduct);
productRoutes.get('/list', listProducts); 


export default productRoutes;