const express = require('express')

const app = express()

app.get('/', (request, response) => {
	response.end('ok')
})

app.listen(3248, () => console.log('J\'écoute sur le port 3248'))