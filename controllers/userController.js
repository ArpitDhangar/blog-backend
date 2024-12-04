import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/user.js";
import {Post} from '../models/post.js';
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User ALready Exists", 404));

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashedPassword });

    sendCookie(user, res, "Registered Successfully", 201);
  } catch (err) {
    next(err);
  }
};

export const login = async(req, res, next) => {
try {
    const {email, password} = req.body
    const user = await User.findOne({email}).select("+password")

    if(!user) return next(new ErrorHandler("Invalid Email or Password", 404))
    
    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch)
        return next(new ErrorHandler("Invalid Email or Password", 404))

    sendCookie(user, res, `Welcome back, ${user.name}`, 200)
} catch (error) {
    next(error)
}
}



export const getMyProfile = async (req, res) => {
  try {
    // Fetch posts created by the user
    const posts = await Post.find({ author: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      user: req.user, // User details
      posts, // Posts made by the user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
      error: error.message,
    });
  }
};


export const logout = (req, res) => {
    res.status(200).cookie("token","",{
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV
    })
}
