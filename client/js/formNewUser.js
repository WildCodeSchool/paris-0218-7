const authElement = document.getElementById('auth')
const messageElement = document.getElementById('message')
const signInForm = document.getElementById('sign-in-form')
const signOutForm = document.getElementById('sign-out-form')

const handleAuth = response => {
  console.log(response)
  const login = response.firstName

  if (login) {
    window.location = 'http://localhost:5000/index.html'
    return
  }

  // handle errors
  messageElement.innerHTML = response.error || ''
}

signInForm.addEventListener('submit', e => {
  e.preventDefault()

  const formData = new FormData(e.target)
  const credentials = {
    login: formData.get('login'),
    password: formData.get('password')
  }

  fetch('http://localhost:3248/sign-in', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    'credentials': 'include', // Always send user credentials (cookies, basic http auth, etc..), even for cross-origin calls.
    body: JSON.stringify(credentials)
  })
  .then(res => res.json())
  .then(handleAuth)
})

fetch('http://localhost:3248/whoami', { 'credentials': 'include' })
  .then(res => res.json())
  .then(handleAuth)
