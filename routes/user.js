import { loginUser, registerUser, logoutUser, getProfile, updateProfile } from "../controllers/user.js";
import { Router } from "express";
import{hasPermission,isAuthenticated} from '../middlewares/auth.js';



const userRouter = Router();

userRouter.post('/users/register',registerUser);

userRouter.post('/users/login',loginUser);

userRouter.get('/users/me',isAuthenticated,hasPermission, getProfile);

userRouter.post('/users/logout',isAuthenticated, logoutUser);

userRouter.patch('/users/me',isAuthenticated,hasPermission, updateProfile);

export default userRouter;