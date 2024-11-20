import { COMMAND_STATE } from "./utils.js";

/**
 * Check if the value is a number.
 * @param {number} value - The value to check.
 * @returns {boolean} - `true` if the value is a number, `false` otherwise.
 */
export const isNumberValide = (value) => {
  return (
    !isNaN(value) &&
    isFinite(value) &&
    typeof value === "number" &&
    value !== null &&
    value !== undefined
  );
};

/**
 * Check if the value is a positive number.
 * @param {number} value - The value to check.
 * @returns {boolean} - `true` if the value is a positive number, `false` otherwise.
 */
export const isIdentifierValide = (value) => {
  return isNumberValide(value) && value > 0;
};

/**
 * Check if the value is a positive number or zero.
 * @param {number} value - The value to check.
 * @returns
 */
export const isQuantityValide = (value) => {
  return isNumberValide(value) && value > 0;
};

/**
 * Check if the value is a positive number or zero.
 * @param {number} value - The value to check.
 * @returns
 */
export const isPriceValide = (value) => {
  return isNumberValide(value) && value >= 0;
};

/**
 * check if the value is a string.
 * @param {string} value - The value to check.
 * @returns {boolean} - `true` if the value is a string, `false` otherwise.
 */
export const isStringValide = (value) => {
  return typeof value === "string" && value !== null && value !== undefined;
};

/**
 * Check if the value is a non-empty string.
 * @param {string} value - The value to check.
 * @returns {boolean} - `true` if the value is a non-empty string, `false` otherwise.
 */
export const isNotEmptyString = (value) => {
  return isStringValide(value) && value.trim() !== "";
};

/**
 * Check if the value is a valid state.
 * @param {string} value - The value to check.
 * @returns {boolean} - `true` if the value is a valid state, `false` otherwise.
 */
export const isStateValide = (value) => {
  return Object.values(COMMAND_STATE).includes(value);
};

/**
 * Check if the value is a valid submitted state.
 * @param {string} value - The value to check.
 * @returns {boolean} - `true` if the value is a valid submitted state, `false` otherwise.
 */
export const isSubmittedStateValide = (value) => {
  return isStateValide(value) && value !== COMMAND_STATE.PANIER;
};

/**
 * Check if the value is a valid panier state.
 * @param {{nom: string, cheminImage: string, prix: number}} produit - The value to check.
 * @returns {boolean} - `true` if the value is a valid panier state, `false` otherwise.
 */
export const isProduitValid = (produit) => {
  return (
    isNotEmptyString(produit.nom) &&
    isNotEmptyString(produit.cheminImage) &&
    isPriceValide(produit.prix)
  );
};

/**
 * Check if the value is a valid produit panier association.
 * @param {{produitId: number, quantite: number}} produitPanier - The value to check.
 * @returns {boolean} - `true` if the value is a valid produit panier association, `false` otherwise.
 */
export const isProduitPanierValid = (produitPanier) => {
  return (
    isNumberValide(produitPanier.produitId) &&
    isNumberValide(produitPanier.quantite)
  );
};

/**
 *
 * @param {string} email l'email doit etre conforme au norme
 */
let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
export const isEmailValid = (email) => {
  return emailRegex.test(email);
};

/**
 *
 * @param {string} string le nom et prenom doivent etre des string
 */
let nameRegex = /^[a-zA-Z]{2,}$/;
export const isString = (string) => {
  return nameRegex.test(string);
};

/**
 *
 * @param {string} motPasse
 */
export const isMotPasseValid = (motPasse) => {
  return typeof motPasse === "string" && motPasse.length >= 8;
};
