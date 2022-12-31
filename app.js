const displayform = document.getElementById("displayform");
const recommencer = document.getElementById("recommencer");
const enregistrer = document.getElementById("enregistrer");
displayform.addEventListener("click", showform);

function showform() {
  document.querySelector(".form-wapper .card-body").classList.toggle("show");
}

//class employe

class Employe {
  constructor(
    nom,
    prenom,
    adresse,
    telephone,
    email,
    poste,
    datenaissance,
    dateembauche
  ) {
    this.nom = nom;
    this.prenom = prenom;
    this.adresse = adresse;
    this.telephone = telephone;
    this.email = email;
    this.poste = poste;
    this.datenaissance = datenaissance;
    this.dateembauche = dateembauche;
  }
}
//localstorage
class Store {
  static getEmployes() {
    let employes;

    if (localStorage.getItem("employes") === null) {
      employes = [];
    } else {
      employes = JSON.parse(localStorage.getItem("employes"));
    }
    return employes;
  }
  static addEmploye(employe) {
    const employes = Store.getEmployes();
    employes.push(employe);
    localStorage.setItem("employes", JSON.stringify(employes));
  }
  static removeEmploye(nom) {
    const employes = Store.getEmployes();
    employes.forEach((employe, index) => {
      if (employe.nom === nom) {
        employes.splice(index, 1);
      }
    });
    localStorage.setItem("employes", JSON.stringify(employes));
  }
}

class UI {
  static displayEmployes() {
    const employes = Store.getEmployes();

    employes.forEach((employe) => UI.addEmployeToList(employe));
  }
  static addEmployeToList(employe) {
    const maliste = document.getElementById("listeemploye");
    const row = document.createElement("tr");
    row.innerHTML = `

    <td>${employe.nom}</td>
    <td>${employe.prenom}</td>
    <td>${employe.adresse}</td>
    <td>${employe.telephone}</td>
    <td>${employe.email}</td>
    <td>${employe.poste}</td>
    <td>${employe.datenaissance}</td>
    <td>${employe.dateembauche}</td>
    <td>
      <a href="#" class="btn btn-danger btn-sm delete">X</a>
    </td>
   
    `;
    maliste.appendChild(row);
  }

  static clearFields() {
    document.getElementById("nom").value = "";
    document.getElementById("prenom").value = "";
    document.getElementById("adresse").value = "";
    document.getElementById("telephone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("poste").value = "";
    document.getElementById("datenaissance").value = "";
    document.getElementById("dateembauche").value = "";
  }
  static showAlert(message, classNanme) {
    const div = document.createElement("div");

    div.className = ` alert alert-${classNanme}`;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector(".container");
    const form = document.getElementById("formajout");
    container.insertBefore(div, form);

    // supprimer alerte apres 5 secondes
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 5000);
  }
  static deleteEmploye(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }
}
//display employe
document.addEventListener("DOMContentLoaded", UI.displayEmployes());

//remove employe
document.querySelector("#listeemploye").addEventListener("click", function (e) {
  UI.deleteEmploye(e.target);
  Store.removeEmploye(
    e.target.parentElement.previousElementSibling.textContent
  );
  UI.showAlert("EMPLOYE SUPPRIME AVEC SUCCESS!!", "success");
});

//addind employe

document.addEventListener("submit", function (e) {
  e.preventDefault();

  const nom = document.querySelector("#nom").value;
  const prenom = document.querySelector("#prenom").value;
  const adresse = document.querySelector("#adresse").value;
  const telephone = document.querySelector("#telephone").value;
  const email = document.querySelector("#email").value;
  const poste = document.querySelector("#poste").value;
  const datenaissance = document.querySelector("#datenaissance").value;
  const dateembauche = document.querySelector("#dateembauche").value;
  if (
    nom === "" ||
    prenom === "" ||
    adresse === "" ||
    telephone === "" ||
    email === "" ||
    poste === "" ||
    datenaissance === "" ||
    dateembauche === ""
  ) {
    UI.showAlert("veuillez remplir tous les champs!", "danger");
  } else {
    const employe = new Employe(
      nom,
      prenom,
      adresse,
      telephone,
      email,
      poste,
      datenaissance,
      dateembauche
    );
    UI.addEmployeToList(employe);

    Store.addEmploye(employe);
    UI.showAlert("EMPLOYE ENREGISTRE AVEC SUCCES!!");
    UI.clearFields();
  }
});
