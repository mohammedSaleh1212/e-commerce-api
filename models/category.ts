import CreateCategoryDto from '../dtos/categoryDTO'
import Joi from 'joi'
import mongoose from 'mongoose'
export interface ICategory extends mongoose.Document {
    _id: mongoose.Schema.Types.ObjectId;
    name: string
  }

export const categorySchema:mongoose.Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 30 
    }

})


const Category = mongoose.model<ICategory>('Category', categorySchema) //this gets me a Genre class 


function validateCategory(category:CreateCategoryDto) {
    const schema = Joi.object({
        name:Joi.string().min(2).max(30).required()
    })

    return schema.validate(category)

}
export {Category,validateCategory}


