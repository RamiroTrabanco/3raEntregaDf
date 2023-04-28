import CartManager from "../dao/mongoManagers/CartManager.js";
import ProductManager from "../dao/mongoManagers/ProductManager.js";
import {ticketModel} from "../dao/mongoManagers/models/ticket.model.js"

const cartManager = new CartManager()
const productManager = new ProductManager()

export const getCartByIdController = async (req, res) => {
    const {cid} = req.params
    const cartById = await cartManager.getCartsById(cid)
    res.json({cartById})
}

export const addCartController = async(req, res)=>{
    const addCart = await cartManager.addCart()
    res.json({addCart})
}

export const addProductToCartController = async(req, res) => {
    const {cid, pid} = req.params
    const addProdToCart = await cartManager.addProductToCart(cid, pid)
    res.json({addProdToCart})
}

export const deleteCartController = async(req, res)=>{
    const {cid} = req.params
    const dltCart = await cartManager.deleteCart(cid)
    res.json({dltCart})
}


export const deleteProductOnCartController = async(req, res)=>{
    const {cid, pid} = req.params
    const dltProd = await cartManager.deleteProductOnCart(cid, pid)
    res.json({dltProd})
}

export const updateCartController = async(req, res)=>{
    const newProds = req.body
    const {cid} = req.params
    const updCart = await cartManager.updateCart(newProds, cid)
    res.json({updCart})
}

export const updateQuantController = async (req, res)=>{
    const newQuant = req.body
    const {cid, pid} = req.params
    const updStock = await cartManager.updateQuant(newQuant, cid, pid)
    res.json(updStock)
}

export const viewCartController = async(req, res)=>{
    try {
        const {cid} = req.params
        const getCart = await cartManager.getCartsById(cid)
        const getCartProds = getCart.products
        res.render("cart", {products: getCartProds})
    } catch (error) {
        return error
    }
}

export const purchaseCartController = async(req,res)=>{
    try {
        const {cid} = req.params
        const getCart = await cartManager.getCartsById(cid)
        let total = 0
        const cartProducts = getCart.products
        for (let i = 0; i < cartProducts.length; i++){
            const product = cartProducts[i]
            const dbProduct = await productManager.getProductsById(product._id)
            if (product.quantity <= dbProduct.stock){
                total += product.quantity * dbProduct.price
                const updStock = dbProduct.stock - product.quantity
                await productManager.updateProductStock(dbProduct._id, updStock)
                const ticket = await ticketModel.create({purchaser: req.session.user.mail, amount: total})
                res.json(ticket)
            }
            else {
                const deleteProd = await cartManager.deleteProductOnCart(cid, dbProduct)
                getCart.save()
                res.json(product._id)
            }
        }
    } catch (error) {
        return error
    }
}