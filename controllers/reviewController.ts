import { User } from "../models/user"
import { Sale, validateSale } from "../models/sale"
import { Request, Response } from 'express'
import { Product } from "../models/product"
import { Review, validateReview } from "../models/review"


const getReviewsOfSingleProduct = async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id)
    if(!product) return res.status(404).send('no such a product')
        const reviews = await Review.find({'product._id':product._id}).sort('-dateOut')
    if(reviews.length===0) return res.status(404).send('no reviews for this product')

    
    return res.send(reviews)
}
const postReview = async (req: Request, res: Response) => {
    const { error } = validateReview(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const user = await User.findById(req.body.userId)
    if (!user) return res.status(400).send('no such user')
    const product = await Product.findById(req.body.productId)
    if (!product) return res.status(400).send('no such user')

    const review = new Review({
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
        },
        product: {
            _id: product._id,
            title: product.title,

        },
        text:req.body.text
        



    })
    await review.save()

        res.send(review)
    }




    

const updateReview = async (req: Request, res: Response) => {
    const { error } = validateSale(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.body.userId)
    if (!user) return res.status(400).send('no such user')
    const product = await Product.findById(req.body.productId)
    if (!product) return res.status(400).send('no such user')

    const review = await Review.findByIdAndUpdate(
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
            text:req.body.text
            
   
        },
        { new: true, runValidators: true }
    );

    if (!review) return res.status(404).send('review not found');

    res.send(review);
};




const deleteReview = async (req: Request, res: Response) => {
    const review = await Review.findByIdAndDelete(req.params.id)
    if (!review) {
        return res.status(404).send('no product with the given id')
    }
    return res.send(review);
}


export { getReviewsOfSingleProduct,postReview,updateReview ,deleteReview}