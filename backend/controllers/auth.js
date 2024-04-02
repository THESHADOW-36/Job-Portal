import asyncHandler from "../middlewares/async.js";
import User from "./../models/auth.js"

export const register = asyncHandler(async (req, res, next) => {
    const { role, fullName, phoneNumber, email, password } = req.body;

    if (!role || !fullName || !phoneNumber || !email || !password) return res.status(401).json({ success: false, message: "All feilds are required" });

    const user = await User.create({ role, fullName, phoneNumber, email, password })

    sendTokenResponse(user, 200, res)
})

export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) return res.status(401).json({ success: false, message: `User not found with email ${email}` });

    const isMatch = await user.matchPassword(password);

    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid password' });

    sendTokenResponse(user, 200, res);
})

const sendTokenResponse = (user, status, res) => {

    const token = user.getJWTWebToken();

    return res.status(status).json({ success: true, token, user });
}

export const getCurrentUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id)

    if (!user) return res.status(401).json({ success: false, message: "Id is not found" });

    res.status(200).json({ success: true, user })
})