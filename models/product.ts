import { ProductDTO } from '../dtos/productDTO' 
import Joi from 'joi'
import mongoose, { Schema } from 'mongoose'
interface IProduct extends Document {
    _id: mongoose.Schema.Types.ObjectId 
    title: string
    description: string
    numberInStock:number
    category: {
        _id: mongoose.Schema.Types.ObjectId; 
        name: string; 
    }
    image: {
        filename: string;
        contentType: string;
        imageBase64: string;
      }
}

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 30
    },
    description: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 30
    },
    category: {
        _id: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
        name: { type: String, required: true },
    },
    numberInStock: {
        type: Number,
        required: true,
        default: 0,

    },
    image: {
        filename: { type: String, required: true },
        contentType: { type: String, required: true },
        imageBase64: { type: String, required: true },
    },




})


const Product = mongoose.model<IProduct>('Product', productSchema) //this gets me a Genre class 


function validateProduct(product: ProductDTO) {
    const schema = Joi.object({
        title: Joi.string().trim().min(2).max(30).required(),
        description: Joi.string().min(5).max(50).required(),
        categoryId: Joi.string().min(24).required(),
        numberInStock: Joi.number().min(0).required(),
        image: Joi.object({
            filename: Joi.string().required(),
            contentType: Joi.string().required(),
            imageBase64: Joi.string().required(),
        }).required(),
 

    })

    return schema.validate(product)

}
export { Product, validateProduct }


