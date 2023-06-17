const fs = require('fs')
const directoryPath = 'callback.js'

fs.readdir(directoryPath, (err, fileList) => {
	if (err) return console.error(err);

	console.log(fileList);
})