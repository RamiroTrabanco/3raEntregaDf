import ProductManager from "../dao/mongoManagers/ProductManager.js";
import { cartsModel } from "../dao/mongoManagers/models/carts.model.js";
import { ticketModel } from "../dao/mongoManagers/models/ticket.model.js";

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
        await cartById.save()
        return cartById
    }

    async deleteProductOnCart(cartId, prodId){
        const cartById = await cartsModel.findById(cartId)
            const findProd = cartById.products.find(prod=>prod.id===prodId)
            const indexProd = cartById.products.indexOf(findProd)
            cartById.products.splice(indexProd, 1)
            return await cartById.save()
    }

    async updateCart(newProds, cid){
        const cartById = await cartsModel.findById(cid)
            const cartNewProds = {
                id: cid,
                products: newProds
            }
            return await cartById.save()
    }

    async updateQuant(quant, cid, pid){
        const cartById = await cartsModel.findById(cid)
        const findProd = cartById.products.find(prod=>prod.id===pid)
        const prodNewQuant = {
            id: pid,
            quantity: quant
        }
        const indexProd = cartById.products.indexOf(findProd)
        cartById.products.splice(indexProd, 1)
        cartById.products.push(prodNewQuant)
        console.log(cartById.products)
        await cartById.save()
        return cartById
    }

    async purchaseCart(cartId, user) {
        try {
            const cart = await cartsModel.findById(cartId);;
            let total = 0;
            const cartProducts = cart.products;
            const productsBought = [];
            const productsNotBought = [];
            for (let i = 0; i < cartProducts.length; i++) {
                const product = cartProducts[i];
                const dbProduct = await productManager.getProductsById(product._id);
            if (product.quantity <= dbProduct.stock) {
                let quantPrice = product.quantity * dbProduct.price;
                total += quantPrice;
                const updStock = dbProduct.stock - product.quantity;
                await productManager.updateProductStock(dbProduct._id, updStock);
                productsBought.push({
                    _id: dbProduct._id,
                    quantity: product.quantity,
                    price: dbProduct.price
            });
            } else {
                productsNotBought.push({
                    _id: dbProduct._id,
                    stock: dbProduct.stock,
                    quantity: product.quantity
            })
            }
        }
        if (productsNotBought.length > 0) {
        throw new Error(`No hay suficiente stock para los siguientes productos: ${productsNotBought.map((product) => `${product.name} (${product.stock})`
        )}`);
        
        } else {
            const ticket = await ticketModel.create({purchaser: user.email, amount: total});
            return {
            productsBought,
            ticket
            };
        }
        } 
        catch (error) {
            return error;
        }
    }
}