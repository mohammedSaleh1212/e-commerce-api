import { User } from "../models/user"
import { Request, Response } from 'express'
import { Product } from "../models/product"
import { Order, validateOrder } from "../models/order"


const getAllOrders = async (req: Request, res: Response) => {
    const orders = await Order.find().sort('-createdAt')
    if (orders.length === 0) {
        return res.status(404).send('no orders')
    }
    return res.send(orders)
}

const postOrder = async (req: Request, res: Response) => {
    const { error } = validateOrder(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.body.userId);
    if (!user) return res.status(400).send('No such user');

    const productIds = req.body.productIds;
    if (productIds.length === 0) {
        return res.status(400).send('Product IDs should be a non-empty array');
    }

    const products = await Product.find({ _id: { $in: productIds } });
    if (products.length !== productIds.length) {
        return res.status(400).send('One or more products not found');
    }

    const outOfStockProducts = products.filter(product => product.numberInStock === 0);
    if (outOfStockProducts.length > 0) {
        return res.status(400).send('One or more products are out of stock');
    }

    let order = new Order({
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
        },
        items: products.map(product => ({
            _id: product._id,
            title: product.title,
        })),
        totalAmount: {
            type:Number,
            required:true
        },
        orderStatus: 'pending',
        shippingDetails: {
            address: "address",
            city: "Tartus",
            zip: "12345"
        }

    });

    order = await order.save();

    for (const product of products) {
        product.numberInStock--;
        await product.save();
    }

    res.send(order);
};




export { getAllOrders, postOrder }