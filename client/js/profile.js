import { search } from './route.js'

const calculateAge = birthday => { // birthday is a date
  const ageDifMs = Date.now() - birthday.getTime()
  const ageDate = new Date(ageDifMs) // miliseconds from epoch

  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

fetch(`http://localhost:3248/alumnis/${search.get('id')}`, {'credentials': 'include'})
  .then(response => response.json())
  .then(id => {

    const nameElement = document.getElementById('block_starter')

    nameElement.innerHTML = `
      <p class="name">${id.firstName} ${id.lastName}</p>
      <img src="http://localhost:3248/${id.img}" id="profile.picture">
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
  })

