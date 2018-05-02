const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const multer = require('multer')

const db = require('./db-fs.js')

const publicImageFolderPath = path.join(__dirname, 'public/uploads')

const upload = multer({
  storage: multer.diskStorage({
    destination: publicImageFolderPath,
    filename: (req, file, cb) => cb(null, file.originalname)
  }),
  limits: { fileSize: 3000000 },
  fileFilter: function (request, files, cb) {
    // accept image only
    if (!files.mimetype.startsWith('image/')) return cb(null, false)
    cb(null, true)
  }
})

const app = express()

// MIDDLEWARES

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/images', express.static(publicImageFolderPath))

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Methods', '*')
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  next()
})

// ROUTES

app.get('/', (request, response) => {
  response.end('Tu es a la racine')
})

app.post('/sign-up', upload.single('myimage'), async (request, response, next) => {
  const user = request.body

  const users = await db.getUsers()

  const emailAlreadyTaken = users.some(u => user.email === u.email)
  if (emailAlreadyTaken) {
    throw Error('Email already taken')
  }

  const id = Math.random().toString(36).slice(2).padEnd(11, '0')

  user.id = id
  user.createdAt = Date.now()
  user.img = request.file ? request.file.filename : 'default.jpg'

  return db.addUser(user)
    .then(() => response.json({ success: true }))
    .catch(next)
})

//For display all alumnis on index.html with FS and promise
app.get('/alumnis', async (request, response, next) => {
  db.getUsers()
    .then(users => response.json(users))
    .catch(next)
})

//Find the ID for display the profile detail with read file and
app.get('/alumnis/:id', async (request, response) => {
  const id = request.params.id

  db.getUserById(id)
    .then(user => response.json(user))
    .catch(() => response.status(404).end('Alumni not found'))
})

//Update profile
app.put('/alumnis/:id', upload.single('avatar'), (request, response, next) => {
  const id = request.params.id
  const updates = request.body

  if (request.file) {
    updates.img = request.file.filename
  }

  console.log({id, updates})

  db.updateUser(id, updates)
    .then(() => response.json('ok'))
    .catch(next)
})
app.listen(3248, () => console.log('J\'écoute sur le port 3248'))
