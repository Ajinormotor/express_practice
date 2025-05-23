import mongoose from "mongoose"


const blogSchema = new mongoose.Schema({
    title: { required: true, type: String},
    author: {required: true, type:String},
    content: { required: true, type: String},
    review: { type: String}
}, {timestamps: true})


const Blog = mongoose.model("Blog", blogSchema)

export default Blog