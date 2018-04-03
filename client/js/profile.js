import { search } from './route.js'


console.log(search)


fetch(`http://localhost:3248/alumnis/${search.get('id')}`)
 	.then(response => response.json())
 	.then(personne => {

 	})

console.log(location)