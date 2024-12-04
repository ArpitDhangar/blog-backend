import express from 'express'
import { getAllPosts, singlePost, writePost, editPost, deletePost } from '../controllers/postController.js'
import { isAuthenticated } from '../middlewares/auth.js'


const router = express.Router()

router.get('/', getAllPosts)

router.get("/:id", singlePost)

router.post("/new",isAuthenticated, writePost)

router.put('/:id', isAuthenticated, editPost)

router.delete('/:id', isAuthenticated, deletePost)

export default router
