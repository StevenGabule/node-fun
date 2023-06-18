const autoCatch = require('./lib/auto-catch');
const Products = require('./product_lists');
const { Orders, listOrders: userOrders } = require('./schemas/orders.schema');

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

async function createProduct(req, res) {
	const product = await Products.create(req.body)
	res.json(product);
}

async function editProduct(req, res, next) {
	const change = req.body;
	const product = await Products.edit(req.params.id, change)
	res.json(product);
}

async function deleteProduct(req, res, next) {
	await Products.remove(req.params.id)
	res.json({ success: true });
}

async function createOrder(req, res, next) {
	const order = await Orders.create(req.body)
	res.json(order)
}

async function listOrders(req, res, next) {
	const { offset = 0, limit = 25, productId, status } = req.query;

	const orders = await userOrders({
		offset: Number(offset),
		limit: Number(limit),
		productId,
		status
	});
	
	res.json(orders)
}

module.exports = autoCatch({ listProducts, getProduct, createProduct, editProduct, deleteProduct, createOrder, listOrders })
