import express from "express";
import {
  getCommandeByIdController,
  getCommandesController,
  setCommandeStateController,
} from "../controllers/commandes.js";
import { getCommandeStatesController } from "../controllers/etatCommandes.js";
import { authenticateToken } from "../middlewares/auth.js";

const commandRouter = express.Router();

// get commandes
commandRouter.get("/", authenticateToken, getCommandesController);

// get commande by id
commandRouter.get("/:id", authenticateToken, getCommandeByIdController);

// set commande state
commandRouter.patch("/:id", authenticateToken, setCommandeStateController);

commandRouter.get(
  "/api/etatCommandes",
  authenticateToken,
  getCommandeStatesController,
);
export default commandRouter;
