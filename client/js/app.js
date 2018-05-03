import { showAlumnis } from './components/showAlumni.js'
const signOutForm = document.getElementById('sign-out-form')
const authElement = document.getElementById('auth')
const messageElement = document.getElementById('message')
let alumnis = []

const handleAuth = (user) => {
  console.log(user)
  const login = user.firstName

  authElement.innerHTML = login ? `Hi ${login}, tu es bien connecté` : 'tu viens de te deconnecter'

  // signInForm.style.display = login ? 'none' : 'block'
  signOutForm.style.display = login ? 'block' : 'none'

  // handle errors
  messageElement.innerHTML = user.error || ''
}

const handleErrors = res => {
  if (res.error) {
    const nbElement = document.getElementById('nb_alumni')
    nbElement.innerHTML = `
    <p style "color: red;">Vous devez être connécter pour avoir accé au membres</p>
    <p><a href="home.html">Connexions</a> ou créer un <a href="sign-up.html">compte</a></p>
  `
    signOutForm.style.display = login ? 'none' : 'block'
    throw Error(res.error)
  }

  return res
}

const renderAlumnis = alumnis => {
  const alumnisElement = document.getElementById('block_alumnis')
  const alumniElements = alumnis.map(showAlumnis).join('')
  alumnisElement.innerHTML = alumniElements

  const nbElement = document.getElementById('nb_alumni')
  nbElement.innerHTML = `
    <p>${alumnis.length} membres correspondent à votre recherche</p>
  `
}

fetch('http://localhost:3248/whoami', { 'credentials': 'include', })
  .then(res => res.json())
  .then(user => handleAuth(user))



fetch('http://localhost:3248/alumnis', { 'credentials': 'include', })
  .then(response => response.json())
  .then(handleErrors)
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

signOutForm.addEventListener('submit', e => {
  e.preventDefault()

  fetch('http://localhost:3248/sign-out', { 'credentials': 'include' })
    .then(res => res.json())
    .then(handleAuth)
    .catch(err => console.error(err))
      window.location = window.location
})
