import ProductManager from "../dao/mongoManagers/ProductManager.js"

const productManager = new ProductManager()

export const getProductsController = async (req, res) => {
    const {limit=10, page=1, sort, ...query} = req.query
    const products = await productManager.getProducts(limit, page, sort, query)
    res.json({products})
}

export const getProductsByIdController = async(req, res)=>{
    const {pid} = req.params
    const productById = await productManager.getProductsById(pid)
    res.json({productById})
}

export const addProductsController = async(req, res)=>{
    const newProd = req.body
    const addProd = await productManager.addProducts(newProd)
    res.json({message:"Producto creado con éxito",addProd})
}

export const updateProductController = async(req, res)=>{
    const upProd = req.body
    const { pid } = req.params
    upProd.id = pid
    const updateProd = await productManager.updateProduct(upProd)
    res.json({message:"Producto actualizado con éxito",updateProd})
}

export const deleteProductController = async(req, res)=>{
    const {pid} = req.params
    const productById = await productManager.getProductsById(parseInt(pid))
    const deleteProd = await productManager.deleteProduct(productById)
    res.json({message:"Producto eliminado con éxito", deleteProd})
}

export const viewProdsController = async (req, res)=>{
    try {                                   
    const {limit=10, page=1, sort, ...query} = req.query
    const products = await productManager.getProducts(limit, page, sort, query)
    res.render("products", {products: products.payload})
    } catch (error) {
        return error
    }
}