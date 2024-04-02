import mongoose, { Schema } from "mongoose";

const Job = new Schema({
    title: {
        type: String,
        required: [true, 'Please enter the job title'],
        trim: true
    },
    companyName: {
        type: String,
        required: [true, 'Please enter the name of the company'],
        trim: true
    },
    location: {
        type: String,
        required: [true, 'Please enter the name of the location'],
        trim: true
    },
    skills: {
        type: String,
        required: [true, 'Please enter your required skills'],
        trim: true
    },
    categories: {
        type: String,
        required: [true, 'Please enter the categories'],
        trim: true
    },
    salary: {
        type: Number,
        required: [true, 'Please enter the salary range'],
        trim: true
    },
    experience: {
        type: String,
        required: [true, 'Please enter the name of the instructor'],
        ref: "User",
        trim: true
    },
    qualification: {
        type: String,
        required: [true, 'Please enter the qualification'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please give a short description'],
        trim: true
    }
})

export default mongoose.model('Job', Job)