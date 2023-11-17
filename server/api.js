const autoCatch = require('./lib/auto-catch');
const Products = require('./product_lists')

async function listProducts(req, res) {
	const { limit = 25, offset = 0, tag } = req.query;
	res.json(await Products.list({ offset: Number(offset), limit: Number(limit), tag }))
}

async function getProduct(req, res, next) {
	const { id } = req.params;
	const product = await Products.get(id)
	if (!product) return next();
	res.json(product)
}

async function createProduct(req, res) {
	console.log(req.body)
	res.json(req.body);
}

async function editProduct(req, res) {
	console.log(req.body)
	res.json(req.body);
}

async function deleteProduct(req, res) {
	console.log(req.body)
	res.json(req.body);
}

module.exports = autoCatch({ listProducts, getProduct, createProduct, editProduct, deleteProduct })
