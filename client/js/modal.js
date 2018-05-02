import { search } from './route.js'

// Get the modal
const modal = document.getElementById('myModal')

// Get the button that opens the modal
const btn = document.getElementById('btn-modifier')

// Get the <span> element that closes the modal
const span = document.getElementsByClassName('close')[0]

// When the user clicks the button, open the modal
btn.onclick = () => {
  modal.style.display = 'block'
}

// When the user clicks on <span> (x), close the modal
span.onclick = () => {
  modal.style.display = 'none'
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = 'none'
  }
}
const updateForm = document.getElementById('update-form')

updateForm.addEventListener('submit', event => {
  event.preventDefault()

  const formData = new FormData(event.target)

  fetch(`http://localhost:3248/alumnis/${search.get('id')}`, {
    method: 'PUT',
    body: formData,
  })
  .then(response => {
    console.log(response.status)
    window.location = window.location
  })
})

