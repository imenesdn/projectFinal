import { getCommandeStates } from "../models/repositories/etatCommandes.js";
import { isUserAdmin, isUserConnected } from "./util.js";

export const getCommandeStatesController = async (req, res) => {
  // if user is not admin, return 401
  if (isUserConnected(req.user) === false) {
    res.status(401).end();
    return;
  }

  // if user is not admin, return 403
  if (isUserAdmin(req.user) === false) {
    res.status(403).end();
    return;
  }

  const commandes = await getCommandeStates();
  res.status(200).json(commandes);
};
