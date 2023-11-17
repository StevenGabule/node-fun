const express = require('express');
const cookieParser = require('cookie-parser');
const pinoLogger = require('express-pino-logger')

const middleware = require('./middleware/middleware');
const api = require('./api');
const auth = require('./auth');
const port = process.env.PORT || 1337;
const app = express();

app.disable('x-powered-by')
app.use(pinoLogger())
app.use(middleware.logger)
app.use(middleware.cors)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.get('/health', api.checkHealth)

// ** AUTHENTICATION
app.post('/login', auth.authenticate, auth.login)

// ** PRODUCTS
app.get('/products', api.listProducts)
app.get('/products/:id', api.getProduct)
app.post('/products', auth.ensureUser, api.createProduct)
app.put('/products/:id', auth.ensureUser, api.editProduct)
app.delete('/products/:id', auth.ensureUser, api.deleteProduct)

// ** ORDERS
app.get('/orders', auth.ensureUser, api.listOrders)
app.post('/orders', auth.ensureUser, api.createOrder)

// ** USERS
app.post('/users', api.createUser)

app.use(middleware.handleValidationError)
app.use(middleware.handleError)
app.use(middleware.notFound)

app.listen(port, () => console.log(`Server listening on port: http://localhost:${port}`))