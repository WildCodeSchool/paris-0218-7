const form = document.getElementById('new_profile')

form.addEventListener('submit', event => {

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
  const formData = new FormData(event.target)
  console.log(formData)

   fetch('http://localhost:3248/image', {
    method: 'POST',
    body: formData,

    // headers: {
    //   'Accept': 'application/json',
    //   'Content-Type': 'multipart/form-data',
    //   'body': formData
    })
    .then(response => console.log(response.status))
  // console.log('Prenom', prenom)
  // console.log('Nom', nom)
  // console.log('phrase', phrase)
})




