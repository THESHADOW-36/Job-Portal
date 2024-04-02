import { Router } from "express";
import { getCurrentUser, login, register } from "../controllers/auth.js";
import { protecter } from "../middlewares/auth.js";

const auth = Router();

auth.post('/register', register)
auth.post('/login', login)
auth.get('/current-user', protecter, getCurrentUser)

export default auth;