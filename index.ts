import cors from 'cors'
import mongoose from 'mongoose'
import express from 'express'
import categoriesRouter from './routes/categories'
import productsRouter from './routes/products'
import reviewsRouter from './routes/reviews'
import ordersRouter from './routes/orders'
import bodyParser from 'body-parser'
import setupHeader from './middleware/setupHeader'

const app = express()

// mongoose.connect('mongodb+srv://mohammedsaleh1999ms:tcrSV7TgOdCh1Ca3@cluster0.r3ctn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
mongoose.connect('mongodb://localhost/e-commerce')
    .then(() => console.log('connected to the database'))
    .catch(error => console.log(error.message))
app.use(cors());
app.use(setupHeader)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json())//to make express parse the body because it doesnt by default

//routes
app.use('/api/categories', categoriesRouter)
app.use('/api/products', productsRouter)
app.use('/api/reviews', reviewsRouter)
app.use('/api/orders', ordersRouter)


app.listen(5000, () => console.log('server started'))