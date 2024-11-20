import express from "express";
import {
  createProduitController,
  deleteProduitController,
  getProduitByIdController,
  getProduitsController,
} from "../controllers/produits.js";

const produitRouter = express.Router();

// get produits
produitRouter.get("/", getProduitsController);

// get produit by id
produitRouter.get("/:id", getProduitByIdController);

// create produit
produitRouter.post("/", createProduitController);

// delete produit
produitRouter.delete("/:id", deleteProduitController);

export default produitRouter;
