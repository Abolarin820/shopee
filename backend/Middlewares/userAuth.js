import jwt from 'jsonwebtoken'


const userAuth = async (req,res,next) => {
    const {token} = req.headers;
    if(!token){
       return res.json({
            status:false,
            message: "You are not authorized, login again"
        })
    }

    try {

        const token_decode = jwt.verify(token, process.env.JWT_SECRETE)
        req.body.userId = token_decode.id
        next();

    } catch (error) {
        res.json({
            status:false,
            message:error.message
        })
    }
} 


export default userAuth;