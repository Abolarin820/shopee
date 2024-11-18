import orderModel from "../Models/orderModels.js";
import userModel from "../Models/userModels.js";
import Stripe from 'stripe';
import razorpay from 'razorpay';

//Global variable
const currency = 'usd'
const deliveryCharge = 10
//Gateway Initialze
const stripe = new Stripe(process.env.STRIPE_SECRETE_KEY);
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRETE
}) 

//Placing orders using COD Method
export const placeOrder = async (req, res) => {
   try {
        const {userId, items, amount, address} = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:'COD',
            payment:false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, {cartData:{}});

        res.json({
            status:true,
            message: "Order Placed Successfully"
        })

   } catch (error) {
     res.json({
            status:false,
            message:error.message
        })
   }
}

//Placing orders using Stripe Method
export const placeOrderStripe = async (req, res) => {
    try {

        const { userId, items, amount, address } = req.body
        const {origin} = req.headers 

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod:"Stripe",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item) => (
            {
                price_data:{
                    currency:currency,
                    product_data:{
                        name:item.name
                    },
                    unit_amount: item.price * 100
                },
                quantity:item.quantity
            }
        ))

        line_items.push(
            {
                price_data:{
                    currency:currency,
                    product_data:{
                        name:"Delivery Charges"
                    },
                    unit_amount: deliveryCharge * 100
                },
                quantity:1
            }
        )
    //To create a new session 
    const session = await stripe.checkout.sessions.create({
        success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
        line_items,
        mode:'payment',
    })

    res.json({
        success:true,
        session_url: session.url
    })

    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}

//Verify Stripe 
export const verifyStripe = async (req,res) => {
    const {userId, success, orderId} = req.body
    try {
        if(success === 'true'){
            await orderModel.findByIdAndUpdate(orderId, {payment:true})
            await userModel.findByIdAndUpdate(userId, {cartData:{}})
            res.json({success:true})
        }else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false})
        }
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}

//Placing orders using Razorpay Method
export const placeOrderRazorpay = async (req, res) => {
    try {

        const { userId, items, amount, address } = req.body
        
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod:"Razorpay",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()
        }

        await razorpayInstance.orders.create(options, (error, order)=>{
            if(error){
               return res.json({
                    success:false,
                    message: error
                }) 
            }
            res.json({
                success:true,
                order
            })
        })
     
    

    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }

}

//Verify Razorpay
export const verifyRazorPay = async (req, res) => {
    try {
        const {userId, razorpay_order_id} = req.body;

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        console.log(orderInfo)
        if(orderInfo.status === 'paid'){
            await orderModel.findByIdAndUpdate(orderInfo.receipt, {payment:true})
            await userModel.findByIdAndUpdate(userId, {cartData:{}})

            res.json({success:true, message:"Payment Successful"})
        }else{
            res.json({success:false, message:"Payment Failed"})
        }

    } catch (error) {
        res.json({success:false, message:error.message})
    }
}


//All orders display on admin panel
export const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({
            status: true,
            orders
        })
    } catch (error) {
        res.json({
            status:false,
            message:error.message
        })  
    }
}

//User orders at the fontend
export const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({userId})

        res.json({
            status:true,
            orders
        })

    } catch (error) {
        res.json({
            status:false,
            message:error.message
        })  
    }
}

//Update orders status from admin pannel
export const updateStatus = async (req, res) => {
    try {
        const {orderId, status} = req.body;
        await orderModel.findByIdAndUpdate(orderId, {status})

        res.json({
            status:true,
            message: "Status Updated"
        })
    } catch (error) {
        res.json({
            status:false,
            message:error.message
        })
    }
}