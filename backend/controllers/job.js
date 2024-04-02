import asyncHandler from "../middlewares/async.js";
import Job from "./../models/job.js"

export const addJob = asyncHandler(async (req, res, next) => {
    const { title, companyName, location, skills, categories, salary, experience, qualification, description } = req.body;

    const job = await Job.create({ title, companyName, location, skills, categories, salary, experience, qualification, description })

    if (!job) return res.status(401).json({ success: false, message: 'Invalid Data' });

    res.status(200).json({ success: true, job })
})

export const getJobs = asyncHandler(async (req, res, next) => {

    const job = await Job.find({})

    if (!job) return res.status(401).json({ success: false, message: "job data list is not found" });

    res.status(200).json({ success: true, job })
})

export const getSingleJob = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const job = await Job.findById(id)

    if (!job) return res.status(401).json({ success: false, message: "job data list is not found" });

    res.status(200).json({ success: true, job })
})

export const editJob = asyncHandler(async (req, res, next) => {

    const { title, companyName, location, skills, categories, salary, experience, qualification, description } = req.body;

    const { id } = req.params;

    const job = await Job.findByIdAndUpdate(id, { title, companyName, location, skills, categories, salary, experience, qualification, description }, { new: true });

    res.status(200).json({ success: true, job })
})

export const deleteJob = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const job = await Job.findByIdAndDelete(id)

    if (!job) return res.status(401).json({ success: false, message: "job data is not found" });

    res.status(200).json({ success: true, message: 'job is deleted.', job })
})