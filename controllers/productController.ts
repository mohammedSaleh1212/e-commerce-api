import { Category } from "../models/category"
import { Product, validateProduct } from "../models/product"
import { Request, Response } from 'express'


const getAllProducts = async (req: Request, res: Response) => {
    const products = await Product.find().sort('title')
    if (products.length === 0) {
        return res.status(404).send('no products')
    }
    return res.send(products)
}
const postProduct = async (req: Request, res: Response) => {
    const { error } = validateProduct(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const category = await Category.findById(req.body.categoryId)
    if (!category) return res.status(400).send('no such category')
    const product = new Product({
        title: req.body.title,
        description: req.body.description,
        category: {
            _id: category._id,
            name: category.name
        },
        numberInStock:req.body.numberInStock


    })
   await product.save()
    res.send(product)
}
const updateProduct = async (req: Request, res: Response) => {
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const category = await Category.findById(req.body.categoryId);
    if (!category) return res.status(400).send('No such category');

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            description: req.body.description,
            category: {
                _id: category._id,
                name: category.name
            },
            numberInStock:req.body.numberInStock

        },
        { new: true, runValidators: true }
    );

    if (!product) return res.status(404).send('Product not found');

    res.send(product);
};

const deleteProduct = async (req: Request, res: Response) => {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
        return res.status(404).send('no product with the given id')
    }
    return res.send(product)
}
const getSingleProduct = async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        return res.status(404).send('no product with the given id')
    }
    return res.send(product)
}
const getProductsByCategory = async(req:Request,res:Response) => {
    const categoryId = req.params.id
    console.log(categoryId)
    const products = await Product.find({'category._id':categoryId})
    if (products.length === 0) {
        return res.status(404).send('no products with the given category id')
    }
    return res.send(products)

}

export { getAllProducts, postProduct, updateProduct, deleteProduct, getSingleProduct,getProductsByCategory }