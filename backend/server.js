import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './Config/mongodb.js';
import cloudinaryConnect from './Config/cloudinary.js';
import userRouter from './Routes/userRoute.js';
import productRoutes from './Routes/productRoute.js';
import cartRoute from './Routes/cartRoute.js';
import orderRoute from './Routes/orderRoute.js';

//App config
const app = express();
const port = process.env.PORT || 3000
connectDB();
cloudinaryConnect();

//middlewares
app.use(express.json())
app.use(cors())


//API Endpoints
app.use('/api/user', userRouter);
app.use('/api/product',productRoutes);
app.use('/api/cart', cartRoute);
app.use('/api/order',orderRoute)

app.listen(process.env.PORT, ()=>{
    console.log('App is running on:' + port)
})
