import { getAllOrders, postOrder } from '../controllers/orderController'
import { Router } from 'express'
const router = Router()

router.get('/', getAllOrders)
router.post('/', postOrder)

export default router