// importation Toast pour les notifications
import {configureToasts, Toast} from "../lib/toaster-js/index.js";
configureToasts({
    topOrigin: 0,
    deleteDelay: 300
});

//fonction pour decrementer la quantité d'un produit avec le bouton (+)
const decrementerQuantite = (produitId) => {
  const quantiteInput = document.getElementById(`quantite_${produitId}`);
  let quantiteActuelle = parseInt(quantiteInput.value);
  if (quantiteActuelle > 1) {
    quantiteActuelle--;
    quantiteInput.value = quantiteActuelle;
  }
};


//fonction pour incrementer la quantité d'un produit avec le bouton (-)
const incrementerQuantite = (produitId) => {
  const quantiteInput = document.getElementById(`quantite_${produitId}`);
  let quantiteActuelle = parseInt(quantiteInput.value);
  quantiteActuelle= quantiteActuelle+1 ;
  quantiteInput.value = quantiteActuelle;
};


//fonction pour changer la quantité d'un produit directement dans l'input de la quantité
const changerQuantite = (produitId) => {
  const quantiteInput = document.getElementById(`quantite_${produitId}`);
  let quantiteActuelle = parseInt(quantiteInput.value);
  if (isNaN(quantiteActuelle) || quantiteActuelle <= 0) {
    quantiteActuelle = 1;
  }
  quantiteInput.value = quantiteActuelle;
};

//fonction pour la mise a jour de la quantité d'un produit
const miseAJourPanier = async (produitId, nouvelleQuantite) => {

  try {
    const url = "/api/panier/produit/" + produitId;
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        quantite: nouvelleQuantite,
      }),
    });
    if (response.ok) {

      new Toast("La quantité est modifiée avec succès.","done");
      setTimeout(function() {
        window.location.reload();
    }, 2000);

    } else if (response.status == 404) {
      new Toast("L'élément ou le panier n'existe pas.","warning");

    } else if (response.status == 400) {
      new Toast("Quantité invalide (<= 0).","error");
    }
  } catch (error) {
    new Toast(`Erreur inattendue : ${error}`,"error");
    console.error(`Erreur inattendue : ${error}`);
    return null;
  }
  
};
//Fin Section pour manipuler la quantité d'un produit
// Section pour manipuler le panier
//fonction pour supprimer un panier
const SupprimerPanier = async (produitId) => {
  event.preventDefault();
  try {
    const response = await fetch("/api/panier/", {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        produitId: produitId,
      }),
    });
    if (response.ok) {
      new Toast("L'élément est supprimé avec succès.","done");
      setTimeout(function() {
        window.location.reload();
    }, 2000);
    } else if (response.status == 404) {
      new Toast("L'élément ou le panier n'existe pas.","warning");
    }
  } catch (error) {
    new Toast(`Erreur inattendue : ${error}`,"error");
    console.error(`Erreur inattendue : ${error}`);
    return null;
  }
};


//fonction pour Supprimer un produit du panier
const SupprimerProduit = async (produitId) => {
  event.preventDefault();
  try {
    const response = await fetch("/api/panier/produit/" + produitId, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    if (response.ok) {
      new Toast("le produit est supprimé du panier.","done");
      setTimeout(function() {
        window.location.reload();
    }, 2000);
    } else if (response.status == 404) {
      new Toast("Le produit n'existe pas dans le panier.","warning");
    }
  } catch (error) {
    new Toast(`Erreur inattendue : ${error}`,"error");
    console.error(`Erreur inattendue : ${error}`);
    return null;
  }
};
// Fin Section pour manipuler le panier

//Soumettre le panier / Creer une commande
const soumettrePanier = async()=>{
  event.preventDefault();

  try {
    const response = await fetch('/api/panier/soumettre', {
      method: "PATCH",
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
    });
    if (response.ok) {
      new Toast("le panier est soumis.","done");
      setTimeout(function() {
        window.location.reload();
    }, 2000);
      } else if (response.status == 404) {
        new Toast("Le panier est vide ou n'existe pas..","warning");
    }
  } catch (error) {
    new Toast(`Erreur inattendue : ${error}`,"error");
    console.error(`Erreur inattendue : ${error}`);
    return null;
  }
}
//Attendez que le DOM soit prêt
document.addEventListener("DOMContentLoaded", () => {
  //Sélectionnez tous les boutons (X) qui permettent la suppression d'un produit spécifique dans le panier.
  const supprimerProduitPanier = document.querySelectorAll(".suprimerProduit");
  //Supprimer un produi du panier
  supprimerProduitPanier.forEach((bouton) => {
    bouton.addEventListener("click", async function () {
      const produitId = parseInt(bouton.id.replace("supProduit_", ""));
      SupprimerProduit(produitId);
    });
  });
  //Sélectionnez tous les boutons (miseAjour) qui permettent de faire la mise a jour les données du panier
  const miseAJourbtn = document.querySelectorAll(".miseAjour");
  //Mettre à jour les données du panier selon la nouvelle quantité du produit.
  miseAJourbtn.forEach((bouton) => {
    bouton.addEventListener("click", async function () {
      const produitId = parseInt(bouton.id.replace("miseAJour_", ""));
      const nouvelleQuantite = parseInt(
        document.getElementById("quantite_" + produitId).value
      );
      await miseAJourPanier(produitId, nouvelleQuantite);
    });
  });

    //Sélectionnez le bouton Effacer le panier par son ID
    const effacerPanierBtn = document.getElementById("effacerPanierBtn");
    // Effacer le panier au complet
    effacerPanierBtn.addEventListener("click", async function () {
      await SupprimerPanier();
    });

    //Sélectionnez les boutons de plus et moins quantité
    const quantiteBtns = document.querySelectorAll(".quantite-btn");
    quantiteBtns.forEach((bouton) => {
      bouton.addEventListener("click", (event) =>  {
        event.preventDefault();
        // Optenir l'ID du produit à partir de l'ID du bouton
        if (bouton.id.includes("moinsBtn_")) {
          const produitId = parseInt(bouton.id.replace("moinsBtn_", ""));
          decrementerQuantite(produitId);
        } else if (bouton.id.includes("plusBtn_")) {
          const produitId = parseInt(bouton.id.replace("plusBtn_", ""));
          incrementerQuantite(produitId);
        }
      });
    });

    //Sélectionnez les inputs de la quantité
    const quantiteInputs = document.querySelectorAll(".quantite-input");
    quantiteInputs.forEach((input) => {
      input.addEventListener("change", (event) => {
        const produitId = parseInt(input.id.replace("quantite_", ""));
        changerQuantite(produitId);
      });
    });

  // Section faire une commande
  const payer = document.getElementById("payer");
  payer.addEventListener("click",()=>{
    soumettrePanier();
  });
});
