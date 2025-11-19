// importe express pour créer un mini routeur
const express = require('express');

// importe jwt pour créer un token
const jwt = require('jsonwebtoken');

// créer un routeur express pour l'authentification
const router = express.Router();

// Route POST /auth/login
router.post('/login', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email requis pour se connecter' });
    }

    //  1 Construire le payload qui ira dans le token
    const payload = {
        email,
        role: 'Admin'
    };

    // 2 Générer le token jwt avec une clé secrète et une durée de validité (dans .env)
    // payload = les infos qu’on place DANS le token (et qu’on retrouvera côté serveur avec jwt.verify).
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '20m',    // durée du token (renseignée dans .env) || ou alors 20 min
    });

    // 👉 On place le token dans un cookie httpOnly

    res.cookie('token', token, {
        httpOnly: true,                                 // le JS dans le navigateur ne peut pas lire/supprimer ce cookie.
        secure: process.env.NODE_ENV === 'production',   // en prod : seulement via https
        sameSite: 'lax',                                // limite certains envois cross-site
        maxAge: 20 * 60 * 1000,                         // durée de vie du cookie : 20 minutes en ms
    })
        .json({ message: 'Connecté', token });            // renvoie aussi le token en json(debug)

});

// ROOUTE GET /auth/logout : supprime le cookie JWT deconnexion manuelle par l'utilisateur
router.get('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
  return res.json({ message: 'Déconnecté (token supprimé)' });
});



module.exports = router;