import express from "express";
import {
  postConnexion,
  postDeconnexion,
  postInscription,
} from "../controllers/authentification.js";
import { authenticateToken } from "../middlewares/auth.js";

const authenticationRouter = express.Router();

// post the data of inscription
authenticationRouter.post("/inscription", postInscription);

//  post the data of connexion
authenticationRouter.post("/connexion", postConnexion);

// disconnect the user
authenticationRouter.post("/deconnexion", postDeconnexion);

authenticationRouter.get("/user", authenticateToken, (req, res) =>
  res.status(200).json(req.user),
);

export default authenticationRouter;
