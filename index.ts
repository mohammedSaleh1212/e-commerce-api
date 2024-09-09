
import cors from 'cors'
import mongoose from 'mongoose'
import express from 'express'
import categoriesRouter from './routes/categories'
import productsRouter from './routes/products'
import salesRouter from './routes/sales'
import reviewsRouter from './routes/reviews'
import ordersRouter from './routes/orders'
import logger from './middleware/logger'
const app = express()

mongoose.connect('mongodb://localhost/e-commerce')
    .then(() => console.log('connected to the database'))
    .catch(error => console.log(error.message))

app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Expose-Headers', 'x-auth-token');
    next();
});

app.use(express.json())//to make express parse the body because it doesnt by default
app.use(logger)
app.use('/api/categories', categoriesRouter)
app.use('/api/products', productsRouter)
app.use('/api/sales', salesRouter)
app.use('/api/reviews', reviewsRouter)
app.use('/api/orders', ordersRouter)

app.listen(5000, () => console.log('server started'))