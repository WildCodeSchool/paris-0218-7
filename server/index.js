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

const app = express()

// MIDDLEWARES

// Authentication middleware (check if user is logged or not)
const authRequired = (req, res, next) => {
  if (!req.session.isLogged) {
    return next(Error('Must be logged'))
  }

  next()
}

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/images', express.static(publicImageFolderPath))

app.use(session({
  secret,
  saveUninitialized: false,
  resave: true,
  store: new FileStore({ path: path.join(__dirname, 'sessions'), secret }),
}))

// Logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, { user: req.session.user, cookie: req.headers.cookie })
  next()
})


// ROUTES

app.get('/', (req, res) => {
  res.end('coucou')
})

app.get('/whoami', (req, res) => {
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
  req.session.isLogged = true

  res.json(user)
  console.log(`User '${user.email}' connected`)
})

app.get('/sign-out', (req, res, next) => {
  console.log(`User '${req.session.user.email}' disconnected`)
  req.session.user = {}
  req.session.isLogged = false

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

app.get('/alumnis', authRequired, (req, res, next) => {
  db.getUsers()
    .then(users => users.filter(user => user.deleted !== true))
    .then(users => res.json(users))
    .catch(next)
})

app.get('/alumnis/:id', (req, res) => {
  const id = req.params.id

  db.getUserById(id)
    .then(user => {
      if (user.deleted) {
        throw Error('Alumni not found')
      }
    
      return user
    })
    .then(user => res.json(user))
    .catch(() => res.status(404).end('Alumni not found'))
})

//Update profile
app.put('/alumnis/:id', upload.single('avatar'), (req, res, next) => {
  const id = req.params.id
  const updates = req.body

  if (req.file) {
    updates.img = req.file.filename
  }

  console.log({id, updates})

  db.updateUser(id, updates)
    .then(() => res.json('ok'))
    .catch(next)
})

//Delete Profile
app.delete('/alumnis/:id', (req, res, next) => {
  const id = req.params.id

  db.deleteUser(id)
    .then(() => res.json('ok'))
    .catch(next)
})


// ERROR HANDLING

app.use((err, req, res, next) => {
  if (err) {
    res.json({ error: err.message })
    console.error(err)
  }
})

app.listen(3248, () => console.log('J\'écoute sur le port 3248'))
