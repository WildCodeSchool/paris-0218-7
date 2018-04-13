import { search } from './route.js'

const _calculateAge = (birthday) =>{ // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

fetch(`http://localhost:3248/alumnis/${search.get('id')}`)
 	.then(response => response.json())
 	.then(id => {
 		const img = new Image();	
		img.src = id.img
 		const nameElement = document.getElementById('block_starter')
		nameElement.innerHTML = (`
				<p class="name">${id.firstName} ${id.lastName}</p>
				<img src="${id.img}" id="profile.picture">
				<p class="decriptionSentence">${id.decriptionSentence}</p>
			`)
		const birth = new Date(id.birthDate)
	
		const detailsElement = document.getElementById('block_details')
		detailsElement.innerHTML = (`
				<p class="spe">Spécialisation : ${id.specialization}</p>
				<p class= "session">Session : ${id.campus} / ${id.dateSession}</p>
				
				<p id="birthday">Age : ${_calculateAge(birth)} ans</p>
				
				<p class= "langue">Langues: ${id.language}</p>
				<p class="hobby">Mes passions : ${id.passions}</p>
			`)
	})
	.catch(err => {
		const errorElement = document.getElementById('block_starter')
		errorElement.innerHTML = `Ce membre n'existe pas`
	})
	