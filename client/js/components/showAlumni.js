export const showAlumnis = alumni => {
  return `
    <a href="profile.html?id=${alumni.id}" class="alumni" id="alumni-${alumni.id}">
      <div class="liste_alumnis">
        <img src="http://localhost:3248/images/${alumni.img}" id="image" class="img-members">
        <h4 id="prenom" class="member-name">${alumni.firstName} ${alumni.lastName}</h4>
        <p id="campus" class="campus-name">Campus: ${alumni.campus}</p>
      </div>
    </a>
  `
}
