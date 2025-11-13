// Import de mongoose
const mongoose = require('mongoose');

// Définition du schéma Product (structure des documents en base)
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Export du modèle Product (utilisable dans les controllers)
module.exports = mongoose.model('Product', productSchema);

