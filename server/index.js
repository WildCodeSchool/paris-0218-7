const express = require('express')
const fs = require('fs')
const util = require('util')
const path = require('path')

const readFile = util.promisify(fs.readFile)
const readdir = util.promisify(fs.readdir)
const writeFile = util.promisify(fs.writeFile)

const app = express()


app.use(express.static('public'))

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})


// Midelware of "Add data with post"
app.use((request, response, next) => {
  if (request.method === 'GET') return next()
  let accumulator = ''
  request.on('data', data =>{
    accumulator += data
  })
  request.on('end', () =>{
    try{
      request.body = JSON.parse(accumulator)
      next()
    } catch (err) {
    next(err)
    }
  })
})

app.get('/', (request, response) => {
  response.end('ok')
})

//Add data with post
app.post('/form', (request, response, next) => {
  const id = Math.random().toString(36).slice(2).padEnd(11, '0')
  const fileName = `alumni${id}.json`
  const filePath = path.join(__dirname, '../mocks/alumnis', fileName)
  const content = {
    id: id,
    firstName: request.body.prenom,
    lastName: request.body.nom,
    decriptionSentence: request.body.phrase,
    createdAt: Date.now()
  }
  writeFile(filePath, JSON.stringify(content), 'utf8')
  .then(() => response.json('ok'))
  .catch(next)
  })

//For display all alumnis on index.html with FS and promise
app.get('/alumnis', (request, response, next) => {
  console.log('sss')
  const alumniDirr = (path.join(__dirname, '../mocks/alumnis'))
  readdir(alumniDirr)
    .then(files => {
      const filePaths = files.map(file => path.join(alumniDirr, file))
      const allFiles = filePaths
        .filter(filepath => filepath.endsWith('.json'))
        .map(filePath => {
          return readFile(filePath, 'utf-8')
        })
      return Promise.all(allFiles)
    })
    .then(allFilesValues => {
      const valueInJason = allFilesValues.map(JSON.parse)
      response.json(valueInJason)
    })
    .catch(next)
})


//Find the ID for display the profile detail with read file and
app.get('/alumnis/:id', (request, response) => {
  // Build the file name with id in params
  const fileName = `alumni${request.params.id}.json`
  // Build the file path
  const filePath = path.join(__dirname, '../mocks/alumnis', fileName)
  // COMMENT : Read the file path with the promise methode
  readFile(filePath)
    .then(data => {
      response.header('Content-Type', 'application/json; charset=utf-8')
      response.end(data)
    })
    .catch(err => {
      response.status(404)
      response.end('Alumni n\'existe pas ;-))))')
    })
  })

app.listen(3248, () => console.log('J\'écoute sur le port 3248'))
