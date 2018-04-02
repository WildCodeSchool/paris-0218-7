const express = require('express')
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
	alumni3,
	alumni4,
	alumni5,
	alumni1,
	alumni2,
	alumni3,
	alumni4,
	alumni5,
	alumni1,
	alumni2,
	alumni3,
	alumni4,
	alumni5,
	alumni1,
	alumni2,
	alumni3,
	alumni4,
	alumni5,
	alumni1,
	alumni2,
	alumni3,
	alumni4,
	alumni5,
	alumni1,
	alumni2,
	alumni3,
	alumni4,
	alumni5,
	alumni1,
	alumni2,
	alumni3,
	alumni4,
	alumni5,
	alumni1,
	alumni2,
	alumni3,
	alumni4,
	alumni5,
	alumni1,
	alumni2,
	alumni3,
	alumni4,
	alumni5
]

console.log(allAlumnis)


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

app.get('/alumnis', (request, response) => {
	response.json(allAlumnis)
})

app.listen(3248, () => console.log('J\'écoute sur le port 3248'))
