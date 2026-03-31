const API_URL = "https://script.google.com/macros/s/AKfycbzFf8I3nPQBBZVy9VApgwcO0JxD2CAVlczJaICk_TEkxVOspq2Q735RwGlR2DcKcXfyoA/exec";
// Envoi du formulaire
const form = document.getElementById("dispoForm");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const pseudo = document.getElementById("pseudo").value;
    const commentaire = document.getElementById("commentaire").value;

    const dispos = [...document.querySelectorAll("input[type=checkbox]:checked")]
      .map(c => c.value);

    const payload = { pseudo, dispos, commentaire };

    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    document.getElementById("status").innerText =
      "Disponibilités envoyées ! Merci soldat.";
  });
}

// Récupération des données
const table = document.getElementById("tableDispos");
if (table) {
  fetch(API_URL)
    .then(r => r.json())
    .then(data => {
      const tbody = table.querySelector("tbody");
      data.forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${new Date(row.date).toLocaleString()}</td>
          <td>${row.pseudo}</td>
          <td>${row.dispos}</td>
          <td>${row.commentaire}</td>
        `;
        tbody.appendChild(tr);
      });
    });
}