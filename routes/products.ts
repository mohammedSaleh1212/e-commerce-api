import multer from 'multer'
import { Router } from 'express'
import { deleteProduct, getAllProducts, getProductsByCategory, getSingleProduct, postProduct, updateProduct } from '../controllers/productController'
const router = Router()
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', getAllProducts)
router.get('/category/:id', getProductsByCategory)
router.post('/', upload.single('image'),postProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)
router.get('/:id', getSingleProduct)

export default router