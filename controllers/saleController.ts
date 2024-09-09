import { User } from "../models/user"
import { Sale, validateSale } from "../models/sale"
import { Request, Response } from 'express'
import { Product } from "../models/product"
import mongoose from 'mongoose'


const getAllsales = async (req: Request, res: Response) => {
    const sales = await Sale.find().sort('-dateOut')
    if (sales.length === 0) {
        return res.status(404).send('no sales operations')
    }
    return res.send(sales)
}
const postSale = async (req: Request, res: Response) => {
    const { error } = validateSale(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const user = await User.findById(req.body.userId)
    if (!user) return res.status(400).send('no such user')
    const product = await Product.findById(req.body.productId)
    if (!product) return res.status(400).send('no such user')
        if(product.numberInStock === 0) return res.status(400).send("product is not in the stock")

    let sale = new Sale({
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
        },
        product: {
            _id: product._id,
            title: product.title,

        },



    })
    //here we need two phase transactions 
    sale = await sale.save()
    product.numberInStock--
    await product.save() 

        res.send(sale)
    }

// const postSale = async (req: Request, res: Response) => {
//     const { error } = validateSale(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     const session = await mongoose.startSession();
//     session.startTransaction();

//     try {
//         console.log('Starting transaction');

//         const user = await User.findById(req.body.userId).session(session);
//         if (!user) {
//             console.log('User not found');
//             await session.abortTransaction();
//             session.endSession();
//             return res.status(400).send('No such user');
//         }

//         const product = await Product.findById(req.body.productId).session(session);
//         if (!product) {
//             console.log('Product not found');
//             await session.abortTransaction();
//             session.endSession();
//             return res.status(400).send('No such product');
//         }

//         if (product.numberInStock === 0) {
//             console.log('Product out of stock');
//             await session.abortTransaction();
//             session.endSession();
//             return res.status(400).send('Product is not in stock');
//         }

//         let sale = new Sale({
//             user: {
//                 _id: user._id,
//                 name: user.name,
//                 email: user.email,
//             },
//             product: {
//                 _id: product._id,
//                 title: product.title,
//             },
//         });

//         sale = await sale.save({ session });
//         console.log('Sale saved:', sale);

//         product.numberInStock--;
//         await product.save({ session });
//         console.log('Product stock updated');

//         await session.commitTransaction();
//         session.endSession();
//         console.log('Transaction committed');

//         res.send(sale);
//     } catch (ex) {
//         console.error('Transaction failed:', ex);
//         await session.abortTransaction();
//         session.endSession();
//         res.status(500).send('Internal server error');
//     }
// };


    

const updateSale = async (req: Request, res: Response) => {
    const { error } = validateSale(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.body.userId)
    if (!user) return res.status(400).send('no such user')
    const product = await Product.findById(req.body.productId)
    if (!product) return res.status(400).send('no such user')

    const sale = await Sale.findByIdAndUpdate(
        req.params.id,
        {
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
            product: {
                _id: product._id,
                title: product.title,
                
            },
   
        },
        { new: true, runValidators: true }
    );

    if (!sale) return res.status(404).send('Product not found');

    res.send(sale);
};

const deleteSale = async (req: Request, res: Response) => {
    const sale = await Sale.findByIdAndDelete(req.params.id)
    if (!sale) {
        return res.status(404).send('no product with the given id')
    }
    return res.send(sale);
}
const getSingleSale = async (req: Request, res: Response) => {
    const sale = await Product.findById(req.params.id)
    if (!sale) {
        return res.status(404).send('no product with the given id')
    }
    return res.send(sale)
}

export { getAllsales, postSale, updateSale, deleteSale, getSingleSale }