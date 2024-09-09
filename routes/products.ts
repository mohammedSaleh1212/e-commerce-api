import { Router } from 'express'
import { deleteProduct, getAllProducts, getProductsByCategory, getSingleProduct, postProduct, updateProduct } from '../controllers/productController'
const router = Router()

router.get('/', getAllProducts)
router.get('/category/:id', getProductsByCategory)
router.post('/', postProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)
router.get('/:id', getSingleProduct)

export default router