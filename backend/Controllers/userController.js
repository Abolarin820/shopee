import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from "../Models/userModels.js";




const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRETE)
}



//Route for user registration
const registerUser = async (req, res) => {
   try {

    const {name, email, password} = req.body;

    //Checking if user already exist
    const userExist = await userModel.findOne({email});
    
    if(userExist){
        return res.json({
            status: false,
            message: "User already exist"
        })
    }
    //Validating Email format and strong password
    if(!validator.isEmail(email)){
        return res.json({
            status: false,
            message: "Please enter a valid email"
        })
    }
    if(password.length < 8){
        return res.json({
            status: false,
            message: "Please enter a strong password"
        })
    }
   
    //Hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashPassword =  await bcrypt.hash(password, salt);


    const newUser = new userModel({
        name,
        email,
        password: hashPassword,
    })

    const user = await newUser.save();
    const token = createToken(user._id);

    res.json({
        status:true,
        token
    })

   } catch (error) {

    res.json({
        status:false,
        message: error.message
    })
   }
}

//Route for user login  
const loginUser = async (req, res) => {
    try {
        
        const {email, password, userId} = req.body;
       
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({
                status:false,
                message:"There is no record found for this user"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){

            const token = createToken(user._id)
            res.json({
                status:true,
                message:"Login successful",
                token
            })
        }else{
            res.json({
                status:false,
                message:"Email or Password is incorrect"
            })
        }

    } catch (error) {
        res.json({
            status:false,
            message:error.message
        })
    }
}


//Route for admin login
const adminLogin = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRETE);

            res.json({
                status:true,
                token
            });
        }else{
            res.json({
                status:false,
                message: "Invalid Credentials"
            }); 
        }
    } catch (error) {
        res.json({
            status:false,
            message: error.message
        })
    }
}

export {loginUser, registerUser, adminLogin}