const express = require('express')
const fs = require('fs')
const path = require('path')

const alumni1 = require('../mocks/alumnis/alumni1.json')
const alumni2 = require('../mocks/alumnis/alumni2.json')
const alumni3 = require('../mocks/alumnis/alumni3.json')
const alumni4 = require('../mocks/alumnis/alumni4.json')
const alumni5 = require('../mocks/alumnis/alumni5.json')

const allAlumnis = [
	alumni1,
	alumni2,
	alumni3,
	alumni4,
	alumni5,
	alumni1,
	alumni2,
	alumni3
]

const app = express()

app.use(express.static('public'))

app.use((request, response, next) => {
	response.header('Access-Control-Allow-Origin', '*')
	response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
	next()
})

app.get('/', (request, response) => {
	response.end('ok')
})

//Find the ID for display the profile detail with read file 
app.get('/alumnis/:id', (request, response) => {
	const fileName = `alumni${request.params.id}.json`
	// console.log({ fileName })
	const filePath = path.join(__dirname, '../mocks/alumnis', fileName)
	// console.log({ filePath })
	fs.readFile(filePath, 'utf-8', (err, data) => {
		if (err) {
			return response.status(404).end('Alumni n\'existe pas ;-))))')
		}
		response.header('Content-Type', 'application/json; charset=utf-8')
		response.end(data)
		// response.json(data)
	})	
	// const id = Number(request.params.id)
	// const alumni = allAlumnis.find(alumni => alumni.id === id)
	// response.json(alumni)
})


//For display all alumnis on index.html page with require at th etop of this page
app.get('/alumnis', (request, response) => {
	response.json(allAlumnis)
})

app.listen(3248, () => console.log('J\'écoute sur le port 3248'))
