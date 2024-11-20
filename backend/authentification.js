import bcrypt from 'bcrypt';
import passport from "passport";
import { Strategy } from "passport-local";
import { getUtilisateurByEmail } from "./src/models/repositories/utilisateurs.js";

// Configuration générale de la stratégie.
const config = {
  usernameField: 'courriel',
  passwordField: 'motDePasse'
};


passport.use(new Strategy(config, async (email, motPasse, done) => {

  try {

      // On va chercher l'utilisateur dans la base de données avec son email
      const utilisateur = await getUtilisateurByEmail(email);

      // Si on ne trouve pas l'utilisateur, on retourne que l'authentification a échoué avec un message
      if (!utilisateur) {
          return done(null, false, { error: 'mauvais_utilisateur' });
      }

      // On compare le mot de passe de l utilisateur dans la base de données avec celui envoyé au serveur.
      const valide = await bcrypt.compare(motPasse, utilisateur.mot_de_passe);

      // Si le mot de passe ne concorde pas, on retourne que l'authentification a échoué avec un message
      if (!valide) {
          return done(null, false, { error: 'mauvais_mot_de_passe' });
      }

      // Si le mot de passe concorde, on retourne l'information de l'utilisateur au serveur
      return done(null, utilisateur);
  }
  catch (error) {
      return done(error);
  }
}));

passport.serializeUser((utilisateur, done) => {
  // On mets uniquement le courriel dans la session

  done(null, utilisateur.courriel);
});


passport.deserializeUser(async (email, done) => {

  try {
      // Recuperer l'utilisateur de la base de données avec son email.
      const utilisateur = await getUtilisateurByEmail(email);
      done(null, utilisateur);
  }
  catch (error) {
      done(error);
  }
});
