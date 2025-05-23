import UserModel from "../models/user.model.js"

export const getAllUser = async(req,res,next) => {
    
    const user = await UserModel.find()
    
    if(!user){
    const error = new Error('No user foun')
    error.status = 404
    return next(error)
 }


 return res.status.json({
    data: user
 })

 
}


export const getSingleUser = async(req,res) => {

}