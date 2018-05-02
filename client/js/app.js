import { showAlumnis } from './components/showAlumni.js'

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

fetch('http://localhost:3248/alumnis', {'credentials': 'include'})
  .then(response => response.json())
  .then(handleErrors)
  .then(renderAlumnis)
  .catch(err => console.error(err))
