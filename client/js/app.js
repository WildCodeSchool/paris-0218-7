import { showAlumnis } from './components/showAlumni.js'

let alumnis = []

const handleErrors = res => {
  if (res.error) {
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

fetch('http://localhost:3248/alumnis', { 'credentials': 'include' })
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
