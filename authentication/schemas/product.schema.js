const cuid = require('cuid');
const db = require('../config/db');
const {isURL} = require('validator')

function urlSchema(opts={}) {
	const {required} = opts;
	return {
		type: String,
		required: !!required,
		validate: {
			validator: isURL,
			message: props => `${props.value} is not a valid URL`
		}
	}
}

const Product = db.model('Product', {
	_id: { type: String, default: cuid },
	description: {type: String},
	imgThumb: urlSchema({ required: true }),
	img: urlSchema({ required: true }),
	link: urlSchema(),
	userId: { type: String, required: true },
	userName: { type: String, required: true},
	userLink: urlSchema(),
	tags: { type: [String], index: true },
})

async function getOrder(_id) {
	const product = await Product.findById(_id)
	return product;
}

module.exports = { Product, getOrder }