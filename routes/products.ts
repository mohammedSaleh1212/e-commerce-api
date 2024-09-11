import multer from 'multer'
import { Router } from 'express'
import {  getAllProducts,deleteProduct, getProductsByCategory, getSingleProduct, postProduct, updateProduct } from '../controllers/productController'
const router = Router()
// const storage = multer.memoryStorage();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images/'); // Directory to save the uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
  })

const upload = multer({ storage });

router.get('/', getAllProducts)
router.get('/category/:id', getProductsByCategory)
router.post('/', upload.single('image'),postProduct)
router.put('/:id',upload.single('image'), updateProduct)
router.delete('/:id', deleteProduct)
router.get('/:id', getSingleProduct)

export default router