const express = require('express')
const fs = require('fs')
const util = require('util')
const path = require('path')
const bodyParser = require('body-parser')
const multer = require('multer')
const upload = multer({
  dest: 'uploads/',
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, file.originalname)
  }),
  limits: { fileSize: 3000000 },
  fileFilter: function (request, files, cb) {
    // accept image only
    if (files.mimetype !== 'image/jpeg') return cb(null, false)
    cb(null, true)
  }
})

const readFile = util.promisify(fs.readFile)
const readdir = util.promisify(fs.readdir)
const writeFile = util.promisify(fs.writeFile)

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// Middleware of "Add data with post"
app.use((request, response, next) => {
  if (request.method === 'GET') return next()
  console.log('content-type', request.headers['content-type'])
  if (request.headers['content-type'].includes('multipart/form-data')) return next()
  let accumulator = ''
  request.on('data', data => {
    accumulator += data
  })
  request.on('end', () => {
    try {
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



app.post('/image', upload.array('myimage'), (request, response, next) => {
  // console.log(request.files)
  if (!request.files) {
    console.log('No file received')
    return response.status(500).json({ success: false })
  }
  console.log('file received')
  const id = Math.random().toString(36).slice(2).padEnd(11, '0')
  const fileName = `alumni${id}.json`
  const filePath = path.join(__dirname, '../mocks/alumnis', fileName)
  const content = {
    id: id,
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    decriptionSentence: request.body.decriptionSentence,
    birthDate: request.body.birthDate,
    campus: request.body.campus,
    dateSession: request.body.dateSession,
    langage: request.body.langue,
    passions: request.body.passion,
    specialization: request.body.spec,
    //createdAt: Date.now()
  }
  writeFile(filePath, JSON.stringify(content))
    .then(() => response.json({ success: true }))
    .catch(next)

});

//For display all alumnis on index.html with FS and promise
app.get('/alumnis', (request, response, next) => {
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
