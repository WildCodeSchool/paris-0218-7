const fs = require('fs')
const util = require('util')
const path = require('path')

const readFile = util.promisify(fs.readFile)
const readdir = util.promisify(fs.readdir)
const writeFile = util.promisify(fs.writeFile)

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

module.exports = {
  getUsers,
  getUserById,
  addUser,
}
