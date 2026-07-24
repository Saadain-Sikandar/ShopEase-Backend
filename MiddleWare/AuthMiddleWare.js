import jwt from "jsonwebtoken";
import { User } from "../Model/User.js";

const AuthMiddleWare = async (req, res, next) => {
  try {
    // 1. Get token from request header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "No Token Provided!",
      });
    }

    // extracting token
    const token = authHeader.split(" ")[1];
    // verifying
    const verify = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // finding user
    const user = await User.findById(verify.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not Found!",
      });
    }
    req.user = user;
    next(); //now every controller works after this middleware 
  } catch (error) {
    console.log(error);
  }
};

export default AuthMiddleWare
