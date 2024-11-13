import express from "express";
import {
  addProduitToPanierController,
  deletePanierController,
  deleteProduitFromPanierController,
  getPanierController,
  setProduitQuantityInPanierController,
  soumettrePanierController,
} from "../controllers/paniers.js";
import { authenticateToken } from "../middlewares/auth.js";

const panierRouter = express.Router();

// get panier by user id
panierRouter.get("/", authenticateToken, getPanierController);

// delete panier
panierRouter.delete("/", authenticateToken, deletePanierController);

// soumettre panier
panierRouter.patch("/soumettre", authenticateToken, soumettrePanierController);

// add produit to panier
panierRouter.post("/produit", authenticateToken, addProduitToPanierController);

// set produit quantity in panier
panierRouter.patch(
  "/produit/:id",
  authenticateToken,
  setProduitQuantityInPanierController
);

// delete produit from panier
panierRouter.delete(
  "/produit/:id",
  authenticateToken,
  deleteProduitFromPanierController
);

export default panierRouter;
