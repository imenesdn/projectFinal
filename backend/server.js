// Aller chercher les configurations de l'application
import "dotenv/config";

import https from "node:https";
import { readFile } from "node:fs/promises";
import path from "path";

// Importer les fichiers et librairies
import express, { json, urlencoded } from "express";
import expressHandlebars from "express-handlebars";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import cspOption from "./src/csp-options.js";
import produitRouter from "./src/routes/produits.js";
import panierRouter from "./src/routes/paniers.js";
import commandRouter from "./src/routes/commandes.js";
import commandeStatesRouter from "./src/routes/etatCommandes.js";
import authenticationRouter from "./src/routes/authentification.js";
import "./authentification.js";

import session from "express-session";
import memorystore from "memorystore";
import passport from "passport";
import middlewareSse from "./middleware-sse.js";

const __dirname = path.resolve();

// Création du serveur
const app = express();

// Creation du constructeur de base de donneees de session
const MemoryStore = memorystore(session);

// Ajout de middlewares
app.use(helmet(cspOption));
app.use(compression());
app.use(cors());
app.use(json());
//session middlewares
app.use(
  session({
    cookie: { maxAge: 3600000 },
    name: process.env.npm_package_name,
    store: new MemoryStore({ checkPeriod: 3600000 }),
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(urlencoded({ extended: false }));
app.use("/public", express.static(path.join(__dirname, "/backend/src/public")));

app.use(middlewareSse());

app.use("/api/produits", produitRouter);
app.use("/api/panier", panierRouter);
app.use("/api/commandes", commandRouter);
app.use("/api/etatCommandes", commandeStatesRouter);
app.use("/auth", authenticationRouter);

if (process.env.NODE_ENV === "production") {
  app.use(
    "/public",
    express.static(path.join(__dirname, "/backend/src/public"))
  );
  app.use("/", express.static("./frontend/dist")); // Serve the built Vue app

  app.get("*", (req, res) => {
    // For any other route, serve the index.html file
    res.sendFile(path.join(__dirname, "/frontend/dist/index.html"));
  });
}

if (process.env.NODE_ENV === "development") {
  app.use("/public", express.static(path.join(__dirname, "/src/public")));
  let credentials = {
    key: await readFile("./security/localhost.key"),
    cert: await readFile("./security/localhost.cert"),
  };
  https.createServer(credentials, app).listen(process.env.PORT);
  console.info(`https://localhost:${process.env.PORT}`);
} else {
  // Démarrage du serveur
  app.listen(process.env.PORT);
  console.info(`Serveurs démarré:`);
  console.info(`http://localhost:${process.env.PORT}`);
}
