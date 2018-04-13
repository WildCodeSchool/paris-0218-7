const _calculateAge = (birthday) =>{ // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export const showAlumnis = (alumni) => {
	const birth = new Date(alumni.birthDate)
	const img = new Image();	
	img.src = alumni.img
		return `
		<a href="profile.html?id=${alumni.id}" id="lien">
		<div class="liste_alumnis">
			<img src="${alumni.img}" id="image">
			<h4 id="prenom">${alumni.firstName} ${alumni.lastName}</h4>
			<p id="birthday">${_calculateAge(birth)} ans</p>
			<p id="campus">Campus: ${alumni.campus}</p>
		</div>
		</a>
		`
}