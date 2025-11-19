// 👉 server.js sert à importer les outils nécessaires, configurer Express,
// se connecter à MongoDB, monter les routes, puis démarrer le serveur.


// Import des modules nécessaires
const express = require('express');
const cors = require('cors');       // filtre l'adresse de la requete si autorisée
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');  // parse les cookies pour afficher du json (authentification connexion)
require('dotenv').config();


// Création de l'application Express
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended :true})); // parse la res json pour l'afficher en text


// Middlewares globaux
app.use(cors());
app.use(express.json());      // Pour lire le JSON dans req.body
app.use(cookieParser());      // Pour lire les cookies (JWT)

// Import des routes produits et JWT
const productRoutes = require('./routes/product.routes');
const authRoutes = require('./routes/auth.routes');  // routes d'authentification (login)


// Récupération du PORT depuis le fichier .env (ou 3000 par défaut)
const PORT = process.env.PORT || 3000;

// Connexion à MongoDB via mongoose puis démarrage du serveur
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connecté à MongoDB');

    // Montage des routes produits
    app.use('/auth', authRoutes);
    app.use('/products', productRoutes);

    // Démarrage du serveur
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Erreur de connexion à MongoDB :', err.message);
  });
