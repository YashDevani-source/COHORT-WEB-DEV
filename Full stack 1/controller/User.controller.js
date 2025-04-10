import User from "../model/User.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import { errorMonitor } from "events";

const registerUser = async (req, res) => {
    // Get data 
    // velidate 
    // check if user already exists
    // create a user in database 
    // create a verification token 
    // save token in database 
    // send token as email to user
    // send success status to user 
    const {name , email, password} = req.body

    if(!name || !email || !password){
        return res.status(400).json({
            message: "All fields are required",
        })
    }
    console.log(email);
    
    try {
       const existingUser = await User.findOne({email})


       if (existingUser) {
        return res.status(200).json({
            message: "User already exists"
        })
       }

        const user =  await User.create({
                name,
                email,
                password
        })
        console.log(user);
        

        if (!user) {
            return res.status(400).json({
                message: "User not registered"
            })
        }


        const token = crypto.randomBytes(32).toString("hex")
        console.log(token);
        user.verificationToken = token 
        
        await user.save();

        // send email

        const transporter =  nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: MAILTRAP_PORT,
            secure: false, // true for port 465, false for other ports
            auth: {
                user: MAILTRAP_USERNAME,
                pass: MAILTRAO_PASSWORD,
            },
        });

        const mailOption = {
            from: process.env.MAILTRAP_SENDERMAIL, 
            to: user.email, 
            subject: "Verify your email",
            text: `Please click on the following link:
            ${process.env.BASE_URL}/api/v1/users/verify/${token}`,
        }

        // await transporter.sendMail(mailOption)

        res.status(200).json({
            message: "User registered successfully",
            success: true,
        })

    } catch (error) {
        res.status(400).json({
            message: "User not registered ",
            error,
            success: false,
        })
    }
}

const VerifyUser = async (req, res) => {
    // get token from url 
    // velidate
    // find user based on token 
    // if not 
    // set verified field to true 
    // remove verification token 
    // save
    // return response 

    const {token} = req.params;
    console.log(token);
    if(!token){
        res.status(400).json({
            message: "Invalid token"
        })
    }
   const user = await User.findOne({verificationToken: token})
   if(!user){
    res.status(400).json({
        message: "Invalid token"
    })
    }
    user.isVerified = true
    user.verificationToken = undefined
    await user.save()

    if(user){
        res.status(200).json({
            message: "verification successful",
            success: true
        })
    }
};

const login = async (req, res) => {
    
    const {email , password} = req.body

    if(!email || !password){
        res.status(400).json({
            message: "All fields are required"
        })
    }

    try {
     const user =  await User.findOne({email})
     console.log(user);
     

     if(!user){
        res.status(400).json({
            message: "Invalid email or password"
        });
     }

     const isMatch = await bcrypt.compare(password , user.password)

     console.log(isMatch);

     if(!isMatch){
        res.status(400).json({
            message: "Invalid email or password"
        });
     }


     const token =  jwt.sign(
        {id: user._id, role: user.role},

        process.env.JWT_SECRET, {
            expiresIn: '24h'
        }
     );

     const cookieOptions = {
        httpOnly: true,
        secure: true,
        maxAge: 24*60*60*1000
     }
     res.cookie("token", token, cookieOptions)

     res.status(200).json({
        success: true,
        message: "Login Successful",
        token,
        user: {
            id: user._id,
            name: user.name,
            role: user.role,

        }
     })

    } catch (error) {
        res.status(400).json({
            success: false,
            error,
            message: "Login Failed"
        })
    }
};

const getMe = async (req, res) => {
    try {

      const user = await User.findById(req.user.id).select('-password')
      console.log("User",user);
      
      if(!user){
       return res.status(400).json({
            success: false,
            message:"User not found",
        })
      }

      res.status(200).json({
        success: true,
        user,
        message: "profie",
      })
        
    } catch (error) {
            console.log("error in getMe,",error)
    }

}

const logoutUser = async (req, res) => {
    try {
        res.cookie('token', '' , {});
        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error,
            message: "Logged out fails something error"
        })
    }
}

const forgotPassword = async (req, res) => {
    try {
        // get email
        // find user base on email
        // reset token + reset expiry => Date() + 10*60*1000
        // send mail => design url
    } catch (error) {
        
    }
}

const resetPassword = async (req, res) => {
    try {
        // collect token from params 
        // passeord from req.body
        
    } catch (error) {
        
    }
}

export { registerUser , VerifyUser , login , getMe , logoutUser , forgotPassword , resetPassword};