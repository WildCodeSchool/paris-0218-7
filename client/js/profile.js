import { search } from './route.js'


console.log(search)


fetch(`http://localhost:3248/alumnis/${search.get('id')}`)
 	.then(response => response.json())
 	.then(id => {
 		const nbElement = document.getElementById('block_alumnis')
		nbElement.innerHTML = (`
				<p>${id.firstName} membres correspondent à votre recherche</p>
			`)
 	})

// console.log(location)


