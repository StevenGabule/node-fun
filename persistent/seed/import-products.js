const db = require('../config/db');
const products = require('../data/products.json');
const { Product } = require('../schemas/product.schema');

(async function() {
	for(let i = 0; i < products.length; i++) {
		console.log(await Product.create(products[i]));
	}
	db.disconnect();
})();