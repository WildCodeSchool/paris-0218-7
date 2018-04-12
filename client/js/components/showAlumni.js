const _calculateAge = (birthday) =>{ // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export const showAlumnis = (alumni) => {

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
		<a href="profile.html?id=${alumni.id}" id="lien">
		<div class="liste_alumnis">
			
			<img src="${alumni.img}" id="image">
			<h4 id="prenom">${alumni.firstName} ${alumni.lastName}</h4>
			<p id="campus">Campus: ${alumni.campus}</p>
		</div>
		</a>
		`
}

// <p id="birthday">${_calculateAge(birth)} ans</p>