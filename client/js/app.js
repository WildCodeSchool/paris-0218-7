import { showAlumnis } from './components/showAlumni.js'

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
  .then(response => {
    // const input = document.getElementById('search')

    renderAlumnis(response)

    // input.addEventListener('input', event => {

    //   const value = event.target.value.toLowerCase()

    //   const alumnisTab = [
    //     "firstName",
    //     "lastName",
    //     "campus",
    //     "dateSession",
    //     "specialization"

    //   ]

    //   const checkIfFound = (alumni) => {
    //     for ( let i = 0 ; i < alumnisTab.length ; i++ ) {
    //       if (alumni[alumnisTab[i]].toLowerCase().includes(value) === true) {
    //         return true
    //       }
    //     }
    //     return false
    //   }

    //   renderAlumnis(alumnis.filter(p => checkIfFound(p)))
    // })
  })


