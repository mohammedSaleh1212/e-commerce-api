// import Joi from 'joi'
// Joi.object = require('joi-objectid')(Joi)

const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)

import mongoose from 'mongoose'
import { CreateReviewDto } from '../dtos/create-review'

const reviewSchema = new mongoose.Schema({
    user: {
        type: new mongoose.Schema({
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
   
        }),
        required: true
    },
    product: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlenght: 5,
                maxlength: 255
            },
        }),
        required: true 
    },
    dateOut: {
        type: Date,
        required: true,
        trim: true,
        default: Date.now
    },
    text:{
        type:String,
        required:true
    }
})


const Review = mongoose.model('Review', reviewSchema) //this gets me a Genre class 


function validateReview(review: CreateReviewDto) {
    const schema = Joi.object({
        // userId:Joi.string().required().min(24),
        userId:Joi.objectId().required(),
        // productId: Joi.string().min(24).required(),
        productId: Joi.objectId().required(),
        text:Joi.string().required()


    })

    return schema.validate(review)

}
export { Review, validateReview }


