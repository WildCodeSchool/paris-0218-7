document.getElementById('new_profile').addEventListener('submit', event => {
  event.preventDefault()
  const prenom = document.getElementById('firstName').value
  const nom = document.getElementById('lastName').value
  const phrase = document.getElementById('decriptionSentence').value
  fetch('http://localhost:3248/form', {
    method: 'post',
    body: JSON.stringify({
      prenom,
      nom,
      phrase
    })
  }).then(response => console.log(response.status))
  // console.log('Prenom', prenom)
  // console.log('Nom', nom)
  // console.log('phrase', phrase)
})