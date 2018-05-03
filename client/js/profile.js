import { search } from './route.js'
const signOutForm = document.getElementById('sign-out-form')
const authElement = document.getElementById('auth')
const messageElement = document.getElementById('message')

const handleAuth = response => {
  const login = response.firstName

  authElement.innerHTML = login ? `Hi ${login}, tu es bien connecté` : 'tu viens de te deconnecter'

  // signInForm.style.display = login ? 'none' : 'block'
  signOutForm.style.display = login ? 'block' : 'none'

  // handle errors
  messageElement.innerHTML = response.error || ''
}

const handleErrors = res => {
  if (res.error) {
    const nbElement = document.getElementById('nb_alumni')
    nbElement.innerHTML = `
    <p style "color: red;">Vous devez être connécter pour avoir accé au membres</p>
  `
    throw Error(res.error)
  }

  return res
}

const calculateAge = birthday => { // birthday is a date
  const ageDifMs = Date.now() - birthday.getTime()
  const ageDate = new Date(ageDifMs) // miliseconds from epoch

  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

fetch(`http://localhost:3248/alumnis/${search.get('id')}`, {
  'credentials': 'include',
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  })
  .then(response => response.json())
  .then(id => {

    const nameElement = document.getElementById('block_starter')

    nameElement.innerHTML = `
      <p class="name">${id.firstName} ${id.lastName}</p>
      <img src="http://localhost:3248/images/${id.img}" id="profile.picture">
      <p class="decriptionSentence">${id.decriptionSentence}</p>
    `

    const birth = new Date(id.birthDate)
    const detailsElement = document.getElementById('block_details')

    detailsElement.innerHTML = `
      <p class="spe">Spécialisation : ${id.specialization}</p>
      <p class= "session">Session : ${id.campus} / ${id.dateSession}</p>

      <p id="birthday">Age : ${calculateAge(birth)} ans</p>

      <p class= "langue">Langues: ${id.langage}</p>
      <p class="hobby">Mes passions : ${id.passions}</p>
    `
  })
  .catch(err => {
    const errorElement = document.getElementById('block_starter')
    errorElement.innerHTML = `Ce membre n'existe pas`
    console.log(err)
  })

signOutForm.addEventListener('submit', e => {
  e.preventDefault()

  fetch('http://localhost:3248/sign-out', { 'credentials': 'include' })
    .then(res => res.json())
    .then(handleAuth)
    .catch(err => console.error(err))
      window.location = window.location
})

