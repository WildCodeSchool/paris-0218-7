
import { showAlumnis } from './components/showAlumni.js'
const signOutButton = document.getElementById('sign-out-form')
const authElement = document.getElementById('auth')
const messageElement = document.getElementById('message')
let alumnis = []

const handleAuth = user => {
  const login = user.firstName

  if (!login) {
    window.location = 'http://localhost:5000/home.html'
    return
  }

  // signOutButton.innerHTML = login ? `${login}<a href="#" id="sign-out-form">DECONNEXION</a>` : '<a href="home.html">CONNEXION</a>'

  // signOutButton.style.display = login ? '' : 'none'
}

// const handleErrors = res => {
//   if (res.error) {
//     const nbElement = document.getElementById('nb_alumni')
//     nbElement.innerHTML = `
//       <p style "color: red;">Vous devez être connecté pour avoir accés aux membres</p>
//       <p><a href="home.html">Connexions</a> ou créer un <a href="sign-up.html">compte</a></p>
//     `
//     throw Error(res.error)
//   }

//   return res
// }

const renderAlumnis = alumnis => {
  const alumnisElement = document.getElementById('block_alumnis')
  const alumniElements = alumnis.map(showAlumnis).join('')
  alumnisElement.innerHTML = alumniElements

  const nbElement = document.getElementById('nb_alumni')
  nbElement.innerHTML = `
    <p>${alumnis.length} membres correspondent à votre recherche</p>
  `
}

fetch('http://localhost:3248/alumnis', { 'credentials': 'include', })
  .then(response => response.json())
  // .then(handleErrors)
  .then(fetchedAlumnis => {
    alumnis = fetchedAlumnis
    renderAlumnis(fetchedAlumnis)
  })
  .catch(err => console.error(err))

const searchBar = document.getElementById('search')

searchBar.addEventListener('input', event => {
  event.preventDefault()

  const value = event.target.value.toLowerCase()

  const keys = [
    'firstName',
    'lastName',
    'campus',
    'dateSession'
  ]

  const byKeys = alumni => {
    for (const key of keys) {
      if (alumni[key].toLowerCase().includes(value)) {
        return true
      }
    }

    return false
  }

  const filteredAlumnis = alumnis.filter(byKeys)

  renderAlumnis(filteredAlumnis)
})

signOutButton.addEventListener('click', e => {
  e.preventDefault()

  fetch('http://localhost:3248/sign-out', { 'credentials': 'include' })
    .then(res => res.json())
    .then(handleAuth)
    .catch(err => console.error(err))

})

fetch('http://localhost:3248/whoami', { 'credentials': 'include', })
  .then(res => res.json())
  .then(handleAuth)


