import jwt from "jsonwebtoken";

const adminAuth = async (req,res,next) => {
   try {

    const { token } = req.headers;
        
        if(!token){
           return res.json({
                status:false,
                message: "Not Authorized, Login Again!!"
            })
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRETE)
        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            
            return res.json({
                status:false,
                message: "Not Authorized, Login Again!!"
            })
        }
        next();

   } catch (error) {
        res.json({
            status:false,
            message: error.message
        })
   }


}

export default adminAuth;