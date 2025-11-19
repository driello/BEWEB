const jwt = require('jsonwebtoken'); // permet d’utiliser jsonwebtoken dans ce fichier

const auth = (req, res, next) => {
    console.log('🧪 Passage dans le middleware auth');
  try {
    const token = req.cookies?.token; // récupère le token dans les cookies (nécessite cookie-parser)

    if (!token) {
      return res.status(401).json({ message: 'Accès refusé : token manquant' });
    }

    // Vérifier le token avec la clé secrète
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // stocke les infos du token dans req.user
    req.user = decoded;

    console.log('👤 Utilisateur authentifié via JWT :', req.user);


    // Si tout est ok, on passe à la suite
    return next();

  } catch (error) {
    console.error('Erreur JWT :', error.message);
    return res.status(401).json({ message: 'Accès refusé : token invalide ou expiré' });
  }
};

module.exports = auth;
