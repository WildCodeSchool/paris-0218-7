import { showAlumnis } from './components/showAlumni.js'

const searchableKeys = [ 
  "firstName",
  "lastName",
  "birthDate",
  "campus",
  "dateSession",
  "specialization",
  "language"
]
const searchableValues = p => searchableKeys.map(k => p[k])
const renderAlumnis = alumnis => {
  
  // Creating an alumni form
  const alumnisElement = document.getElementById('block_alumnis')
  
  // Creation of all alumni files
  const alumniElements = alumnis.map(showAlumnis).join('')
  

  alumnisElement.innerHTML = alumniElements

  const nbElement = document.getElementById('nb_alumni')
  nbElement.innerHTML = `
    <p>${alumnis.length} membres correspondent à votre recherche</p>
  `
}

fetch('http://localhost:3248/alumnis')
  .then(response => response.json())
  .then(alumnis => {
    const input = document.getElementById('search')

    renderAlumnis(alumnis)
    alumnis.forEach(alumni => alumni.element = document.getElementById(`alumni-${alumni.id}`))  

    input.addEventListener('input', event => {
      const search = event.target.value.toLowerCase()
      const includeSearch = value => String(value).toLowerCase().includes(search)

      alumnis.forEach(p => p.element.style.display = searchableValues(p).some(includeSearch) ? 'inherit' : 'none')
    })
  })

