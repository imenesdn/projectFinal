import express from "express";
import { getCommandeStatesController } from "../controllers/etatCommandes.js";

const commandeStatesRouter = express.Router();

// get commandes
commandeStatesRouter.get("/", getCommandeStatesController);

export default commandeStatesRouter;
