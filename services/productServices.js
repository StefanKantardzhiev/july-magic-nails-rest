const Product = require("../models/Product")

require('dotenv').config()

async function addProduct(product, id) {
    try {
        product.ownerId = id;
        
        return await Product.create({ ...product })
    } catch (error) {
        throw new Error(error)
    }
}
async function getAllProducts() {

    return await Product.find({})

    
} 
   

async function getProductById(id) {
    return await Product.findById(id);
}

async function updateProduct(id, product) {
    const existing = await Product.findById(id);

    existing.title = product.title;
    existing.brand = product.brand;
    existing.category = product.category;
    existing.weigth = product.weigth;
    existing.price = product.price;
    existing.imageUrl = product.imageUrl;

    return existing.save();
}

async function deleteProduct(id) {
    await Product.findByIdAndDelete(id)
}

async function getMostRated() {
    const Products = await Product.find({}).sort({ created_at: -1 }).limit(3);
    return Products
}

async function getByOwner(id) {
    return await Product.find({ _ownerId: id })
}
// Comment requests handle

async function addComment(productId, comment) {
    try {
        const product = await Product.findById(productId);
        
        let commentsArray = product.comments;

        commentsArray.push(comment);

        const updatedProduct = await Product.findByIdAndUpdate(
                productId,
             { comments: commentsArray },
             { new: true });
             
        return updatedProduct;
    } catch (error) {
        throw new Error(error);
    }
}


async function getProductComments(productId) {
        return await Product.findById(productId).select('comments')
}


module.exports = {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getMostRated,
    getByOwner,
    addComment,
    getProductComments
}