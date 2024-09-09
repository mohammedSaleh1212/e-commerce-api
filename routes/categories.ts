
import { deleteCategory, getAllCategories, getSingleCategory, postCategory, updateCategory } from '../controllers/categoryController'
import { Router } from 'express'
const router = Router()

router.get('/', getAllCategories)
router.post('/', postCategory)
router.put('/:id', updateCategory)
router.delete('/:id', deleteCategory)
router.get('/:id', getSingleCategory)

export default router