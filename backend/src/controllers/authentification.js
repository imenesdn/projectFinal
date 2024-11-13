import passport from "passport";
import { createUtilisateur } from "../models/repositories/utilisateurs.js";
import { isEmailValid, isMotPasseValid, isString } from "../validator.js";
import { isUserConnected, isUserExist } from "./util.js";
import jwt from "jsonwebtoken";

export const postInscription = async (req, res, next) => {
  // if(isUserConnected(req.user) === true){
  //     return res.redirect('/menu');
  // }

  // On vérifie le le courriel et le mot de passe envoyé sont valides
  if (
    isEmailValid(req.body.email) &&
    isMotPasseValid(req.body.motPasse) &&
    isString(req.body.nom) &&
    isString(req.body.prenom)
  ) {
    try {
      // On vérifie si l'utilisateur existe déjà, si oui on retourne un code 409 (Conflict)
      if (await isUserExist(req.body.email)) {
        res.status(409).end();
        return;
      }
      // Si la validation passe, on crée l'utilisateur
      await createUtilisateur(
        req.body.nom,
        req.body.prenom,
        req.body.email,
        req.body.motPasse,
        1
      );
      res.status(201).end();
    } catch (error) {
      // Gestion des erreurs sql
      if (error.code === "SQLITE_CONSTRAINT") {
        res.status(409).end();
        return;
      } else {
        next(error);
      }
    }
  } else {
    res.status(400).end;
  }
};

export const postConnexion = (req, res, next) => {
  // Validation du courriel et le mot de passe envoyé
  if (isEmailValid(req.body.courriel) && isMotPasseValid(req.body.motDePasse)) {
    // On lance l'authentification avec passport.js
    passport.authenticate("local", (error, user, info) => {
      if (error) {
        // S'il y a une erreur, on la passe au serveur
        next(error);
      } else if (!user) {
        // Si la connexion échoue, on envoit l'information au client avec un code 401 (Unauthorized)
        res.status(401).json(info);
      } else {
        // Si tout fonctionne, on génère un JWT avec les données de l'utilisateur
        const token = jwt.sign({ ...user }, process.env.TOKEN_SECRET, {
          expiresIn: "2h",
        });
        // Retourne le JWT et les données de l'utilisateur
        res.status(200).json({ token, user });
      }
    })(req, res, next);
  } else {
    res.status(400).json({ error: "Invalid Credentials" });
  }
};

export const postDeconnexion = (req, res) => {
  if (!req.user) {
    return res.status(401).redirect("/connexion");
  } else {
    // Déconnecter l'utilisateur
    req.logout((err) => {
      if (err) {
        res.status(200).send();
        return;
      } else {
        res.redirect("/");
        return;
      }
    });
  }
};
