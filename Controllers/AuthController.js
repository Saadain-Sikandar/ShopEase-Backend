import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../Model/User.js";

export const SignupController = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({
        message: "Please fill all fIelds!",
      });
    }
    if (email !== email.toLowerCase()) {
      return res.status(400).json({
        message: "Email should be in lower case!",
      });
    }
    const emailExist = await User.findOne({
      email,
    });
    if (emailExist) {
      return res.status(400).json({
        message: "Email Already Exists!",
      });
    }
    // hashing
    const hashPass = await bcrypt.hash(password, 8);

    const user = await User.create({
      fullname,
      email,
      password: hashPass,
    });
    res.status(201).json({
      message: "Signup Successful!",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill all fields!",
      });
    }

    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(404).json({
        message: "User not Found!",
      });
    }
    // decrypt
    const comparepass = await bcrypt.compare(password, user.password);

    if (!comparepass) {
      return res.status(400).json({
        message: "Invalid Credentials!",
      });
    }
    // JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );
    // not sending pass to frontend
    const { password: _, ...userData } = user.toObject();
    res.status(200).json({
      message: "Login Successfull!",
      token,
      user: userData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
