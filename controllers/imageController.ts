// import { Request, Response } from 'express';
// import fs from 'fs';
// import path from 'path';

// export const uploadImage = (req: Request, res: Response) => {
//   if (!req.file) {
//     return res.status(400).send('No file uploaded.');
//   }
//   res.status(200).send({ message: 'Image uploaded successfully', filePath: req.file.path });
// };

// export const getImages = (req: Request, res: Response) => {
//   fs.readdir('uploads', (err, files) => {
//     if (err) {
//       return res.status(500).send('Unable to scan directory: ' + err);
//     }
//     const imagePaths = files.map(file => path.join('/uploads', file));
//     res.status(200).send(imagePaths);
//   });
// };
import { Request, Response } from 'express';
import Image from '../models/image';

export const uploadImage = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const newImage = new Image({
    filename: req.file.filename,
    contentType: req.file.mimetype,
    imageBase64: req.file.buffer.toString('base64'),
  });

  await newImage.save();
  res.status(201).send('Image uploaded successfully.');
};

export const getImage = async (req: Request, res: Response) => {
  try {
    const image = await Image.findOne({ filename: req.params.filename });
    if (!image) {
      return res.status(404).send('Image not found.');
    }

    res.contentType(image.contentType);
    res.send(Buffer.from(image.imageBase64, 'base64'));
  } catch (err) {
    res.status(500).send('Server error.');
  }
};


