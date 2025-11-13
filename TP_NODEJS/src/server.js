// 👉 server.js sert à importer les outils nécessaires, configurer Express,
// se connecter à MongoDB, monter les routes, puis démarrer le serveur.


// Import des modules nécessaires
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Création de l'application Express
const app = express();

// Middlewares globaux
app.use(express.json()); // permet de lire le JSON dans les requêtes
app.use(cors()); // autorise les requêtes venant d'autres domaines

// Import des routes produits
const productRoutes = require('./routes/product.routes');

// Récupération du PORT depuis le fichier .env (ou 3000 par défaut)
const PORT = process.env.PORT || 3000;

// Connexion à MongoDB puis démarrage du serveur
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connecté à MongoDB');

    // Montage des routes produits
    app.use('/products', productRoutes);

    // Démarrage du serveur
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Erreur de connexion à MongoDB :', err.message);
  });
