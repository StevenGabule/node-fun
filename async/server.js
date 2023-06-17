let count = 0;
setInterval(() => console.log(`${++count}`), 1000)

// setTimeout(() => {
// 	console.log('hello from the past!');
// 	process.exit();
// }, 5500)

setTimeoutAsync(5500);
console.log('hello from the past!');
process.exit()

function setTimeoutAsync(ms) {
	const t0 = Date.now();
	while(Date.now() - t0 < ms) {}
}