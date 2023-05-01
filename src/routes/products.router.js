import { Router } from "express"
import { addProductsController, deleteProductController, getProductsByIdController, getProductsController, updateProductController } from "../controllers/products.controller.js"
import { onlyAdm } from "../middlewares/role.middleware.js"
import passport from "passport"

const router = Router()

router.get("/GET", getProductsController)

router.get("/GET/:pid", getProductsByIdController)

router.post("/POST", onlyAdm, addProductsController)

router.put("/PUT/:pid", onlyAdm, updateProductController)

router.delete("/DELETE/:pid", onlyAdm, deleteProductController)

export default router