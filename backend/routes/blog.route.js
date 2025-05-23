import express from "express";
import {
  getSingleBlog,
  getAllBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller.js";
import { protect } from "../middleware/protect.js";

const router = express.Router();

// Get All Blog
router.get("/", protect,  getAllBlog);

// Single Blog
router.get("/:id", getSingleBlog);

// create blog
router.post("/", createBlog);

// updateBlog
router.put("/:id", updateBlog);

// delete blog
router.delete("/:id", deleteBlog);

export default router;
