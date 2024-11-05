
// register, login, logout
import { registerUserValidator, loginUserValidator, updateProfileValidators } from '../validators/user.js';
import { UserModel } from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { AddressModel } from '../models/address.js';
export const registerUser = async (req, res, next) => {
    try {
        //validate user input
        const { error, value } = registerUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error)
        }
        //check if user does not exist
        const user = await UserModel.findOne({ email: value.email });
        if (user) {
            return res.status(409).json('User already exist');
        }
        //harsh their password
        const hashedPassword = bcrypt.hashSync(value.password, 10);

        //save the user into database
        await UserModel.create({
            ...value,
            password: hashedPassword
        });

        res.status(200).json('user registered');
    } catch (error) {
        next(error);

    }
}

export const loginUser = async (req, res, next) => {
    try {
        //validate user input
        const { error, value } = loginUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        //find one user with identifier
        const user = await UserModel.findOne({ email: value.email });
        if (!user) {
            return res.status(404).json('User does not exist');
        }
        //compare their passwords
        const correctPassword = bcrypt.compareSync(value.password, user.password);
        if (!correctPassword) {
            return res.status(401).json('Invalid credentials');
        }
        //sign a token for user
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: '24hr' }
        );
        //respond to request
        res.json({
            message: 'User logged in',
            accessToken: token
        })
        res.status(201).json('user logged in successfully ');
    } catch (error) {
        next(error);

    }
}
export const getProfile = async (req, res, next) => {
    try {
        // console.log("Authenticated user ID:", req.auth?.id);

        // if (!req.auth?.id) {
        //     return res.status(400).json({ message: "Invalid authentication data." });
        // }
        //find authenticated user from database
        const user = await UserModel
            .findById(req.auth.id)
            .select({ password: false });
        //respond to request

        res.status(200).json(user);

    } catch (error) {
        next(error);
    }
}

export const logoutUser = (req, res) => {
    try {
        //check if session exists
        if (!req.session) {
            return res.sendstatus(404);
        }
        req.session.destroy();
        res.status(200).json('user logged out');
    } catch (error) {
        res.status(500).json({ message: 'logout failed,please try again' });

    }
}

export const updateProfile =async (req, res, next) => {
    try {
        //validate user input
        const { error, value } = updateProfileValidators.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        const updateAddress = await AddressModel.findByIdAndUpdate(req.params.id,req.body,{new:true});


        res.json('user profile updated');
    } catch (error) {
        next(error);

    }
}