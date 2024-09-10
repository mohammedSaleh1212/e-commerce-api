

const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)

import mongoose, { Schema } from 'mongoose'
import { OrderDTO } from '../dtos/OrderDTO'
import { Document } from 'mongoose'
interface Item {
    _id: mongoose.Schema.Types.ObjectId,
    title: string,
    quantity: number,
    price: number
}
interface IOrder extends Document {
    _id: mongoose.Schema.Types.ObjectId,
    createdAt: Date,
    totalAmount: number,
    dateReturned?: Date,
    deliveryFee: number,
    orderStatus: string,

    shippingDetails: {
        address: String,
        city: String,
        zip: String
    },
    user: {
        _id: mongoose.Schema.Types.ObjectId,
        name: string,
        email: string
    },
    items: Item[]



}

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

    items: [{
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'Product'

        },

        title: {
            type: String,
            trim: true,
            minlenght: 5,
            maxlength: 255
        },
        quantity: Number,
        price: Number,
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
        enum: ['pending', 'confiremd', 'completed', 'delivered'],
        default: 'pending',
        required: true
    },
    shippingDetails: {
        address: String,
        city: String,
        zip: String
    }


})


const Order = mongoose.model<IOrder>('Order', orderSchema) //this gets me a Genre class 


function validateOrder(sale: OrderDTO) {
    const schema = Joi.object({
        // userId:Joi.string().required().min(24),
        userId: Joi.objectId().required(),
        // productId: Joi.string().min(24).required(),
        productIds: Joi.array().items(Joi.objectId().required())


    })

    return schema.validate(sale)

}
export { Order, validateOrder }


