export const showAlumnis = alumni => {
  return `
    <a href="profile.html?id=${alumni.id}" id="alumni-${alumni.id}">
      <div class="liste_alumnis">
        <img src="http://localhost:3248/images/${alumni.img}" id="image">
        <h4 id="prenom">${alumni.firstName} ${alumni.lastName}</h4>
        <p id="campus">Campus: ${alumni.campus}</p>
      </div>
    </a>
  `
}
