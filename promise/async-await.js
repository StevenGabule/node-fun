const fs = require('fs').promises
const path = require('path')

async function printLength(file) {
	try {
		const data = await fs.readFile(file)
		console.log(`${file}: ${data.length}`);
	} catch (err) {
		console.error(err);
	}
}

// printLength('async-await.js')

async function printLengthDir(dir) {
	const fileList = await fs.readdir(dir)

	const results = await Promise.all(
		fileList.map((file) => fs.readFile(file).then(data => [file, data.length]))
	)

	results.forEach((result) => console.log(`${result[0]}: ${result[1]}`))
	
	console.log('Done!');
}

// printLengthDir('./')

async function readFile(filePath) {
	try {
		const data = await fs.readFile(filePath)
		return [filePath, data.length]
	} catch (err) {
		if(err.code === 'EISDIR') return [filePath, 0]
		throw err;
	}
}

async function getFileLengths(dir) {
	const fileList = await fs.readdir(dir)
	
	const readFiles = fileList.map(async (file) => {
		const filePath = path.join(dir, file);
		return await readFile(filePath)
	})

	return await Promise.all(readFiles);
}

async function printLengthCmd(dir) {
	try {
		const results = await getFileLengths(dir)
		results.forEach(([file, length]) => console.log(`${file}: ${length}`))
		console.log('Done!');
	} catch (err) {
		console.error(err);
	}
}

const targetDirectory = process.argv[2] || './';
printLengthCmd(targetDirectory)