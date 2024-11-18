import express from 'express'
import { placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus, placeOrderRazorpay, verifyStripe, verifyRazorPay } from '../Controllers/orderController.js';
import adminAuth from '../Middlewares/adminAuth.js';
import userAuth from '../Middlewares/userAuth.js';


const orderRoute = express.Router();

//Admin Features
orderRoute.post('/list', adminAuth, allOrders);
orderRoute.post('/status', adminAuth, updateStatus);

//Payment Features
orderRoute.post('/place', userAuth, placeOrder);
orderRoute.post('/stripe', userAuth, placeOrderStripe);
orderRoute.post('/razorpay', userAuth, placeOrderRazorpay);

//Verify payment Route
orderRoute.post('/verifyStripe', userAuth, verifyStripe);
orderRoute.post('/verifyRazorpay', userAuth, verifyRazorPay);

//User Features
orderRoute.post('/userorders', userAuth, userOrders);




export default orderRoute;