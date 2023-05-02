import { Router } from "express"
import { addProductsController, deleteProductController, getProductsByIdController, getProductsController, updateProductController } from "../controllers/products.controller.js"
import { onlyAdm } from "../middlewares/role.middleware.js"
import passport from "passport"

const router = Router()

router.get("/GET", getProductsController)

router.get("/GET/:pid", getProductsByIdController)

router.post("/POST", passport.authenticate("jwt", {session:false}), onlyAdm, addProductsController)

router.put("/PUT/:pid", passport.authenticate("jwt", {session:false}), onlyAdm, updateProductController)

router.delete("/DELETE/:pid", passport.authenticate("jwt", {session:false}), onlyAdm, deleteProductController)

export default router