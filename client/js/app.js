const _calculateAge = (birthday) =>{ // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}



const showAlumnis = (alumni) => {

	//Date de naissance
	const birth = new Date(alumni.birthDate)
	// let day = birth.getDate()
	// let month = birth.getMonth()+1
	// const year = birth.getFullYear()
	// if (month < 10) {
	// 	month = (`0${month}`)
	// }
	// if(day < 10){
	// 	day = (`0${day}`)
	// }
	// const dateBirth = (`${day}/${month}/${year}`)

	// //age
	// const date = new Date()
	// const age = date - birth
	// console.log(_calculateAge(birth))


	const img = new Image();	
	img.src = alumni.img
		return `
		<div class="liste_alumnis">
			<img src="${alumni.img}" id="image">
			<h4 id="prenom">${alumni.firstName} ${alumni.lastName}</h4>
			<p id="birthday">${_calculateAge(birth)} ans</p>
			<p id="campus">Campus: ${alumni.campus}</p>
		</div>`
}



fetch('http://localhost:3248/alumnis')
	.then(response => response.json())
	.then(personne => {
		const alumnisElement = document.getElementById('block_alumnis')
		const alumniElements = personne.map(showAlumnis).join(' ')
		alumnisElement.innerHTML = alumniElements

		const nbElement = document.getElementById('nb_alumni')
		nbElement.innerHTML = (`
				<p>${personne.length} membres correspondent à votre recherche</p>
			`)
	})