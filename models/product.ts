import createProductDto from '../dtos/createProduct'
import Joi from 'joi'
import mongoose from 'mongoose'
import { categorySchema } from './category'

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim:true,
        minLength: 2,
        maxLength: 30
    },
    description: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 30
    },
    category:{
        type:categorySchema,
        required:true
    },
    numberInStock: {
        type:Number,
        required:true,
        default:0,

    }



})


 const Product = mongoose.model('Product', productSchema) //this gets me a Genre class 


function validateProduct(product:createProductDto) {
    const schema = Joi.object({
        title:Joi.string().min(2).max(30).required(),
        description:Joi.string().min(5).max(50).required(),
        categoryId:Joi.string().min(24).required(),
        numberInStock:Joi.number().min(0).required()

        
    })

    return schema.validate(product)

}
export {Product,validateProduct}


