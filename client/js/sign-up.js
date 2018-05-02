const form = document.getElementById('sign-up-form')

form.addEventListener('submit', event => {
  event.preventDefault()

  const formData = new FormData(event.target)

  fetch('http://localhost:3248/sign-up', {
    method: 'POST',
    body: formData,
  })
  .then(response => console.log(response.status))
})




