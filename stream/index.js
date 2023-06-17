const fs = require('fs')
const https = require('https')
const {Transform} = require('stream')

// const fileUrl = 'https://www.newline.co/fullstack-react/assets/images/fullstack-react-hero-book.png'
// const fileUrl1 = 'https://www.onlinejobs.ph/images/oj-logo-icon.png'

// https.get(fileUrl1, res => {
	// const chunks = []

	// ** method 2
	// const fileStream = fs.createWriteStream('book.png')

	// res.on('data', data => fileStream.write(data)).on('end', () => {
	// 	fileStream.end();

	// 	console.log('File saved!');
	// })

	// ** method 3
// 	res.pipe(fs.createWriteStream('book.png'))
// 	.on('finish', () => console.log('file saved!'))
// })

// const writeStream = fs.createWriteStream('time.log')
// setInterval(() => writeStream.write(`The time is now: ${new Date()}\n`), 1000)

function shout() {
	return new Transform({
		transform(chunk, encoding, callback) {
			callback(null, chunk.toString().toUpperCase())
		}
	})
}

fs.createReadStream('index.js').pipe(shout()).pipe(fs.createWriteStream('loud-code.txt'))