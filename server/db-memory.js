const users = [
  {
    "id": 1,
    "firstName" : "Mohand",
    "lastName" : "Hassam",
    "birthDate" : "1982,08,02",
    "img": "brad.jpg",
    "campus": "Paris",
    "dateSession": "Février 2018",
    "specialization": "Javascript",
    "decriptionSentence": "Mon coté Wild: Je suis chanteur d'opéra amateur",
    "language": "Anglais, Espagnol",
    "passions": "Football"
  },
  {
    "id": 2,
    "firstName" : "Francesca",
    "lastName" : "Ringot",
    "birthDate" : "1990/11/25",
    "campus" : "Lyon",
    "img": "claire.jpg",
    "dateSession": "Septembre 2018",
    "specialization": "PHP",
    "decriptionSentence": "Mon coté Wild: Je danse je danse je danse",
    "language": "russe, italien",
    "passions": "Art contemporain"
  }
]

const getUsers = () => Promise.resolve(users)

const getUserById = id => {
  const user = users.find(user => user.id == id)

  if (!user) {
    return Promise.reject()
  }

  return Promise.resolve(user)
}

const addUser = user => {
  users.push(user)

  return Promise.resolve()
}

module.exports = {
  getUsers,
  getUserById,
  addUser,
}
