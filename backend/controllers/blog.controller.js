import mongoose from "mongoose"
import BlogModel from "../models/blog.model.js"

const blogs = [
  { id: 1, title: 'Introduction to JavaScript' },
  { id: 2, title: 'Understanding Node.js' },
  { id: 3, title: 'Mastering Express.js' },
  { id: 4, title: 'Working with MongoDB' },
]



export const getAllBlog =  async(req,res,next) => {

//     console.log(req.query)
// const title = req.query.title
// const limit = req.query.limit;

// if(title){
//          const blog = blogs.filter(b => 
//             b.title.toLowerCase().includes(title.toLowerCase())
//         );
//     console.log('Blog:', blog)
//     return res.status(200).json({data: blog})
// } 

// if(limit){
//     const blog = blogs.splice(0,parseInt(limit))
//     return res.status(200).json({blog})
// }

const blog = await BlogModel.find()
if(!blogs){
    const error = new Error('Blog not found')
    error.status(404)
    return next(error)
}

res.status(200)
    res.json({data: blog})

}

export const getSingleBlog =  async(req, res, next) => {
    // const id = parseInt(req.params.id);

    // if (isNaN(id)) {
    //     return res.status(400).json({ message: 'Invalid ID' });
    // }
const {id} = req.params
if(!mongoose.Types.ObjectId.isValid(id)){
    
    const error = new Error('Invalid id')
    error.status = 401
   return next(error)
}

    // const blog = blogs.find(b => b.id === id);
    const blog = await BlogModel.findById(id)

    if (!blog) {
const err = new Error('Blog not found')
next(err)
return;
    }

    res.status(200).json({ data: blog });
};



export const createBlog = async (req, res, next) => {
  try {
    const { title, author, content, review } = req.body;

    // Validate required fields
    if (!title || !author || !content) {
      const err = new Error("Fill all required fields");
      err.status = 400;
      return next(err);
    }

    const newBlog = {
      title,
      author: req.user.id,
      content,
      review, // Optional
    };

    const blog = await BlogModel.create(newBlog);

    return res
      .status(201)
      .json({ message: "Blog created successfully", data: blog });
  } catch (error) {
    next(error);
  }
};



export const updateBlog = async(req, res) => {

    // const id = parseInt(req.params.id);
    // console.log('ID is:', id);

    // if (isNaN(id)) {
    //     return res.status(400).json({ message: 'Invalid id' });
    // }

    const {id} = req.params
if(!mongoose.Types.ObjectId.isValid(id)){
    
    const error = new Error('Invalid id')
    error.status = 401
   return next(error)
}

    // const blog = blogs.find(b => b.id === id);

    //  if (!blog) {
    //     return res.status(404).json({ message: 'Blog not found' });
        
    // blog.title = req.body.title;
    // }

    const blog = await BlogModel.findByIdAndUpdate(id, req.body, {new: true})

    return res.status(200).json({ message: 'Blog updated successfully', data: blog });
};

export const deleteBlog =  async(req,res, next) => {


    // const id = parseInt(req.params.id)
    // console.log('ID is:', id)
    // if(isNaN(id)){
    //     return res.status(400).json({message: 'Invalid id'})
    // }

    const {id} = req.params
if(!mongoose.Types.ObjectId.isValid(id)){
    
    const error = new Error('Invalid id')
    error.status = 401
   return next(error)
}


//     const blog = blogs.findIndex(b => b.id === id)

//   if (blog === -1) {
//         return res.status(404).json({ message: 'Blog not found' });
//     }

//     blogs.splice(blog, 1)

const blog = await BlogModel.findByIdAndDelete(id)

if(!blog) {
        const err = new Error("Blog not found");
      err.status = 400;
      return next(err);
}

    return res.status(200).json({message: 'Blog deleted successfully'})

}

