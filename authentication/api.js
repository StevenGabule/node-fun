const autoCatch = require('./lib/auto-catch');
const Products = require('./product_lists');
const User = require('./schemas/user.schema')
const { Orders, listOrders: userOrders } = require('./schemas/orders.schema');
const db = require('./config/checkHealth')

async function listProducts(req, res) {
	const { limit = 25, offset = 0, tag } = req.query;
	res.json(await Products.list({
		offset: Number(offset),
		limit: Number(limit),
		tag
	}))
}

async function getProduct(req, res, next) {
	const { id } = req.params;
	const product = await Products.get(id)
	if (!product) return next();
	res.json(product)
}

async function createOrder(req, res, next) {
	const fields = req.body;
	if(!req.isAdmin) fields.username = req.user.username

	const order = await Orders.create(req.body)
	res.json(order)
}

async function listOrders(req, res, next) {
	const { offset = 0, limit = 25, productId, status } = req.query;

	const opts = { offset: Number(offset), limit: Number(limit), productId, status }

	if(!req.isAdmin) opts.username = req.user.username;

	const orders = await userOrders(opts);

	res.json(orders)
}

async function createUser(req, res, next) {
	const user = await User.create(req.body)
	const { username, email } = user;
	req.log.info({username, email}, 'user created')
	res.json({ username, email })
}

async function createProduct(req, res, next) {
	if (!req.isAdmin) return forbidden(next);

	const product = await Products.create(req.body)
	res.json(product)
}

function forbidden(next) {
	const err = new Error('Forbidden')
	err.statusCode = 403;
	return next(err)
}

async function editProduct(req, res, next) {
	if (!req.isAdmin) return forbidden(next);

	const change = req.body;
	const product = await Products.edit(req.params.id, change)

	res.json(product)
}

async function deleteProduct(req, res, next) {
	if (!req.isAdmin) return forbidden(next);

	await Products.remove(req.params.id)

	res.json({ success: true })
}

async function checkHealth(req, res, next) {
	await db.checkHealth();
	res.json({status: 'Ok!'})
}

module.exports = autoCatch({ 
	listProducts, 
	getProduct, 
	createProduct, 
	editProduct, 
	deleteProduct, 
	createOrder, 
	listOrders, 
	createUser,
	checkHealth
})
