import {
  createProduitInPanier,
  deleteProduitFromPanier,
  getProduitsByCommandeId,
  setProduitQuantityFromPanier,
} from "../models/repositories/commande_produits.js";
import {
  createPanier,
  deletePanier,
  getCommandes,
  getPanierByUserId,
  setPanierStateToCuisine,
} from "../models/repositories/commandes.js";
import {
  isPanierEmpty,
  isProduitExist,
  isProduitInPanier,
  isUserConnected,
} from "./util.js";
import {
  isIdentifierValide,
  isProduitPanierValid,
  isQuantityValide,
} from "../validator.js";
import { getCommandeStates } from "../models/repositories/etatCommandes.js";
import { COMMAND_STATE } from "../utils.js";

/**
 * Retrieve the contents of the active user's shopping cart (panier).
 * @param {Request} req - The request object.
 * @param {Response} res - The response object to send the products in the shopping cart or an empty array.
 * @returns {Promise<void>} - A promise for handling the asynchronous retrieval of shopping cart contents.
 */
export const getPanierController = async (req, res) => {
  // if user is not connected, return 401
  if (isUserConnected(req.user) === false) {
    res.status(401).end();
    return;
  }

  // get panier using commandes repository
  if (req.user.id_utilisateur === undefined) {
    res.status(401).end();
  }
  const userId = req.user.id_utilisateur;
  let panier = await getPanierByUserId(userId);
  let panierProduits = [];

  // if panier not exist, create panier
  if (panier !== undefined) {
    panierProduits = await getProduitsByCommandeId(panier.commandeId);
  }

  let total = 0;
  panierProduits = panierProduits.map((panierProduit) => {
    const prixTotal = panierProduit.produit.prix * panierProduit.quantite;
    total += prixTotal;
    return {
      ...panierProduit,
      prixTotal: panierProduit.produit.prix * panierProduit.quantite,
    };
  });

  res.status(200).json(panierProduits);
};

/**
 * Delete the active user's shopping cart (panier) and its contents.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object to send a success message or an error message.
 * @returns {Promise<void>} - A promise for handling the asynchronous deletion of the shopping cart and its contents.
 */
export const deletePanierController = async (req, res) => {
  // if user is not connected, return 401
  if (isUserConnected(req.user) === false) {
    res.status(401).end();
    return;
  }

  const userId = req.user.id_utilisateur;
  let panier = await getPanierByUserId(userId);

  // if panier not exist, return 404
  if (panier === undefined) {
    res.status(404).json({ message: "Panier Inexistant" });
    return;
  }
  try {
    // delete all produits from panier
    const produits_panier = await getProduitsByCommandeId(panier.commandeId);
    for (const produit_panier of produits_panier) {
      const deletedId = await deleteProduitFromPanier(
        panier.commandeId,
        produit_panier.produit.produitId,
      );
    }

    // delete panier
    await deletePanier(panier.commandeId);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du panier" });
    return;
  }
  res.status(200).json({ message: "Panier supprimé" });
};

/**
 * Submit the active user's shopping cart (panier) for processing.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object to send a success message or an error message.
 * @returns {Promise<void>} - A promise for handling the asynchronous submission of the shopping cart.
 */
export const soumettrePanierController = async (req, res) => {
  // if user is not connected, return 401
  if (isUserConnected(req.user) === false) {
    res.status(401).end();
    return;
  }

  const userId = req.user.id_utilisateur;
  let panier = await getPanierByUserId(userId);

  // if panier not exist, return 404
  if (panier === undefined) {
    res.status(404).json({ message: "Panier Inexistant" });
    return;
  }

  // if panier is empty, return 404
  if (await isPanierEmpty(panier.commandeId)) {
    res.status(404).json({ message: "Panier vide" });
    return;
  }

  try {
    await setPanierStateToCuisine(panier.commandeId);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la soumission du panier" });
    return;
  }

  res.pushJson(
    {
      commande: (await getCommandes()).find(
        (commande) => commande.commandeId === panier.commandeId,
      ),
      etatCommande: (await getCommandeStates()).filter(
        (state) => state.etatCommandeId !== COMMAND_STATE.PANIER,
      ),
    },
    "add-commande",
  );
  res.status(200).json({ message: "Panier soumis" });
};

