const showAlumnis = (alumni) => {
	var img = new Image();	
	img.src = alumni.img
		return `
		<div class="liste_alumnis">
			<img src="${alumni.img}" id="image">
			<h4 id="prenom">${alumni.firstName} ${alumni.lastName}</h4>
			<p id="birthday">${alumni.birthDate}</p>
			<p id="campus">Campus: ${alumni.campus}</p>
		</div>`
}



fetch('http://localhost:3248/alumnis')
	.then(response => response.json())
	.then(personne => {
		const alumnisElement = document.getElementById('block_alumnis')
		const alumniElements = personne.map(showAlumnis).join(' ')
		alumnisElement.innerHTML = alumniElements
	})