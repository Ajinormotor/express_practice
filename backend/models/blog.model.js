import mongoose from "mongoose"


const blogSchema = new mongoose.Schema({
    title: { required: true, type: String},
    author: {required: true, ref: "User", type: mongoose.Schema.Types.ObjectId },
    content: { required: true, type: String},
    review: { type: String}
}, {timestamps: true})


const Blog = mongoose.model("Blog", blogSchema)

export default Blog