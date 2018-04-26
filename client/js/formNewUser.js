
document.getElementById('new_user').addEventListener('submit', event => {
  event.preventDefault()
  const userEmail = document.getElementById('userEmail').value
  const userPassword = document.getElementById('userPassword').value
  const formData = new FormData(event.target)
  console.log('Mail : ', userEmail)
  console.log('Password : ', userPassword)
  fetch('http://localhost:3248/home', {
    method: 'POST',
    body: JSON.stringify({
      userEmail,
      userPassword
    })
  }).then(response => console.log(response.status))
})
