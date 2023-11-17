const fs = require('fs');
const directoryPath = './async';

fs.readdir(directoryPath, (err, fileList) => {
	if (err) return console.error(err);
	fileList.map(fl => console.log(fl, fl.length))
})