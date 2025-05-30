import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: { type:String, required: true},
    lastName: {type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { required: true , type:String}
}, {timestamps: true})

const User = mongoose.model("User", userSchema)

export default User