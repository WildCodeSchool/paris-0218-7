export const showAlumnis = alumni => {
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
