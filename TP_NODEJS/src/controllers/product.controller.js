//👉 try exécute le code normal (appel à la base, création, mise à jour…), 
// et catch sert à intercepter les erreurs (ex : ID invalide, données manquantes, problème de connexion). 
// Sans try/catch, ton serveur planterait au lieu d’envoyer une réponse JSON propre.


// Import du modèle Product
const Product = require('../models/product');

// Créer un produit
// Créer un produit
const createProduct = async (req, res) => {
    try {
        // 1. Récupérer les données envoyées dans la requête
        const { name, description, price, quantity } = req.body;

        // 2. Créer un nouveau produit en base
        const newProduct = await Product.create({
            name,
            description,
            price,
            quantity
        });

        // 3. Répondre avec un statut 201 (créé) et le produit créé
        res.status(201).json(newProduct);

    } catch (error) {
        // 4. Si erreur : répondre avec un statut 400 (bad request)
        res.status(400).json({ message: error.message });
    }
};


// Récupérer tous les produits
const getAllProducts = async (req, res) => {
    try {
        // 1. Récupérer tous les produits dans la base
        const products = await Product.find();

        // 2. Répondre avec un statut 200 et la liste des produits
        res.status(200).json(products);

    } catch (error) {
        // 3. En cas d'erreur, envoyer une réponse 500 (erreur serveur)
        res.status(500).json({ message: error.message });
    }
};

// Récupérer un produit par ID
const getProductById = async (req, res) => {
    try {
        // 1. Récupérer l'id dans l'URL
        const { id } = req.params;

        // 2. Chercher le produit en base
        const product = await Product.findById(id);

        // 3. Si aucun produit trouvé → 404
        if (!product) {
            return res.status(404).json({ message: "Produit non trouvé" });
        }

        // 4. Sinon → 200 + produit
        res.status(200).json(product);

    } catch (error) {
        // 5. Erreur (ex : ID invalide)
        res.status(400).json({ message: error.message });
    }
};

// Mettre à jour un produit
const updateProduct = async (req, res) => {
    try {
        // 1. Récupérer l'id dans l'URL
        const { id } = req.params;

        // 2. Récupérer les nouvelles données envoyées dans le body
        const { name, description, price, quantity } = req.body;

        // 3. Mettre à jour en base
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, description, price, quantity },
            { new: true, runValidators: true }
        );

        // 4. Si aucun produit → 404
        if (!updatedProduct) {
            return res.status(404).json({ message: "Produit non trouvé" });
        }

        // 5. Produit trouvé → 200 + données mises à jour
        res.status(200).json(updatedProduct);

    } catch (error) {
        // 6. Si erreur → 400
        res.status(400).json({ message: error.message });
    }
};

// Supprimer un produit
const deleteProduct = async (req, res) => {
  try {
    // 1. Récupérer l'id depuis l'URL
    const { id } = req.params;

    // 2. Supprimer le produit
    const deletedProduct = await Product.findByIdAndDelete(id);

    // 3. Si produit introuvable → 404
    if (!deletedProduct) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    // 4. Produit supprimé → 200 + message
    res.status(200).json({ message: "Produit supprimé avec succès" });

  } catch (error) {
    // 5. Erreur → 400
    res.status(400).json({ message: error.message });
  }
};

// Export des fonctions pour les utiliser dans les routes
module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
