import {Post} from '../models/post.js'
import { sendCookie } from '../utils/features.js'

export const getAllPosts = async(req, res, next) => {
    try {
        const posts = await Post.find()
        res.status(200).json(posts)
    } catch (error) {
        next(error)
    }
}

export const singlePost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate('author', 'name email');
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching post', error: error.message });
    }
  };

export const writePost = async(req, res, next) => {
    try {
        const {title, content} = req.body
        const newPost = new Post({
            title,
            content,
            author: req.user.id
        })
        const savePost = await newPost.save()
        res.status(201).json(savePost)  
    } catch (error) {
        next(error)
    }
}

export const editPost = async (req, res) => {
    try {
      const { title, content, tags } = req.body;
      const post = await Post.findById(req.params.id);
      if (!post || post.author.toString() !== req.user.id) {
        return res.status(403).json({ message: 'You are not authorized to edit this post' });
      }
      post.title = title || post.title;
      post.content = content || post.content;
      post.tags = tags || post.tags;
      const updatedPost = await post.save();
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json({ message: 'Error updating post', error: error.message });
    }
  };

  export const deletePost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post || post.author.toString() !== req.user.id) {
        return res.status(403).json({ message: 'You are not authorized to delete this post' });
      }
      await post.deleteOne();
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting post', error: error.message });
    }
  };