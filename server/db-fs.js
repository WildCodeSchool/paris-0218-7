const fs = require('fs')
const util = require('util')
const path = require('path')

const readFile = util.promisify(fs.readFile)
const readdir = util.promisify(fs.readdir)
const writeFile = util.promisify(fs.writeFile)
const removeFile = util.promisify(fs.unlink)

const dbpath = path.join(__dirname, 'db/alumnis')

const getUsers = () => {
  return readdir(dbpath)
  .then(files => {
    const filePaths = files.map(file => path.join(dbpath, file))
    const allFiles = filePaths
    .filter(filepath => filepath.endsWith('.json'))
    .map(filePath => readFile(filePath, 'utf-8'))
    return Promise.all(allFiles)
  })
  .then(allFilesValues => allFilesValues.map(JSON.parse))
}

const getUserById = id => {
  const filePath = path.join(dbpath, `alumni${id}.json`)

  return readFile(filePath).then(JSON.parse)
}

const addUser = user => {
  const filePath = path.join(dbpath, `alumni${user.id}.json`)

  return writeFile(filePath, JSON.stringify(user, null, 2), 'utf8')
}

const updateUser = async (id, updates) => {
  const fileName = `alumni${id}.json`
  const filePath = path.join(__dirname, '../mocks/alumnis', fileName)

  const user = await getUserById(id)

  for (const key of Object.keys(updates)) {
    if (updates[key] !== undefined) {
      user[key] = updates[key]
    }
  }

  return writeFile(filePath, JSON.stringify(user, null, 2), 'utf8')
}

const deleteUser = async id => {
  const fileName = `alumni${id}.json`
  const filePath = path.join(__dirname, '../mocks/alumnis', fileName)

  const user = await getUserById(id)

  user.deleted = true

  return writeFile(filePath, JSON.stringify(user, null, 2), 'utf8')

  // return removeFile(filePath)
}

module.exports = {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
}
