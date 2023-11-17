'use strict';

const fs = require('fs')
fs.readFile('target.txt', (err, data) => {
	if (err) throw err;
	console.log(data.toString());
})

fs.writeFile('target.txt', 'hello world part 2', (err) => {
	if (err) throw err;
	console.log('File saved.');
})