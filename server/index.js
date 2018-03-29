const http = require('http')

const server = http .createServer((request, response) => {
	console.log('J\'ai une requete', request.url)
	response.end('OK')
})

server.listen(3248, () => console.log('J\'écoute sur le port 3248'))