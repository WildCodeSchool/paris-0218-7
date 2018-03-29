fetch('http://localhost:3248/alumnis')
	.then(response => response.json())
	.then(alumnis => {



		console.log(alumnis)
	})