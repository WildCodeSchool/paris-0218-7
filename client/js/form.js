document.getElementById('new_profile').addEventListener('submit', event => {
  event.preventDefault()
  const prenom = document.getElementById('firstName').value
  const nom = document.getElementById('lastName').value
  const phrase = document.getElementById('decriptionSentence').value
  const anniversaire = document.getElementById('birthDate').value
  const ecole = document.getElementById('campus').value
  const session = document.getElementById('dateSession').value
  const specialization = document.getElementById('spec').value
  const coteWild = document.getElementById('decriptionSentence').value
  const langage = document.getElementById('langue').value
  const passions = document.getElementById('passion').value
  fetch('http://localhost:3248/form', {
    method: 'post',
    body: JSON.stringify({
      prenom,
      nom,
      phrase,
      anniversaire,
      ecole,
      session,
      specialization,
      coteWild,
      langage,
      passions
    })
  }).then(response => console.log(response.status))
  // console.log('Prenom', prenom)
  // console.log('Nom', nom)
  // console.log('phrase', phrase)
})
