const readline = require('readline')
const http = require('http')
const querystring = require('querystring')
const { EventEmitter } = require('stream')
const rl = readline.createInterface({input: process.stdin})

function createEventSource(url) {
	const source = new EventEmitter();

	http.get(url, (res) => {
		res.on('data', (data) => {
			const message = data.toString().replace(/^data: /, '').replace(/\n\n$/, '');
			source.emit('message', message);
			
			const eventType = message.match(/\?$/) ? 'question' : 'statement';		
			source.emit(eventType, message)
		})
	})

	return source;
}

const source = createEventSource('http://localhost:1337/sse');
source.on('message', console.log)

rl.on('line', line => {
	http.get(`http://localhost:1337/chat?${querystring.stringify({message: line})}`)
})

http.get('http://localhost:1337/sse', res => {
	res.on('data', data => console.log(data.toString()))
})
