const fs = require('fs')
const filename = 'callback.js'

fs.readFile(filename, (err, fileData) => {
	if(err) return console.error(err);

	console.log(`${filename}: ${fileData.length}`);
})