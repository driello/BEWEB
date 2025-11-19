// 👉 On utilise un router pour séparer les routes du reste du serveur, 
// rendre le code plus clair, mieux organisé, 
// et éviter que server.js devienne trop long.

// Import d'Express et du contrôleur
const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const auth = require('../middlewares/auth_user');  // middleware JWT pour protéger certaines routes
// Routes CRUD pour les produits
router.get('/showForm', productController.showProductForm);
router.post('/addProduct', auth, productController.createProduct);         // Créer un produit               CREATE = POST
router.get('/', productController.getAllProducts);                   // Lire tous les produits         READ   = GET 
router.get('/:id', productController.getProductById);                // Lire un produit par ID         
router.put('/:id', auth, productController.updateProduct);                // Mettre à jour un produit       UPDATE = PUT
router.delete('/:id', auth, productController.deleteProduct);            // Supprimer un produit           DELETE = DELETE


// Export du router
module.exports = router;