/**
 * Add a product to the user's shopping cart (panier).
 * @param {Request} req - The request object.
 * @param {Response} res - The response object to send success or error messages.
 * @returns {void} - A response with appropriate status codes and messages.
 */
export const addProduitToPanierController = async (req, res) => {
  // if user is not connected, return 401
  if (isUserConnected(req.user) === false) {
    res.status(401).end();
    return;
  }

  if (!isProduitPanierValid(req.body)) {
    res.status(400).json({ message: "Les Paramettres sont invalides" });
    return;
  }

  const { produitId, quantite } = req.body;

  const userId = req.user.id_utilisateur;
  let panier = await getPanierByUserId(userId);
  let panierId = 0;

  // if panier not exist, create panier
  if (panier === undefined) {
    panierId = await createPanier(userId);
  } else {
    panierId = panier.commandeId;
  }

  if (!(await isProduitExist(produitId))) {
    res.status(404).json({ message: "Produit Inexistant" });
    return;
  }

  // if produit already in panier, return 409 (Conflict)
  if (await isProduitInPanier(produitId, panierId)) {
    res.status(409).json({ message: "Produit déjà dans le panier" });
    return;
  }

  // create produit to panier using commandes repository
  try {
    await createProduitInPanier(panierId, produitId, quantite);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création du produit" });
    return;
  }

  res.status(201).json({ message: "Produit ajouté au panier" });
};

/**
 * Set the quantity of a product in the user's shopping cart (panier).
 * @param {Request} req - The request object.
 * @param {Response} res - The response object to send success or error messages.
 * @returns {void} - A response with appropriate status codes and messages.
 */
export const setProduitQuantityInPanierController = async (req, res) => {
  // if user is not connected, return 401
  if (isUserConnected(req.user) === false) {
    res.status(401).end();
    return;
  }

  const produitId = Number(req.params.id);
  const { quantite } = req.body;

  if (!isIdentifierValide(produitId)) {
    res
      .status(400)
      .json({ message: "La valeur de l'identifiant du produit est invalide" });
    return;
  }

  if (!isQuantityValide(quantite)) {
    res.status(400).json({ message: "La valeur de la quantité est invalide" });
    return;
  }

  const userId = req.user.id_utilisateur;
  let panier = await getPanierByUserId(userId);

  // if panier not exist, return 404
  if (panier === undefined) {
    res.status(404).json({ message: "Panier Inexistant" });
    return;
  }

  const isProduitInPanier = await setProduitQuantityFromPanier(
    panier.commandeId,
    produitId,
    quantite,
  );

  if (!isProduitInPanier) {
    res.status(404).json({ message: "Produit inexistant dans le panier" });
    return;
  }

  res.status(200).json({ message: "Quantité modifiée" });
};

/**
 * Delete a product from the user's shopping cart (panier).
 * @param {Request} req - The request object.
 * @param {Response} res - The response object to send success or error messages.
 * @returns {void} - A response with appropriate status codes and messages.
 */
export const deleteProduitFromPanierController = async (req, res) => {
  // if user is not connected, return 401
  if (isUserConnected(req.user) === false) {
    res.status(401).end();
    return;
  }

  const produitId = Number(req.params.id);
  const userId = req.user.id_utilisateur;

  if (!isIdentifierValide(produitId)) {
    res
      .status(409)
      .json({ message: "La valeur de l'identifiant du produit est invalide" });
    return;
  }

  let panier = await getPanierByUserId(userId);

  // if panier not exist, return 404
  if (panier === undefined) {
    res.status(404).json({ message: "Panier Inexistant" });
    return;
  }

  const isProduitInPanier = await deleteProduitFromPanier(
    panier.commandeId,
    produitId,
  );

  // if produit not in panier, return 404
  if (!isProduitInPanier) {
    res.status(404).json({ message: "Produit inexistant dans le panier" });
    return;
  }

  res.status(200).json({ message: "Produit supprimé" });
};
