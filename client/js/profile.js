import { search } from './route.js'

const _calculateAge = (birthday) =>{ // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

//console.log(search)


fetch(`http://localhost:3248/alumnis/${search.get('id')}`)
 	.then(response => response.json())
 	.then(id => {
 		const img = new Image();	
		img.src = id.img
 		const nameElement = document.getElementById('block_starter')
		nameElement.innerHTML = (`
				<img src="${id.img}" id="profile.picture">
				<p class="name">${id.firstName} ${id.lastName}</p>
				<p>Session : ${id.campus} / ${id.dateSession}</p>
				<p>Specialisation : ${id.specialization}</p>
			`)
		const birth = new Date(id.birthDate)
	
		const detailsElement = document.getElementById('block_details')
		detailsElement.innerHTML = (`
				<p class="decriptionSentence">${id.decriptionSentence}</p>
				<p id="birthday">${_calculateAge(birth)} ans</p>
				<p>Langues: ${id.language}</p>
				<p>Mes passions : ${id.passions}</p>
			`)






		
	})
	