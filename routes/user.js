import express from 'express'
import {register, login, logout, getMyProfile, getAllUsers} from '../controllers/userController.js'
import {isAuthenticated} from '../middlewares/auth.js'

const router = express.Router()

router.get('/', getAllUsers)

router.post("/new", register)

router.post("/login", login)

router.get("/logout", logout)

router.get("/me", isAuthenticated, getMyProfile)

export default router