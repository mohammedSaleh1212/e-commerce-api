import jwt from 'jsonwebtoken'
import Joi from 'joi'
import mongoose from 'mongoose'


export const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 50
   },
   email: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 255,
      unique: true
   },
   password: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 1024
   },
   isAdmin: Boolean,
   isMainAdmin: Boolean

})

const User = mongoose.model('User', userSchema)
function validateUser(user: any) {
   const schema = Joi.object({
      name: Joi.string().min(3).required(),
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required(),

   })
   return schema.validate(user)

}

export { User, validateUser }
