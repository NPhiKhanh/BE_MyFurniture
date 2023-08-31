const Product = require('../models/Product')

const createdProduct = async (req, res) => {
    const newProduct = new Product(req.body)
    try {
        await newProduct.save()
        res.status(200).json("Created successfully")
    } catch (error) {
        res.status(500).json("failed to created product")
    }
}

const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json("failed to get product")
    }
}
const getAllProduct = async (req, res) => {
    try {
        const allProduct = await Product.find().sort({ createdAt: -1 })
        res.status(200).json(allProduct)
    } catch (error) {
        res.status(500).json("failed to get product")
    }
}
const getAllProductByCategory = async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.categoryName }).sort({ createdAt: -1 })
        res.status(200).json(products)
    } catch (error) {
        console.log(error);
        res.status(500).json("failed to get product")
    }
}

const searchProduct = async (req, res) => {
    try {
        const result = await Product.aggregate(
            [
                {
                    $search: {
                        index: "furniture",
                        text: {
                            query: req.params.key,
                            path: {
                                wildcard: "*"
                            }
                        }
                    }
                }
            ]
        )
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json("failed to get product")
    }
}
module.exports = { createdProduct, getProduct, getAllProduct, getAllProductByCategory, searchProduct }