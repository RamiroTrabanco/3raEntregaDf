import { Router } from "express";
import { getMsg } from "../controllers/messages.controller.js"
import { onlyUser } from "../middlewares/role.middleware.js";
import passport from "passport";

const router = Router()

router.get("/", passport.authenticate("jwt", {session:false}), onlyUser, getMsg)

export default router