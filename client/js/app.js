import { showAlumnis } from './components/showAlumni.js'

fetch('http://localhost:3248/alumnis')
  .then(response => response.json())
  .then(personne => {
    const alumnisElement = document.getElementById('block_alumnis')
    const alumniElements = personne.map(showAlumnis).join('')
    alumnisElement.innerHTML = alumniElements

    const nbElement = document.getElementById('nb_alumni')
    nbElement.innerHTML = `
      <p>${personne.length} membres correspondent à votre recherche</p>
    `
  })
