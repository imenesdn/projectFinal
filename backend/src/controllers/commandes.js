import { getCommandeById, getCommandes, setCommandeState } from '../models/repositories/commandes.js';
import { isIdentifierValide, isSubmittedStateValide } from '../validator.js';
import { isUserAdmin, isUserConnected } from './util.js';


/**
 * Get all submitted orders (commandes).
 * @param {Request} req - The request object.
 * @param {Response} res - The response object to send the list of orders.
 * @returns {void} - A response with the list of submitted orders.
 */
export const getCommandesController = async (req, res) => {
    // if user is not admin, return 401
    if(isUserConnected(req.user) === false){
        res.status(401).end();
        return;
    }

    // if user is not admin, return 403
    if(isUserAdmin(req.user) === false){
        res.status(403).end();
        return;
    }

    const commandes = await getCommandes();
    res.status(200).json(commandes);
};


/**
 * Get a specific order (commande) by its ID.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object to send the order information or an error message.
 * @returns {void} - A response with the order information if found, or an error message if the order doesn't exist.
 */
export const getCommandeByIdController =  async (req, res) => {
    // if user is not admin, return 401
    if(isUserConnected(req.user) === false){
        res.status(401).end();
        return;
    }

    // if user is not admin, return 403
    if(isUserAdmin(req.user) === false){
        res.status(403).end();
        return;
    }

    const commandeId = Number(req.params.id);

    if(! isIdentifierValide(commandeId)){
        res.status(400).json({ message: 'La valeur de l\'identifiant de la commande est invalide' });
        return;
    }

    const commande = await getCommandeById(commandeId);

    // if commande does not exist, return 404 (Not Found)
    if (commande === undefined) {
        res.status(404).json({ message: 'Commande Inexistant' });
        return;
    }

    res.status(200).json(commande);
};


/**
 * Set the state of a specific order (commande) by its ID.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object to send a success message or an error message.
 * @returns {void} - A response indicating the status of the order state change.
 */
export const setCommandeStateController = async (req, res) => {
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
    
    const commandeId = Number(req.params.id);
    const { stateId } = req.body;

    if(! isIdentifierValide(commandeId)){
        res.status(400).json({ message: 'La valeur de l\'identifiant de la commande est invalide' });
        return;
    }

    if (!isSubmittedStateValide(Number(stateId))) {
        res.status(400).json({ message: 'Etat de commande Invalide' });
        return;
    }

    // set commande state using commandes repository
    try {
        const isCommandFound = await setCommandeState(commandeId, Number(stateId));

        
        if (!isCommandFound) {
            res.status(404).json({ message: 'Commande Inexistante' });
            return;
        }else{
            res.pushJson({
                commande: (await getCommandes()).find(commande => commande.commandeId === commandeId),
                stateId: stateId
            }, 'update-commande');
        }

    } catch (e) {
        res.status(500).json({ message: 'Erreur interne au serveur' });
        return;
    }
    
    res.status(200).json({ message: 'Le status de la commande modifié' });
}
