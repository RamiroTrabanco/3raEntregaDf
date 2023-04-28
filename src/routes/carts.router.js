import { Router } from "express"
import {getCartByIdController, addCartController, addProductToCartController, deleteProductOnCartController, deleteCartController, updateCartController, updateQuantController, purchaseCartController} from "../controllers/carts.controller.js"
import { onlyUser } from "../middlewares/role.middleware.js"

const router = Router()

router.get("/GET/:cid", getCartByIdController)

router.post("/POST", addCartController)

router.post("/POST/:cid/product/:pid", onlyUser, addProductToCartController)

router.delete("/:cid/", deleteCartController)

router.delete("/:cid/products/:pid", deleteProductOnCartController)

router.put("/:cid", updateCartController)

router.put("/:cid/products/:pid", updateQuantController)

router.post("/:cid/purchase", purchaseCartController)

export default router