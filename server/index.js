const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session') //For sign_in sign_up
const FileStore = require('session-file-store')(session) //For sign_in sign_up
const multer = require('multer')

const db = require('./db-fs.js')

const publicImageFolderPath = path.join(__dirname, 'public/uploads')

const upload = multer({
  storage: multer.diskStorage({
    destination: publicImageFolderPath,
    filename: (req, file, cb) => cb(null, file.originalname)
  }),
  limits: { fileSize: 3000000 },
  fileFilter: function (req, files, cb) {
    // accept image only
    if (!files.mimetype.startsWith('image/')) return cb(null, false)
    cb(null, true)
  }
})

const secret = 'something unbelievable' //For sign_in sign_up

const mustBeSignIn = (req, res, next) => {
  if (!req.session.user || !req.session.user.email) {
    return next(Error('Must be sign-in'))
  }

  next()
}

const app = express()

// MIDDLEWARES

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/images', express.static(publicImageFolderPath))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})

//For sign_in sign_up
app.use(session({
  secret,
  saveUninitialized: false,
  resave: true,
  store: new FileStore({ path: path.join(__dirname, 'sessions'), secret }),
}))

//For sign_in sign_up
// Logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, { user: req.session.user, cookie: req.headers.cookie })
  next()
})


// ROUTES

app.get('/home', (req, res) => {
  const user = req.session.user || {}

  res.json(user)
})

app.post('/sign-in', async (req, res, next) => {
  const credentials = {
    login: req.body.login,
    password: req.body.password
  }

  // Retrieve all users from db
  const users = await db.getUsers()

  // does user exists ?
  const user = users.find(user => user.email === credentials.login)

  if (!user) {
    return next(Error('User not found'))
  }

  // user found, does passwords match ?
  if (user.password !== credentials.password) {
    return next(Error('Wrong password'))
  }

  // user found & password matches

  // add user to the session
  req.session.user = user

  res.json(user)
  console.log(`User '${user.email}' connected`)
})

app.get('/sign-out', (req, res, next) => {
  console.log(`User '${req.session.user.email}' disconnected`)
  req.session.user = {}

  // req.session.destroy() // why ?
  res.json('ok')
})

app.post('/sign-up', upload.single('myimage'), async (req, res, next) => {
  const user = req.body

  const users = await db.getUsers()

  const emailAlreadyTaken = users.some(u => user.email === u.email)
  if (emailAlreadyTaken) {
    return next(Error('Email already taken'))
  }

  const id = Math.random().toString(36).slice(2).padEnd(11, '0')

  user.id = id
  user.createdAt = Date.now()
  user.img = req.file ? req.file.filename : 'default.jpg'

  return db.addUser(user)
    .then(() => res.json({ success: true }))
    .catch(next)
})

//For display all alumnis on index.html with FS and promise
app.get('/alumnis', mustBeSignIn, async (req, res, next) => {
  db.getUsers()
    .then(users => res.json(users))
    .catch(next)
})

//Find the ID for display the profile detail with read file and
app.get('/alumnis/:id', async (req, res) => {
  const id = req.params.id

  db.getUserById(id)
    .then(user => res.json(user))
    .catch(() => res.status(404).end('Alumni not found'))
})


// ERROR HANDLING

app.use((err, req, res, next) => {
  if (err) {
    res.json({ error: err.message })
    console.error('ERr:', err)
  }
})

app.listen(3248, () => console.log('J\'écoute sur le port 3248'))
