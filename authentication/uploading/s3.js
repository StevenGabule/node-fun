const fs = require('fs')
const AWS = require('aws-sdk')
const { promisify } = require('util')
const { Product } = require('../schemas/product.schema')

const s3 = new AWS.S3()
s3.uploadP = promisify(s3.upload)

const params = {
	Bucket: 'fullstack-printshop',
	Key: 'profile-photos/thedude.jpg',
	Body: fs.createReadStream('thedude.jpg')
}

	(async function () {
		await s3.uploadP(params)
	})();

async function setProductImage(req, res) {
	const productId = req.params.id;
	const ext = { 
		'image/png': 'png', 
		'image/jpeg': 'jpg' 
	}[req.headers['content-type']]

	if (!ext) throw new Error('Invalid Image Type')

	const params = {
		Bucket: 'fullstack-printshop',
		Key: `product-images/${productId}.${ext}`,
		Body: req, // req is a stream, similar to fs.createReadStream()
		ACL: 'public-read'
	}

	const object = await s3.uploadP(params) // our custom promise version
	const change = { img: object.Location }
	const product = await Product.edit(productId, change)
	res.json(product)
}
