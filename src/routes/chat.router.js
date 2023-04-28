import { Router } from "express";
import { getMsg } from "../controllers/messages.controller.js"

const router = Router()

router.get("/", getMsg)

export default router