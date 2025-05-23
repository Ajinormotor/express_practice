import UserModel from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import {  generateToken } from "../utils/generateAndVerifyToken.js"



export const register = async(req,res, next) => {

    const { fullName, lastName, email, password} = req.body
if(!fullName || !lastName || !email || !password){
    const error = new Error("Please fill in all fields")
    error.status = 401
    return next(error)
}

    const exisitingUsers =  await UserModel.findOne({email})
    if(exisitingUsers){
           const error = new Error("User exists already")
    error.status = 401
    return next(error)
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await UserModel.create({fullName, lastName, password: hashedPassword, email})

    // jwt verify
    const token = generateToken({id: user._id})

    return res.status(200).json({
        message: "registered successful",
        data: user,
        token: token
    })


}


export const login = async (req,res,next) => {

    const { email, password} = req.body
if(!email || !password){
    const error = new Error("Please fill in all fields")
    error.status = 401
    return next(error)
}

const user = await UserModel.findOne({ email });

    if(!user){
           const error = new Error("User exists already")
    error.status = 401
    return next(error)

    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
   const error = new Error("Passowrd is incorrect")
    error.status = 401
    return next(error)
    }

   const token = generateToken({id: user._id})



    return res.status(200).json({
        message: "login successful",
        data: user,
        token: token
    })


}