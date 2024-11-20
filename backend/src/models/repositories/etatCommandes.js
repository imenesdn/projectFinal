import { mapEtatCommande } from "../../utils.js";
import { getDatabaseConnection } from "../dbContext.js";

// get all commandes from database
export const getCommandeStates = async () => {
  const connection = await getDatabaseConnection();
  const etat_commandes = await connection.all("SELECT * FROM etat_commande");
  return etat_commandes.map((etat_commande) => mapEtatCommande(etat_commande));
};
