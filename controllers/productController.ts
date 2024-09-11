import { ProductDTO } from "../dtos/productDTO"
import { Category } from "../models/category"
import { Product, validateProduct } from "../models/product"
import { Request, Response } from 'express'
import fs from 'fs';
import path from 'path';


const getAllProducts = async (req: Request, res: Response) => {
    const products = await Product.find().sort('title')
    if (products.length === 0) {
        return res.status(404).send('no products')
    }
    return res.send(products)
}
const postProduct = async (req: Request, res: Response) => { 
    console.log(req.file)
    if(!req.file) {
        return res.status(404).send('product has to have an image')
    }

    const { originalname, mimetype, path: filePath } = req.file;
    req.body.image = {
      filename: originalname,
      contentType: mimetype,
      path: filePath
    };
    
    const {categoryId,description,title,numberInStock} = req.body
    const { error } = validateProduct(req.body)
    if (error) return res.status(400).send(error.details[0].message)

        const category = await Category.findById(categoryId)
    if (!category) return res.status(400).send('no such category')
    const product = new Product({
        title: title,
        description: description,
        category: {
            _id: category._id,
            name: category.name
        },
        numberInStock:numberInStock,
    
        image: {
            filename: originalname,
            contentType: mimetype,
            path: filePath
          }

    })
   await product.save()
    res.status(201).json({ message: 'Product created successfully', product });
}
// const updateProduct = async (req: Request, res: Response) => {
//     console.log(req.file)
//     if(!req.file) {
//         return res.status(404).send('product has to have an image')
//     }
//     const { originalname, mimetype, buffer } = req.file
//     req.body.image = {
//         filename: originalname,
//         contentType: mimetype,
//         imageBase64: buffer.toString('base64')
//     }
//     const { error } = validateProduct(req.body)
//     if (error) return res.status(400).send(error.details[0].message);

//     const {categoryId,description,title,numberInStock} = req.body


//     const category = await Category.findById(categoryId);
//     if (!category) return res.status(400).send('No such category');
 


//     const product = await Product.findByIdAndUpdate(
//         req.params.id,
//         {
//             title: title,
//             description: description,
//             category: {
//                 _id: category._id,
//                 name: category.name
//             },
//             numberInStock:numberInStock,
//             image: {
//                 filename: originalname,
//                 contentType: mimetype,
//                 imageBase64: buffer.toString('base64'),
//               },

//         },
//         { new: true, runValidators: true }
//     );

//     if (!product) return res.status(404).send('Product not found');

//     res.send(product);
// };


const updateProduct = async (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(404).send('Product has to have an image');
    }

    const { originalname, mimetype, path: filePath } = req.file;
    req.body.image = {
        filename: originalname,
        contentType: mimetype,
        path: filePath
    };

    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { categoryId, description, title, numberInStock } = req.body;

    const category = await Category.findById(categoryId);
    if (!category) return res.status(400).send('No such category');

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send('Product not found');

    // Delete the old image file from the server
    const oldImagePath = path.join(__dirname, '..', product.image.path);
    fs.unlink(oldImagePath, (err) => {
        if (err) {
            console.error('Error deleting the old image file:', err);
            return res.status(500).send('Error deleting the old image file');
        }
    });

    // Update the product with the new image and other details
    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
            title: title,
            description: description,
            category: {
                _id: category._id,
                name: category.name
            },
            numberInStock: numberInStock,
            image: {
                filename: originalname,
                contentType: mimetype,
                path: filePath
            }
        },
        { new: true, runValidators: true }
    );

    if (!updatedProduct) return res.status(404).send('Product not found');

    res.send(updatedProduct);
};


const deleteProduct = async (req: Request, res: Response) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).send('Product not found');
      }
  
      // Delete the image file from the server
      const imagePath = path.join(__dirname, '..', product.image.path);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Error deleting the image file:', err);
          return res.status(500).send('Error deleting the image file');
        }
      });
  
      // Delete the product from the database
      await Product.findByIdAndDelete(req.params.id);
  
      res.status(200).send('Product and image deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).send('Error deleting product');
    }
  };
const getSingleProduct = async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        return res.status(404).send('no product with the given id')
    }
    return res.send(product)
}
const getProductsByCategory = async(req:Request,res:Response) => {
    const categoryId = req.params.id
    console.log(categoryId)
    const products = await Product.find({'category._id':categoryId})
    if (products.length === 0) {
        return res.status(404).send('no products with the given category id')
    }
    return res.send(products)

}

export { getAllProducts, postProduct,deleteProduct, updateProduct, getSingleProduct,getProductsByCategory }