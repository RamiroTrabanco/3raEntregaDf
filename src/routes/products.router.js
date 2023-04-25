import { Router } from "express"
import { addProductsController, deleteProductController, getProductsByIdController, getProductsController, updateProductController } from "../controllers/products.controller.js"

const router = Router()

router.get("/GET", getProductsController)

router.get("/GET/:pid", getProductsByIdController)

router.post("/POST", addProductsController)

router.put("/PUT/:pid", updateProductController)

router.delete("/DELETE/:pid", deleteProductController)

export default router