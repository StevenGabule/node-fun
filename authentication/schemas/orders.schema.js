const cuid = require('cuid')
const { isEmail } = require('validator')

const db = require('../config/db');
const { getOrder } = require('./product.schema');

function emailSchema(opts = {}) {
	const { required } = opts;
	return {
		type: String,
		required: !!required,
		validate: {
			validator: isEmail,
			message: props => `${props.value} is not valid email address`
		}
	}
}

const Orders = db.model('Order', {
	_id: { type: String, default: cuid },
	buyerEmail: emailSchema({ required: true }),
	products: [
		{
			type: String,
			ref: 'Product',
			index: true,
			required: true
		}
	],
	status: {
		type: String,
		index: true,
		default: 'CREATED',
		enum: ['CREATED', 'PENDING', 'COMPLETED']
	}
});

async function get(_id) {
	const order = await Orders.findById(_id).populate('products').exec()
	return order;
}

async function create(fields) {
	const order = await new Orders(fields).save();
	await order.populate('products').execPopulate();
	return order;
}

async function populate(order) {
	const products = await Promise.all(
		order.products.map(async function (productId) {
			const product = await getOrder(productId)
			return product;
		})
	)
	return { ...order._doc, ...{ products } }
}

async function listOrders(opts = {}) {
	const { offset = 0, limit = 25, productId, status } = opts;
	const query = {}
	if (productId) query.products = productId;
	if (status) query.status = status;

	const orders = await Orders.find(query).sort({ _id: 1 }).skip(offset).limit(limit).exec();
	const withProducts = await Promise.all(orders.map(populate))
	return withProducts;
}

module.exports = { Orders, get, create, listOrders }