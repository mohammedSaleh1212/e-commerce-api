import { Category, validateCategory } from "../models/category"
import { Request, Response } from 'express'


const getAllCategories = async (req: Request, res: Response) => {
    const categories = await Category.find().sort('name')
    if (!categories) {
        return res.status(404).send('no categories')
    }
    return res.send(categories)
}
const postCategory = async (req: Request, res: Response) => {
    const { error } = validateCategory(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    let category = new Category(req.body)
    category = await category.save()

    res.send(category)
}
const updateCategory = async (req: Request, res: Response) => { 
    const { error } = validateCategory(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const category = await Category.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
    if (!category) {

        return res.status(404).send('no such category')
    }
    res.send(category)
}
const deleteCategory = async (req: Request, res: Response) => {
    const category = await Category.findByIdAndDelete(req.params.id)
    if (!category) {
        return res.status(404).send('no category with the given id')
    }
    return res.send(category);
}
const getSingleCategory = async(req: Request, res: Response) => {
    const category = await Category.findById(req.params.id)
    if (!category) {
        return res.status(404).send('no category with the given id')
    }
    return res.send(category);
}

export { getAllCategories, postCategory ,updateCategory,deleteCategory,getSingleCategory }