// importation Toast pour les notifications
import { configureToasts, Toast } from "../lib/toaster-js/index.js";

configureToasts({
  topOrigin: 0,
  deleteDelay: 300,
});

//Section Modification de l'etat commande
// Fonction pour modifier l'état d'une commande
const modifierEtatCommande = async (commandeId, nouvelleValeur) => {
  const url = "/api/commandes/" + commandeId;

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stateId: nouvelleValeur,
      }),
    });

    if (response.ok) {
      new Toast("État de la commande modifié avec succès.", "done");
    } else if (response.status === 404) {
      new Toast("La commande avec l'ID spécifié n'existe pas", "warning");
    } else if (response.status === 400) {
      new Toast("L'état fourni n'est pas valide", "warning");
    } else {
      new Toast(
        "Erreur lors de la modification de l'état de la commande",
        "error",
      );
    }
  } catch (error) {
    new Toast(`Erreur inattendue : ${error}`, "error");
    console.error(`Erreur inattendue : ${error}`);
  }
};

// Preparation et exacuter la requette de modification quand un changement d'option est detecter
const modifierSelection = async (selectElements) => {
  selectElements.forEach((selectElement) => {
    // Ajoutez un gestionnaire d'événements pour capturer le changement des options
    selectElement.addEventListener("change", async (event) => {
      // Accédez à la valeur sélectionnée
      const nouvelleValeur = parseInt(event.target.value);
      // Récupérer l id de la commande
      const commandeId = parseInt(
        selectElement.id.replace("selectEtatCommande_", ""),
      );
      modifierEtatCommande(commandeId, nouvelleValeur);
    });
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  // Sélection de tous les éléments select
  const selectElements = document.querySelectorAll("select");
  //Fonction qui detecte les changements dans les etats des commandes
  modifierSelection(selectElements);
});

const createHTMLCommande = (commande, etatCommande) => {
  // Création d'un élément de liste <li> pour représenter une commande
  const commandeLi = document.createElement("li");
  commandeLi.dataset.id = commande.commandeId;

  // Création de trois éléments <div> pour afficher les détails de la commande

  // Affichage de l'identifiant de la commande
  const numeroCommandeItem = document.createElement("div");
  numeroCommandeItem.classList.add("grid-item");
  numeroCommandeItem.textContent = `Commande #${commande.commandeId}`;

  // Affichage de l'identifiant de l'utilisateur associé à la commande
  const UserIdItem = document.createElement("div");
  UserIdItem.classList.add("grid-item");
  UserIdItem.textContent = `Utilisateur #${commande.utilisateurId}`;

  // Affichage de la date de la commande
  const dateCommandeItem = document.createElement("div");
  dateCommandeItem.classList.add("grid-item");
  dateCommandeItem.textContent = commande.date;

  // Création d'un élément <select> pour modifier l'état de la commande
  const etatCommandeSelect = document.createElement("select");
  etatCommandeSelect.classList.add("grid-item", "select");
  // Attribution d'un nom au sélecteur
  etatCommandeSelect.name = "etatCommande";
  // Attribution d'un ID unique au sélecteur en fonction de l'ID de la commande
  etatCommandeSelect.id = `selectEtatCommande_${commande.commandeId}`;

  // Ajout d'un écouteur d'événements pour détecter les changements dans le sélecteur
  etatCommandeSelect.addEventListener("change", async (event) => {
    const nouvelleValeur = parseInt(event.target.value);
    const commandeId = parseInt(
      etatCommandeSelect.id.replace("selectEtatCommande_", ""),
    );
    modifierEtatCommande(commandeId, nouvelleValeur);
  });

  // Parcours de chaque élément dans etatCommande pour créer une option dans le sélecteur
  etatCommande.forEach((element) => {
    // Création d'une option pour le sélecteur
    const selectOption = document.createElement("option");
    selectOption.value = element.etatCommandeId; // Attribution de la valeur de l'état de commande à l'option
    selectOption.textContent = element.nom; // Attribution du nom de l'état de commande à l'option

    // si la valeur de l'élément correspond à l'état de la commande actuelle
    if (element.value === commande.etatCommandeId) {
      selectOption.selected = true;
    }

    // Ajout de l'option créée au sélecteur
    etatCommandeSelect.appendChild(selectOption);
  });

  // Sélection de la valeur de l'état de la commande dans le sélecteur
  etatCommandeSelect.value = commande.etatCommandeId;

  // Ajout des éléments créés à l'élément de liste représentant la commande
  commandeLi.appendChild(numeroCommandeItem);
  commandeLi.appendChild(UserIdItem);
  commandeLi.appendChild(dateCommandeItem);
  commandeLi.appendChild(etatCommandeSelect);

  // Retourne l'élément de liste contenant tous les détails de la commande
  return commandeLi;
};

const addHTMLCommande = (commande, etatCommande) => {
  const commandeLi = createHTMLCommande(commande, etatCommande);
  const commandeUl = document.querySelector(".listCommandes");
  commandeUl.appendChild(commandeLi);
};

const modifierHTMLCommande = (commande, etatCommande) => {
  const optionEtatCommande = document.getElementById(
    `selectEtatCommande_${commande.commandeId}`,
  );
  optionEtatCommande.value = etatCommande;
};

// Ouverture du canal SSE
let source = new EventSource("/api/stream");

source.addEventListener("add-commande", (event) => {
  const data = JSON.parse(event.data);
  addHTMLCommande(data.commande, data.etatCommande);
});

source.addEventListener("update-commande", (event) => {
  const data = JSON.parse(event.data);
  modifierHTMLCommande(data.commande, data.stateId);
});
