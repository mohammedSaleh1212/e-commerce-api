// import Joi from 'joi'
// Joi.object = require('joi-objectid')(Joi)

const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)

import mongoose from 'mongoose'
import { CreateSale } from '../dtos/create-sale'
import { CreateOrder } from '../dtos/createOrder'

const orderSchema = new mongoose.Schema({
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

    items:[ {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlenght: 5,
                maxlength: 255
            },
            quantity:Number,
            price:Number,
        }),
        // required: true
    }],
    createdAt: {
        type: Date,
        required: true,
        trim: true,
        default: Date.now
    },
    totalAmount: {
        type: Number,
        required: true
    },
    
    dateReturned: {//in case in the future we want to add that the customer cna return something
        type: Date,

    },
    deliveryFee: {
        type: Number,
        min: 0,
        required: true,
        default: 0
    },
    orderStatus: {
        type: String,
        enum: ['pending','confiremd', 'completed','delivered'],
        default: 'pending',
        required: true
    },
    shippingDetails: {
        address:String,
        city: String,
        zip: String
      }


})


const Order = mongoose.model('Order', orderSchema) //this gets me a Genre class 


function validateOrder(sale: CreateOrder) {
    const schema = Joi.object({
        // userId:Joi.string().required().min(24),
        userId: Joi.objectId().required(),
        // productId: Joi.string().min(24).required(),
        productIds: Joi.array().items(Joi.objectId().required())


    })

    return schema.validate(sale)

}
export { Order, validateOrder }


