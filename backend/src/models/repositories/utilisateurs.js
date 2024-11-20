import { getDatabaseConnection } from "../dbContext.js";
import bcrypt from "bcrypt";

/**
 * Get the user having a specific email from database
 * @param {string} email - The email of the user.
 * @returns {Promise<{utilisateurId: number, idTypeUtilisateur: number, nom: string, prenom: string, email: string, motDePasseEncrypte: string} | undefined>} - The user having the email email, or `undefined` if the user does not exist.
 */
export async function getUtilisateurByEmail(email) {
  const connection = await getDatabaseConnection();
  const utilisateur = await connection.get(
    "SELECT * FROM utilisateur WHERE courriel = ?",
    [email],
  );
  return utilisateur;
}

/**
 * Get the user having a specific id from database
 * @param {INTEGER} id - The id of the user.
 * @returns {Promise<{utilisateurId: number,idTypeUtilisateur: number, nom: string, prenom: string, email: string, motDePasseEncrypte: string} | undefined>} - The user having the id id, or `undefined` if the user does not exist.
 */
export async function getUtilisateurById(id) {
  const connection = await getDatabaseConnection();
  const utilisateur = await connection.get(
    "SELECT * FROM utilisateur WHERE id_utilisateur = ?",
    [id],
  );
  return utilisateur;
}

/**
 * Create a user in the database
 * @param {string} nom - The name of the user.
 * @param {string} prenom - The first name of the user.
 * @param {string} email - The email of the user.
 * @param {string} motPasse - The password of the user.
 * @param {number} idTypeUtilisateur - The type of the user.
 * @returns {Promise<{utilisateurId: number, idTypeUtilisateur: number, nom: string, prenom: string, email: string, motDePasseEncrypte: string}>} - The ID of the created user.
 */
export async function createUtilisateur(
  nom,
  prenom,
  email,
  motPasse,
  idTypeUtilisateur,
) {
  const connection = await getDatabaseConnection();

  let motDePasseEncrypte = await bcrypt.hash(motPasse, 10);
  const response = await connection.run(
    "INSERT INTO utilisateur(nom, prenom, courriel, mot_de_passe, id_type_utilisateur) VALUES(?, ?, ?, ?, ?)",
    [nom, prenom, email, motDePasseEncrypte, idTypeUtilisateur],
  );
  return response.lastID;
}
