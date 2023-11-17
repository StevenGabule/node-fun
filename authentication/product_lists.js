const fs = require('fs').promises
const path = require('path');
const { Product } = require('./schemas/product.schema');

const productsFile = path.join(__dirname, 'data/products.json');

async function list(opts = {}) {
	const { offset = 0, limit = 25, tag } = opts;
	const query = tag ? { tags: tag } : {}
	return await Product.find(query).sort({ _id: 1 }).skip(offset).limit(limit);
}

async function get(_id) {
	return await Product.findById(_id);
}

async function create(fields) {
	return await new Product(fields).save();
}

async function edit(_id, change) {
	const product = await get(_id);
	Object.keys(change).forEach(function (key) {
		product[key] = change[key]
	})
	return await product.save();
}

async function remove(_id) {
	await Product.deleteOne({ _id })
}

module.exports = { list, get, create, edit, remove }