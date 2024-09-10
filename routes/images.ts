// import { Router } from 'express';
// import { uploadImage, getImages } from '../controllers/imageController';
// import multer from 'multer';

// const router = Router();
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });
// const upload = multer({ storage });

// router.post('/', upload.single('image'), uploadImage);
// router.get('/', getImages);

// export default router;
import { Router } from 'express';
import multer from 'multer';
import { uploadImage, getImage } from '../controllers/imageController';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('image'), uploadImage);
router.get('/images/:filename', getImage);

export default router;

