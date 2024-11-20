// importation Toast pour les notifications
import { configureToasts, Toast } from "../lib/toaster-js/index.js";

configureToasts({
  topOrigin: 0,
  deleteDelay: 100,
});

const isformValid = (data) => {
  // validation cote client
  let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  let nameRegex = /^[a-zA-Z]{2,}$/;

  return (
    emailRegex.test(data.email) &&
    nameRegex.test(data.nom) &&
    nameRegex.test(data.prenom) &&
    typeof data.motPasse === "string" &&
    data.motPasse.length >= 8
  );
};

let inputNom = document.getElementById("input-nom");
let inputPrenom = document.getElementById("input-prenom");
let inputCourriel = document.getElementById("input-courriel");
let inputMotDePasse = document.getElementById("input-mot-passe");
let formInscription = document.getElementById("form_inscription");

const onFormSubmit = async (event) => {
  event.preventDefault();
  const data = {
    nom: inputNom.value,
    prenom: inputPrenom.value,
    email: inputCourriel.value,
    motPasse: inputMotDePasse.value,
  };

  if (!isformValid(data)) {
    return new Toast("formulaire non valide", "error");
  }

  let response = await fetch("/auth/inscription", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.status === 201) {
    // Si l'inscription est réussi, on
    // redirige vers la connexion
    new Toast("Inscription reussite.", "done");
    window.location.replace("/connexion");
    return;
  }

  if (response.status === 401) {
    // Si l'inscription  ne réussi pas, on
    // a le message d'erreur dans l'objet "data"
    let data = await response.json();
    new Toast("inscription non reussi", "error");
    return;
  }

  if (response.status === 409) {
    new Toast("utilisateur existe deja", "error");
  }
};

formInscription.addEventListener("submit", onFormSubmit);
