// const showAlumnis = (alumni) => {

// 	const birth = new Date(alumni.birthDate)
// 	const img = new Image();	
// 	img.src = alumni.img
// 		return `
// 		<a href="profile.html"
// 		<div class="liste_alumnis">
// 			<img src="${alumni.img}" id="image">
// 			<h4 id="prenom">${alumni.firstName} ${alumni.lastName}</h4>
// 			<p id="birthday">${_calculateAge(birth)} ans</p>
// 			<p id="campus">Campus: ${alumni.campus}</p>
// 		</div>
// 		</a>`
// }


// http://api.${DOMAIN}/data/2.5/weather?${params}`
// fetch('http://localhost:3248/alumnis')
// 	.then(response => response.json())
// 	.then(personne => {
// 		const alumnisElement = document.getElementById('block_alumnis')
// 		const alumniElements = personne.map(showAlumnis).join(' ')
// 		alumnisElement.innerHTML = alumniElements

// 		const nbElement = document.getElementById('nb_alumni')
// 		nbElement.innerHTML = (`
// 				<p>${personne.length} membres correspondent à votre recherche</p>
// 			`)
// 	})