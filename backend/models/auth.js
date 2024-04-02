import { compare, genSalt, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose, { Schema } from "mongoose";


const User = new Schema({
    role: {
        type: String,
        required: [true, 'Please select the role'],
        enum: ['Admin', 'User']
    },
    fullName: {
        type: String,
        required: [true, 'Please enter your name'],
        trim: true
    },
    phoneNumber: {
        type: Number,
        required: [true, 'Please enter your phone number'],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please enter your email id'],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        trim: true,
        minlength: [6, 'The password must be more than 6 character'],
        select: false
    }
})

User.pre('save', async function (next) {
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
    next();
});

User.methods.matchPassword = async function (enterPassword) {
    return await compare(enterPassword, this.password);
}

User.methods.getJWTWebToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_TOKEN_SECRET_KEY, {
        expiresIn: process.env.JWT_TOKEN_EXPIRE
    });
}


export default mongoose.model('User', User)