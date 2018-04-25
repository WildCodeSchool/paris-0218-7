import { showAlumnis } from './components/showAlumni.js'

const renderAlumnis = alumnis => {
  const alumnisElement = document.getElementById('block_alumnis')
  const alumniElements = alumnis.map(showAlumnis).join('')
  alumnisElement.innerHTML = alumniElements
  console.log(alumniElements)

  const nbElement = document.getElementById('nb_alumni')
  nbElement.innerHTML = `
    <p>${alumnis.length} membres correspondent à votre recherche</p>
  `
}

fetch('http://localhost:3248/alumnis')
  .then(response => response.json())
  .then(alumnis => {
    const input = document.getElementById('search')

    input.addEventListener('input', event => {
        const value = event.target.value
        renderAlumnis(alumnis.filter(alumni => alumni.firstName.toLowerCase().includes(value)))
    })

    renderAlumnis(alumnis)
  })
