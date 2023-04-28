import ProductManager from "../dao/mongoManagers/ProductManager.js";
import { cartsModel } from "../dao/mongoManagers/models/carts.model.js";

const productManager = new ProductManager()

export default class CartsRepository{

    async addProductToCart(cartId, prodId) {
        const cart = await cartsModel.findById(cartId);
        const product = await productManager.getProductsById(prodId);
    
        if (!product) {
            throw new Error(`El producto no existe.`);
        }
    
        const cartProduct = cart.products.find((prod) => prod._id == prodId);
    
        if (!cartProduct) {
            const newProd = {
                _id: prodId,
                quantity: 1
            }
            cart.products.push(newProd);
        } else {
            cartProduct.quantity += 1;
        }
    
        const updatedCart = await cart.save();
        return updatedCart;
    }

    async deleteCart(cartId){
        const cartById = await cartsModel.findById(cartId)
        const productsLength = cartById.products.length
        cartById.products.splice(0, productsLength)
        cartById.save()
        return cartById
    }

    async deleteProductOnCart(cartId, prodId){
        const cartById = await cartsModel.findById(cartId)
            const findProd = cartById.products.find(prod=>prod.id===prodId)
            const indexProd = cartById.products.indexOf(findProd)
            cartById.products.splice(indexProd, 1)
            const newCart = cartById
            return await cartById.updateOne(newCart)
    }

    async updateCart(newProds, cid){
        const cartById = await cartsModel.findById(cid)
            const cartNewProds = {
                id: cid,
                products: newProds
            }
            return await cartById.replaceOne(cartNewProds)
    }

    async updateQuant(quant, cid, pid){
        const cartById = await cartsModel.findById(cid)
        const findProd = cartById.products.find(prod=>prod.id===pid)
        const prodNewQuant = {
            id: pid,
            quantity: quant.quantity
        }
        const indexProd = cartById.products.indexOf(findProd)
        cartById.products.splice(indexProd, 1)
        cartById.products.push(prodNewQuant)
        console.log(cartById.products)
        cartById.save()
        return cartById
    }
}