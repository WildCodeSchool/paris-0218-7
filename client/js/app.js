fetch('http://localhost:3248/alumnis')
	.then(response => response.json())
	.then(alumnis => {
		const alumnisElement = document.getElementById('alumnis')
		alumnisElement.innerHTML = JSON.stringify(alumnis)
	})