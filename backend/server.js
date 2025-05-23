import express from 'express'

import logger from './middleware/logger.js'
import errorHandler from "./middleware/errorHandler.js"
import { connectB } from './config/db.js'
import dotenv from 'dotenv'
import path from 'path';

import blogRoutes from "./routes/blog.route.js"
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"

import multer from 'multer'




dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000


app.use(express.json())
// console.log("Mongo url:", process.env.MONGO_URL)


app.use(logger)

app.use('/api/blogs', blogRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)

// Set up storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('file') ,(req,res) => {
    console.log('request body', req.body)
    res.status(200).json({
        message: 'File uploaded usccessfully',
    file:req.file

    })
})


app.use( ( req,res, next) => {
    // console.log('Err', err)
    // res.status(500).json({message: " An error occured"})
   const error = new Error('Route not found')
   error.status = 404
   next(error)
})  

app.use(errorHandler)


// mongoose.connect('mongo')

app.listen(PORT, () => {
    connectB(),
    console.log(`Server is listening at localhost:${PORT}`)
})