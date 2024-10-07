import bcrypt from 'bcryptjs'; //for hashing the password
import jwt from 'jsonwebtoken'; //for creating token

import User from '../models/user.js';

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        //if user doesn't exist
        if (!existingUser) return res.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        //if password is incorrect
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        //if user exist and password is correct
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" });

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: "Sign In went wrong" });
    }
}

export const signup = async (req, res) => {
    const { email, password, firstName, lastName, confirmPassword } = req.body;
    try {
        const existingUser = await User.findOne({ email});
        //if user already exist
        if (existingUser) return res.status(400).json({ message: "User already exist" });

        //if password and confirmPassword doesn't match
        if (password !== confirmPassword) return res.status(400).json({ message: "Password doesn't match" });

        //hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        //create the user
        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" });

        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Sign Up went wrong" });
    }
}