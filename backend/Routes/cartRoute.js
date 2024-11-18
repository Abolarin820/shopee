import express from 'express'
import { addToCart, getUserCart, updateCart } from '../Controllers/cartController.js';
import userAuth from '../Middlewares/userAuth.js';

const cartRoute = express.Router();

cartRoute.post('/add', userAuth, addToCart);
cartRoute.post('/update', userAuth, updateCart);
cartRoute.post('/get', userAuth, getUserCart);


export default cartRoute;