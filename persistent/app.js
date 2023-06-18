const express = require('express');
const middleware = require('./middleware/middleware')
const api = require('./api');

const port = process.env.PORT || 1337;

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(middleware.cors)

// ** PRODUCTS
app.get('/products', api.listProducts)
app.get('/products/:id', api.getProduct)
app.post('/products', api.createProduct)
app.put('/products/:id', api.editProduct)
app.delete('/products/:id', api.deleteProduct)

// ** ORDERS
app.get('/orders', api.listOrders)
app.post('/orders', api.createOrder)


app.use(middleware.handleError)
app.use(middleware.notFound)
app.listen(port, () => console.log(`Server listening on port: http://localhost:${port}`))
