import { Router } from "express";
import UsersManager from "../dao/mongoManagers/UsersManager.js";
import passport from "passport";
import { generateToken } from "../utils.js";
import { logoutController, registerUserController } from "../controllers/users.controller.js";


const usersManager = new UsersManager()

const router = Router()

router.post("/register", registerUserController)

router.post("/login", passport.authenticate("login",{failureRedirect: "/views/loginError", successRedirect: "/products", passReqToCallback: true}))

router.get("/registerGitHub", passport.authenticate("github",{ scope: [ 'user:email' ] }))

router.get("/GitHub", passport.authenticate("github"), (req, res)=>{
    req.session.email = req.user.email
    res.redirect("/products/")
})

router.get("/logout", logoutController)

export default router