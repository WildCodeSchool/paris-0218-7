const express = require('express')
const fs = require('fs')
const util = require('util')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session') //For sign_in sign_up
const FileStore = require('session-file-store')(session) //For sign_in sign_up
const multer = require('multer')
const publicImageFolderPath = path.join(__dirname, 'public/uploads')
const upload = multer({
  storage: multer.diskStorage({
    destination: publicImageFolderPath,
    filename: (req, file, cb) => cb(null, file.originalname)
  }),
  limits: { fileSize: 3000000 },
  fileFilter: function (request, files, cb) {
    // accept image only
    if (files.mimetype !== 'image/jpeg') return cb(null, false)
    cb(null, true)
  }
})

const secret = 'something unbelievable' //For sign_in sign_up

const readFile = util.promisify(fs.readFile)
const readdir = util.promisify(fs.readdir)
const writeFile = util.promisify(fs.writeFile)
const mustBeSignIn = (request, response, next) => {
  if(!request.session.user) return next(Error('Must be sign-in'))
  next()
}

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/images', express.static(publicImageFolderPath))
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', request.headers.origin)
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  response.header('Access-Control-Allow-Credentials', 'true')
  next()
})






// Middleware of "Add data with post"
app.use((request, response, next) => {
  if (request.method === 'GET') return next()
  // console.log('content-type', request.headers['content-type'])
  if (request.headers['content-type'].includes('multipart/form-data')) return next()
  // if (request.headers['content-type'].includes('application/json')) return next()
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

//For sign_in sign_up
app.get('/home', (req, res) => {
  const user = req.session.user || {}
  res.json(user)
})

//For sign_in sign_up
app.post('/sign-in', (req, res, next) => {
  // does user exists ?
  const usersDirr = (path.join(__dirname, '../mocks/alumnis'))
  console.log(usersDirr)
  readdir(usersDirr)
    .then(files => {
      const filePaths = files.map(file => path.join(usersDirr, file))
      const allFiles = filePaths
        .filter(filepath => filepath.endsWith('.json'))
        .map(filePath => readFile(filePath, 'utf-8'))
      return Promise.all(allFiles)
      // console.log(allFiles)
    })
    .then(allFilesValues => {
      const valueInJson = allFilesValues.map(JSON.parse)
      // console.log(valueInJson)
      // const findUser = valueInJson.find(u => request.body.userEmail === u.userEmail)
  const findUser = valueInJson.find(u => req.body.login === u.userEmail)
  console.log('User trouver', findUser)
  // Error handling
  if (!findUser) {
    return res.json({ error: 'User not found' })
  }

  if (findUser.userPassword !== req.body.password) {
    return res.json({ error: 'Wrong password' })
  }

  // else, set the user into the session
  req.session.user = findUser
  console.log('user :', findUser.userEmail, 'connected with great success')
  return res.json({ error: 'Password ok' })

  res.json(findUser)
})
})

//For sign_in sign_up
app.get('/sign-out', (req, res, next) => {
  req.session.user = {}
  req.session.destroy()
  console.log(req.session)
  res.json('ok')
  console.log('Deconnected')
})

//For sign_in sign_up
app.use((err, req, res, next) => {
  if (err) {
    res.json({ message: err.message })
    console.error(err)
  }

  next(err)
})




//Creat user / Creat profil / Upload profil picture
app.post('/image', upload.array('myimage'), (request, response, next) => {
  // console.log(request.files)
  // if (!request.files) {
  //   console.log('No file received')
  //   return response.status(500).json({ success: false })
  // }

  const usersDirr = (path.join(__dirname, '../mocks/alumnis'))
  readdir(usersDirr)
    .then(files => {
      const filePaths = files.map(file => path.join(usersDirr, file))
      const allFiles = filePaths
        .filter(filepath => filepath.endsWith('.json'))
        .map(filePath => readFile(filePath, 'utf-8'))
        // console.log(allFiles)
      return Promise.all(allFiles)
    })
    .then(allFilesValues => {
      const valueInJson = allFilesValues.map(JSON.parse)
      // console.log(valueInJson1)
      const findUser = valueInJson.find(u => request.body.userEmail === u.userEmail)
      if (findUser) {
        throw Error('Cet utilisateur exist déjà')
      }
      // console.log('user found', findUser)
      // console.log(request.body)
      const id = Math.random().toString(36).slice(2).padEnd(11, '0')
      const fileName = `alumni${id}.json`
      const filePath = path.join(__dirname, '../mocks/alumnis', fileName)

      const content = {
        id: id,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        userEmail: request.body.userEmail,
        userPassword: request.body.userPassword,
        decriptionSentence: request.body.decriptionSentence,
        birthDate: request.body.birthDate,
        campus: request.body.campus,
        dateSession: request.body.dateSession,
        langage: request.body.langue,
        passions: request.body.passion,
        specialization: request.body.spec
        //createdAt: Date.now()
      }

      if (request.files.length > 0) {
        console.log('file received')
        console.log(request.files)
        const imgName = `${request.files[0].filename}`
        const imgFilePath = path.join('images', imgName)
        const img = imgFilePath
        content.img = img
      }

      return writeFile(filePath, JSON.stringify(content))
    })
      .then(() => response.json({ success: true }))
      .catch(next)
  })

//For display all alumnis on index.html with FS and promise
app.get('/alumnis', mustBeSignIn, (request, response, next) => {
  // const user = request.session.user || {}
  // console.log(user)
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
