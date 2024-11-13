// importation Toast pour les notifications
import {configureToasts, Toast} from "../lib/toaster-js/index.js";
 
configureToasts({
    topOrigin: 0,
    deleteDelay: 100
});

// Fonction pour commander un produit apartir du menu
const commanderProduit= async (bouton)=>{
    // Optenir l'ID du produit à partir de l'ID du bouton
    const produitId = parseInt(bouton.id.replace("_btn", ""));
    // Ajouter le produit dans le panier
    try {
      const response = await fetch("/api/panier/produit", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          produitId,
          quantite: 1,
        }),
      });

      if (response.status === 201) {
        new Toast("Produit ajouté au panier avec succès.","done");
      } else if (response.status === 409) {
        new Toast("Le produit est déjà dans le panier, modifiez la quantite directement dans le panier","warning");
      } else if (response.status === 404) {
        new Toast("Le produit n'existe pas.","error");
      } else if (response.status === 400) {
        new Toast("Quantité invalide (<= 0).","error");
      } 
    } catch (error) {
      new Toast(`Erreur inattendue : ${error}`,"error");
      console.error(`Erreur inattendue : ${error}`);
    }
};


// Attendez que le DOM soit prêt
document.addEventListener("DOMContentLoaded", () => {

  // Sélectionnez tous les boutons d'achat
  const acheterBoutons = document.querySelectorAll(".acheterMenu");

  // Gestionnaire d'événements à chaque bouton
  acheterBoutons.forEach((bouton) => {
    bouton.addEventListener("click", async (event) => {
      event.preventDefault();
      commanderProduit(bouton);
    });
  });
  });