import userModel from "../Models/userModels.js";


//Add products to user cart 

export const addToCart = async(req, res)=> {
    try {

        const {userId, itemId, size} = req.body;
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData

        if(cartData[itemId]){ 

            if(cartData[itemId][size]){
                cartData[itemId][size] +=1 
            }else{
                cartData[itemId][size] =1  
            }
        }else{
            cartData[itemId] = {}
            cartData[itemId][size] =1   
        }

        await userModel.findByIdAndUpdate(userId, {cartData})

        res.json({
            status:true,
            message: "Added to cart"
        })

    } catch (error) {
        res.json({
            status:false,
            message: error.message
        }) 
    }
}

//Update user cart

export const updateCart = async(req, res)=> {
   
    try {

        const {userId, itemId, size, quantity} = req.body;
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity
        await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({
            status:true,
            message: "Cart Updated"
        })

    } catch (error) {
        res.json({
            status:false,
            message: error.message
        }) 
    }
}

//Get all user cart

export const getUserCart = async(req, res)=> {
    try {
        const {userId} = req.body;
        const userData = await userModel.findById(userId);
       let cartData = await userData.cartData

        res.json({
            status:true,
            cartData
        })

    } catch (error) {
        res.json({
            status:false,
            message: error.message
        }) 
    } 
}


