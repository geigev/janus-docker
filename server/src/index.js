// const assert = require('assert');
const bodyParser = require('body-parser');
const express = require('express');
const methodOverride = require('method-override');
const fs = require('fs');
const https = require('https');
const http = require('http');
const httpProxy = require('http-proxy');
const path = require('path');
const url = require('url');

const options = {
	key: fs.readFileSync('/sslkeys/privkey.pem'),
	cert: fs.readFileSync('/sslkeys/fullchain.pem'),
};

const agent = new http.Agent({
	maxSockets: 1000,
	keepAlive: true,
	keepAliveMsecs: 3000,
});

const proxy = httpProxy.createProxy({
	agent,
	ws: true,
});

proxy.on('error', (e, req, res) => {
	// eslint-disable-next-line no-console
	console.log('Proxy error event', e);
	return res.end('Something went wrong -- proxy error');
});

const httpsApp = express();
const server = https.createServer(options, httpsApp).listen(443);
httpsApp.enable('trust proxy');
httpsApp
	.use(bodyParser.json({ limit: '20mb' }))
	.use(bodyParser.urlencoded({ limit: '20mb', extended: false }))
	.use(express.static(path.join(__dirname, 'public')))
	.use((req, res) => {
		// 404 catcher
		res.sendStatus(404);
	})
	.use(methodOverride())
	.use((err, req, res) => {
		// Invalid input
		res.sendStatus(400);
	});


server.on('upgrade', (req, socket, upgradeHead) => {
	const parsedUrl = url.parse(`https://${req.headers.host}${req.url}`, true); // true to get query as object
	const address = parsedUrl.query.address;
	if (!address) {
		return socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
	}
	req.target = {
		host: address,
		port: 80,
		protocol: 'ws:',
	};
	return proxy.ws(req, socket, upgradeHead, {
		target: req.target,
		// secure: true,
	});
});

const app = express();
app.get('/', (req, res) => res.send('Service 1: no path!'));
app.get('/s1', (req, res) => res.send('Service 1: Hello World!'));
app.listen(80);
