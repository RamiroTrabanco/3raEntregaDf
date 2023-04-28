import { Router } from "express";
import { getMsg } from "../controllers/messages.controller.js"
import { onlyUser } from "../middlewares/role.middleware.js";

const router = Router()

router.get("/", onlyUser, getMsg)

export default router