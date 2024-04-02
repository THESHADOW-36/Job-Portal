import { Router } from "express";
import auth from "./auth.js";
import portal from "./portal.js";

const router = Router();

router.use('/auth',auth)
router.use('/portal',portal)

export default router;