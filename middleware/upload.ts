// import multer from 'multer';

// // Configure storage
// const storage = multer.memoryStorage(); // or use diskStorage for saving files to disk

// // Create the multer instance
// const upload = multer({ storage: storage });

// export default upload; 






import multer,{ FileFilterCallback } from 'multer';
import { Request } from 'express';
import { GridFsStorage } from 'multer-gridfs-storage';

const storage = new GridFsStorage({
  url: 'your_mongodb_connection_string',
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req:Request, file:Express.Multer.File) => {
    return {
      bucketName: 'images',
      filename: `${Date.now()}-${file.originalname}`,
    };
  },
});

const upload = multer({ storage });

export default upload;
