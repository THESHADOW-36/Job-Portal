import jwt from "jsonwebtoken";
import asyncHandler from "./async.js";
import User from "../models/auth.js";


export const protecter = asyncHandler(async (req, res, next) => {
   let token;
   console.log("req:", req)
   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
   }
   // console.log("token : ", token)
   if (!token) {
      return res.status(401).json({ success: false, message: "Token is not found!" });
   }
   try {
      const decode = jwt.verify(token, process.env.JWT_TOKEN_SECRET_KEY);

      req.user = await User.findById(decode.id);

      next();
   } catch (error) {
      return res.status(401).json({ success: false, message: "You dont have aceess to this request" });
   }
})