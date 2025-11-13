// 👉 On utilise un router pour séparer les routes du reste du serveur, 
// rendre le code plus clair, mieux organisé, 
// et éviter que server.js devienne trop long.

// Import d'Express et du contrôleur
const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

// Routes CRUD pour les produits
router.post('/', productController.createProduct);        // Créer un produit
router.get('/', productController.getAllProducts);        // Lire tous les produits
router.get('/:id', productController.getProductById);     // Lire un produit par ID
router.put('/:id', productController.updateProduct);      // Mettre à jour un produit
router.delete('/:id', productController.deleteProduct);   // Supprimer un produit

// Export du router
module.exports = router;
