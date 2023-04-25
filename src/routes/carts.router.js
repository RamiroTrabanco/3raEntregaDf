import { Router } from "express"
import {getCartByIdController, addCartController, addProductToCartController, deleteProductOnCartController, deleteCartController, updateCartController, updateQuantController} from "../controllers/carts.controller.js"

const router = Router()

router.get("/GET/:cid", getCartByIdController)

router.post("/POST", addCartController)

router.post("/POST/:cid/product/:pid", addProductToCartController)

router.delete("/:cid/", deleteCartController)

router.delete("/:cid/products/:pid", deleteProductOnCartController)

router.put("/:cid", updateCartController)

router.put("/:cid/products/:pid", updateQuantController)

export default router