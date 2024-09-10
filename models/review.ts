

const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)

import mongoose, { Document } from 'mongoose'
import { reviewDTO } from '../dtos/reviewDTO'
interface IReview extends Document {
    _id: mongoose.Schema.Types.ObjectId
    text: string
    dateOut: Date
    user:{
        _id:mongoose.Schema.Types.ObjectId
        name:string
        email:string
    }
    product:{
        _id:mongoose.Schema.Types.ObjectId
        title:string
    }

}

const reviewSchema = new mongoose.Schema({
    user: {

            name: {
                type: String,
                required: true,
                minlenght: 3,
                maxlength: 50
            },
            email: {
                type: String,
                required: true,
            },

        // required: true causes error
    },
    product: {
   
            title: {
                type: String,
                required: true,
                trim: true,
                minlenght: 5,
                maxlength: 255
            },
  
        // required: true cases error
    },
    dateOut: {
        type: Date,
        required: true,
        trim: true,
        default: Date.now
    },
    text: {
        type: String,
        required: true
    }
})


const Review = mongoose.model<IReview>('Review', reviewSchema) //this gets me a Genre class 


function validateReview(review: reviewDTO) {
    const schema = Joi.object({
        // userId:Joi.string().required().min(24),
        userId: Joi.objectId().required(),
        // productId: Joi.string().min(24).required(),
        productId: Joi.objectId().required(),
        text: Joi.string().required()


    })

    return schema.validate(review)

}
export { Review, validateReview }


