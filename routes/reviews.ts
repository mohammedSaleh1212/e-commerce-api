import { deleteReview, getReviewsOfSingleProduct, postReview, updateReview } from '../controllers/reviewController'
import { Router } from 'express'
const router = Router()

router.get('/:id', getReviewsOfSingleProduct)
router.post('/', postReview)
router.put('/:id', updateReview)
router.delete('/:id', deleteReview)
// router.get('/:id', getSingleSale)

export default router