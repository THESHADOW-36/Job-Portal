import { Router } from "express";
import { protecter } from "../middlewares/auth.js";
import { addJob, deleteJob, editJob, getJobs, getSingleJob } from "../controllers/job.js";

const job = Router();

job.post('/job', protecter, addJob)
job.get('/job', protecter, getJobs)
job.get('/job/:id', protecter, getSingleJob)
job.put('/job/:id', protecter, editJob)
job.delete('/job/:id', protecter, deleteJob)

job.post('/apply-job')

export default job;