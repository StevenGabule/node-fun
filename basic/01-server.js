const http = require('http');
let fs = require('fs');
const querystring = require('querystring');
const port = process.env.PORT || 1337;
const express = require('express')
const app = express();
const EventEmitter = require('events')
const chatEmitter = new EventEmitter();

const server = http.createServer(function (req, res) {
	if (req.url === '/') return respondText(req, res);
	if (req.url === '/json') return respondJson(req, res);
	if (req.url.match(/^\/echo/)) return respondEcho(req, res);
	if (req.url.match(/^\/static/)) return respondStatic(req, res);

	respondNotFound(req, res);
})

function respondText(req, res) {
	res.setHeader('Content-Type', 'text/plain')
	res.end('Hi')
}

function respondJson(req, res) {
	res.json({ text: 'hi', numbers: [1, 2, 3] })
}

function respondNotFound(req, res) {
	res.writeHead(404, { 'Content-Type': 'text/plain' })
	res.end('Not Found!')
}

function respondEcho(req, res) {
	const { input = '' } = req.query;
	res.end(
		JSON.stringify({
			normal: input,
			shouty: input.toUpperCase(),
			characterCount: input.length,
			backwards: input.split('').reverse().join('')
		})
	)
}

function respondStatic(req, res) {
	const filename = `${__dirname}/public/${req.params[0]}`;
	fs.createReadStream(filename)
		.on('error', () => respondNotFound(req, res))
		.pipe(res)
}

function respondChat(req, res) {
	const { message } = req.query;
	chatEmitter.emit('message', message);

	// log
	fs.appendFile(`${__dirname}/chatLog.txt`, message + '\n', (err) => {
		if(err) {
			console.error(`Error writing to chat log: ${err}`)
		}
	})

	res.end();
}

function respondSSE(req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/event-stream',
		'Connection': 'keep-alive'
	});

	// Read previous messages from the chat log file
	fs.readFile(`${__dirname}/chatLog.txt`, 'utf8', (err,data) => {
		if(err) {
			console.error(`Error reading chat log: ${err}`)
		} else {
			data.split('\n').forEach((msg) => {
				if(msg.trim() !== '') {
					res.write(`data: ${msg}\n\n`);
				}
			});
		}
	})

	const onMessage = (msg) => {
		// append the old/new message to the chat log file
		fs.appendFile(`${__dirname}/chatLog.txt`, msg + "\n", (err) => {
			if(err) console.error(`Error writing to chat log: ${err}`)
		})
		res.write(`data: ${msg}`)
	}

	chatEmitter.on('message', onMessage)

	res.on('close', function () {
		chatEmitter.off('message', onMessage)
	})
}

function respondPreviousMessage(req, res) {
	fs.readFile('chatLog.txt', 'utf8', (err, data) => {
		if(err) {
			console.error(`Error reading chat log: ${err}`);
			res.status(500).end('Internal Server Error');
		} else {
			res.setHeader('Content-Type', 'text/plain')
			res.end(data)
		}
	})
}

app.get('/', respondText)
app.get('/json', respondJson)
app.get('/echo', respondEcho)
app.get('/static/*', respondStatic)
app.get('/chat', respondChat)
app.get('/sse', respondSSE)
app.get('/previous-message', respondPreviousMessage)

app.listen(port)
console.log(`Server listening on port ${port}`)