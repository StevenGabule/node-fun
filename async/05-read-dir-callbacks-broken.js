const fs = require('fs')
const path = require('path')

function mapAsync(arr, fn, onFinish) {
	let prevError;
	let nRemaining = arr.length;
	const results = []

	arr.forEach(function (item, i) {
		fn(item, function (err, data) {
			if (prevError) return;

			if (err) {
				prevError = err;
				return onFinish(err)
			}

			results[i] = data;
			nRemaining--;
			if (!nRemaining) onFinish(null, results)
		})
	})
}

function mapSync(arr, fn) {
	const results = []
	arr.forEach(function (item, i) {
		const data = fn(item)
		results[i] = data;
	})
	return results;
}

fs.readdir('./', function(err, files) {
	if(err) return console.error(err);

	mapAsync(files, fs.readFile, (err, results) => {
		if(err) return console.error(err);

		results.forEach((data,i) => console.log(`${files[i]}: ${data.length}`))
		console.log('done!');
	})
})

// mapAsync(['./server.js', './callback.js'], fs.readFile, (err, filesData) => {
// 	if(err) return console.error(err)
// 	console.log(filesData.length);
// })

// fs.readdir('./', (err, files) => {
// 	if (err) return console.error(err)

// 	files.forEach(function (file) {
// 		fs.readFile(file, (err, fileData) => {
// 			if (err) return console.error(err);

// 			console.log(`${file}: ${fileData.length}`);
// 		})
// 	})
// 	console.log(`Done!`);
// })

function readFile(file, cb) {
	fs.readFile(file, function(err, fileData) {
		if(err) {
			if(err.code === 'EISDIR') return cb(null, [file, 0])
			return cb(err)
		}
		cb(null, [file, fileData.length])
	})
}


function getFileLengths(dir, cb) {
	fs.readdir(dir, function(err, files) {
		if(err) return cb(err)

		const filePaths = files.map(file => path.join(dir, file))

		mapAsync(filePaths, readFile, cb)
	})
}

const targetDirectory = process.argv[2] || './';

getFileLengths(targetDirectory, function(err, results) {
	if(err) return console.error(err);

	results.forEach(([file, length]) => console.log(`${file}: ${length}`))
	
	console.log('Done');
})