import { getProduits, createProduit, deleteProduit, getProduitById } from '../models/repositories/produits.js';
import { isIdentifierValide, isProduitValid } from '../validator.js';


/**
 * Retrieve the list of all products.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} - A promise to handle asynchronous retrieval of products.
 */
export const getProduitsController = async (req, res) => {
  const produits = await getProduits();
  res.status(200).json(produits);
};


/**
 * Retrieve a product by its ID.
 * @param {Request} req - The request object containing the product ID as a parameter.
 * @param {Response} res - The response object to send the retrieved product or an error message.
 * @returns {Promise<void>} - A promise for handling asynchronous retrieval of the product.
 */
export const getProduitByIdController = async (req, res) => {
    const produitId = Number(req.params.id);

    if(! isIdentifierValide(produitId)){
        res.status(400).json({ message: 'La valeur de l\'identifiant du produit est invalide' });
        return;
    }

    const produit = await getProduitById(produitId);

    // if produit does not exist, return 404 (Not Found)
    if (produit === undefined) {
        res.status(404).json({ message: 'Produit Inexistant' });
        return;
    }

    res.status(200).json(produit);
};


/**
 * Create a new product.
 * @param {Request} req - The request object containing the product data in the request body.
 * @param {Response} res - The response object to send the newly created product or an error message.
 * @returns {Promise<void>} - A promise for handling the asynchronous creation of the product.
 */
export const createProduitController = async (req, res) => {
    // if user is not connected, return 401
    if(isUserConnected(req.user) === false){
        res.status(401).end();
        return;
    }

    // if user is not admin, return 403
    if(isUserAdmin(req.user) === false){
        res.status(403).end();
        return;
    }
    
    if(! isProduitValid(req.body)){
        res.status(400).json({ message: 'Le produit est invalide' });
        return;
    }

    const { nom, cheminImage, prix } = req.body;
    const produit = await createProduit(nom, cheminImage, prix);
    res.status(201).json(produit);
};


/**
 * Delete a product by its ID.
 * @param {Request} req - The request object containing the product ID as a parameter.
 * @param {Response} res - The response object to send a success message or an error message.
 * @returns {Promise<void>} - A promise for handling the asynchronous deletion of the product.
 */
export const deleteProduitController = async (req, res) => {
    // if user is not connected, return 401
    if(isUserConnected(req.user) === false){
        res.status(401).end();
        return;
    }

    // if user is not admin, return 403
    if(isUserAdmin(req.user) === false){
        res.status(403).end();
        return;
    }
    
    const produitId = Number(req.params.id);

    if(! isIdentifierValide(produitId)){
        res.status(400).json({ message: 'La valeur de l\'identifiant du produit est invalide' });
        return;
    }

    try {
        await deleteProduit(produitId);

    }catch (e) {
        res.status(404).json({ message: 'Produit Inexistant' });
        return;

    }

    res.status(200).json({ message: 'Produit supprimé'});
};
