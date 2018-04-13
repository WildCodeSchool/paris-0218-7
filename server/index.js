const express = require('express')
const fs = require('fs')
const util = require('util')
const path = require('path')

const readFile = util.promisify(fs.readFile)
const readdir = util.promisify(fs.readdir)

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

//For display all alumnis on index.html with FS and promise
app.get('/alumnis', (request, response) => {
  const alumniDirr = (path.join(__dirname, '../mocks/alumnis'))
  readdir(alumniDirr)
    .then(files => {
      const filePaths = files.map(file => path.join(alumniDirr, file))
      const allFiles = filePaths.map(filePath => {
        return readFile(filePath, 'utf-8')
      })
      Promise.all(allFiles)
        .then(allFilesValues => {
        const valueInJason = allFilesValues.map(JSON.parse)
        response.json(valueInJason)
      })
      .catch(err => {
        response.status(500).end(err.message)
      })
    })
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
