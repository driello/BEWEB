// ========================================
// NETFLOP - Version avec API TMDB
// Documentation du code (sans implémentation)
// ========================================

// Configuration de l'API TMDB
// Clé API personnelle pour accéder aux données de The Movie Database
const API_KEY = 'ccd390e64b408870b938de981734f3fd';

// URL de base pour toutes les requêtes API (version 3 de l'API TMDB)
const BASE_URL = 'https://api.themoviedb.org/3';

// URL de base pour charger les images (affiches de films)
// w500 = largeur de 500 pixels pour les images
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

/**
 * Fonction principale pour charger toutes les données depuis TMDB
 * Fonction asynchrone (async) car elle doit attendre les réponses de l'API
 */
async function chargerNetflopTMDB() {
    // Afficher un message dans la console pour indiquer le début du chargement
    console.log("chargement TMDB.... ");
    // Charger les 4 catégories en parallèle avec Promise.all()
    // await = attendre que toutes les promesses soient terminées
    // Promise.all() = exécuter plusieurs requêtes en même temps (plus rapide)
    await Promise.all([
        afficherFilmsPopulaires(),
        afficherSeriesPopulaires(),
        afficherDocumentaires(),
        afficherAnimes()
    ]);

    // Message de succès quand tout est chargé
    console.log("TMDB Je suis chargé!!!");
    // Si une erreur se produit, l'afficher dans la console
    // Afficher une alerte à l'utilisateur
}

/**
 * Fonction pour afficher les films populaires dans un slider
 * Fonction asynchrone car elle fait une requête à l'API
 */
async function afficherFilmsPopulaires() {
    // Construire l'URL de la requête API avec les paramètres
    // movie/popular = endpoint pour les films populaires
    // api_key = notre clé d'authentification
    // language=fr-FR = obtenir les résultats en français
    // page=1 = première page de résultats
    try {
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=fr-FR&page=1`;
        // ============================================
        // FETCH : ÉTAPE 1 - Lancer la requête HTTP
        // ============================================
        // fetch(url) envoie une requête HTTP GET à l'API TMDB
        // C'est une opération ASYNCHRONE (ne bloque pas le reste du code)
        // await = PAUSE : attendre que le serveur réponde avant de continuer
        // Résultat stocké dans 'response' = objet Response avec infos HTTP
        const response = await fetch(url);
        // ============================================
        // FETCH : ÉTAPE 2 - Vérifier le code HTTP
        // ============================================
        // response.ok vérifie si le code HTTP est 2xx (succès)
        // Exemples : 200 = OK, 404 = Not Found, 500 = Server Error
        // Si erreur (404, 500...), on lance une exception
        if (!response.ok) {
            throw new Error('Erreur: ' + response.status);
        }

        // ============================================
        // FETCH : ÉTAPE 3 - Convertir JSON → JavaScript
        // ============================================
        // Le serveur envoie les données au format JSON (texte)
        // response.json() les convertit en objet JavaScript utilisable
        // C'est aussi asynchrone, donc on utilise await
        // Résultat : 'data' contient un objet avec { results: [...films] }
        let data = await response.json();

        // Récupérer le conteneur HTML où afficher les films
        let container = document.getElementById('films');
        // Vider le conteneur (supprimer le loader animé)
        container.textContent = "";
        // Créer un élément h2 pour le titre de la section
        // Définir le texte du titre
        // Ajouter le titre au conteneur
        let titreFilm = document.createElement("h2");
        titreFilm.textContent = ("Films Populaires");
        container.parentNode.insertBefore(titreFilm, container);        // Créer la structure du slider avec les 15 premiers films
        // data.results = tableau de films reçu de l'API
        // slice(0, 15) = prendre seulement les 15 premiers
        // 'movie' = type de contenu
        // Ajouter le slider au conteneur
        let type = Array.isArray(data.results) ? data.results.slice(0, 15) : [];
        let slider = creerSlider(type, 'movie');
        container.appendChild(slider);
        console.log(data.results);

        // APPENCHILD!!!!!!!!!

        // GESTION DES ERREURS avec catch
        // ============================================
        // Si une erreur se produit dans le bloc try :
        // - Erreur réseau (pas de connexion internet)
        // - Erreur HTTP (404, 500...)
        // - Erreur de parsing JSON
        // Le code "saute" directement ici dans le catch
        // On affiche l'erreur dans la console pour déboguer

    } catch (error) {
        console.error('Erreur:', error);
    }
}


/**
 * Fonction pour afficher les séries TV populaires dans un slider
 * Fonctionne de la même manière que afficherFilmsPopulaires()
 */
async function afficherSeriesPopulaires() {
    // Construire l'URL pour récupérer les séries populaires
    // tv/popular = endpoint pour les séries TV populaires
    try {
        const url = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=fr-FR&page=1`;
        // Faire la requête fetch et attendre la réponse
        const response = await fetch(url);
        // Vérifier si la requête a réussi
        if (!response.ok)
            throw new Error('Erreur: ' + response.status);

        // Convertir la réponse JSON en objet JavaScript
        const data = await response.json();
        // Récupérer le conteneur HTML pour les séries
        let container = document.getElementById('series');
        // Vider le conteneur (supprimer le loader)
        container.textContent = "";
        // Créer le titre de la section
        // Ajouter le titre au conteneur
        let titreSeries = document.createElement('h2');
        titreSeries.textContent = "Séries Populaires";
        container.appendChild(titreSeries);

        // Créer le slider avec les 15 premières séries
        // 'tv' = type de contenu (série TV)
        let type = Array.isArray(data.results) ? data.results.slice(0, 15) : [];
        let slider = creerSlider(type, 'tv');
        container.appendChild(slider);
        console.log(data.results);

        // Ajouter le slider au conteneur

        // Afficher l'erreur dans la console
    } catch (error) {
        console.error('Erreur:', error);
    }
}

/**
 * Fonction pour afficher les documentaires dans un slider
 * Utilise l'endpoint 'discover' pour filtrer par genre
 */
async function afficherDocumentaires() {
    // Construire l'URL pour découvrir des films par genre
    // discover/movie = endpoint pour découvrir des films avec filtres
    // with_genres=99 = ID 99 correspond au genre "Documentaire"
    // sort_by=popularity.desc = trier par popularité décroissante
    try {
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=99&language=fr-FR&page=1`;

        // Faire la requête fetch et attendre la réponse
        const response = await fetch(url);

        // Vérifier si la requête a réussi
        if (!response.ok)
            throw new Error('Erreur: ' + response.status);
        // Convertir la réponse JSON en objet JavaScript
        const data = await response.json();
        // Récupérer le conteneur HTML pour les documentaires
        let container = document.getElementById('documentaires');
        // Vider le conteneur (supprimer le loader)
        container.textContent = "";
        // Créer le titre de la section
        // Ajouter le titre au conteneur
        let titreDocu = document.createElement('h2')
        titreDocu.textContent = "Documentaires";
        container.appendChild(titreDocu);
        // Créer le slider avec les 15 premiers documentaires
        // 'movie' car les documentaires sont considérés comme des films
        let type = Array.isArray(data.results) ? data.results.slice(0, 15) : [];
        let slider = creerSlider(type, 'movie');
        container.appendChild(slider);
        console.log(data.results);

        // Ajouter le slider au conteneur

        // Afficher l'erreur dans la console
    } catch (error) {
        console.error('Erreur:', error);
    }
}

/**
 * Fonction pour afficher les animes (séries d'animation japonaises) dans un slider
 * Combine plusieurs filtres pour obtenir uniquement les animes
 */
async function afficherAnimes() {
    // Construire l'URL pour découvrir des séries TV avec filtres
    // discover/tv = endpoint pour découvrir des séries avec filtres
    // with_genres=16 = ID 16 correspond au genre "Animation"
    // with_origin_country=JP = filtrer par pays d'origine = Japon
    // sort_by=popularity.desc = trier par popularité décroissante
    try {
        const url = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=16&with_origin_country=JP&sort_by=popularity.desc&language=fr-FR&page=1`;

        // Faire la requête fetch et attendre la réponse
        const response = await fetch(url);
        // Vérifier si la requête a réussi
        if (!response.ok)
            throw new Error('Erreur: ' + response.status);

        // Convertir la réponse JSON en objet JavaScript
        const data = await response.json();


        // Récupérer le conteneur HTML pour les animes
        let container = document.getElementById('animes');
        // Vider le conteneur (supprimer le loader)
        container.textContent = "";
        // Créer le titre de la section
        // Ajouter le titre au conteneur
        let titreAnimes = document.createElement('h2');
        titreAnimes.textContent = "Animés Japonais"
        container.appendChild(titreAnimes);
        // Créer le slider avec les 15 premiers animes
        // 'tv' car les animes sont des séries TV
        const type = Array.isArray(data.results) ? data.results.slice(0, 15) : [];
        let slider = creerSlider(type, 'tv')
        container.appendChild(slider);
        console.log(data.results);

        // Ajouter le slider au conteneur

        // Afficher l'erreur dans la console
    } catch (error) {
        console.error('Erreur:', error);
    }
}

/**
 * Créer la structure complète du slider avec boutons de navigation
 * @param {Array} items - Tableau des films/séries à afficher
 * @param {String} type - Type de contenu : 'movie' ou 'tv'
 * @returns {HTMLElement} - Conteneur complet du slider
 */
function creerSlider(items, type) {
    // Créer le conteneur principal qui va contenir tout le slider
    // Ajouter la classe CSS 'slider-container'
    let sliderContainer = document.createElement('div');
    sliderContainer.className = 'slider_container';
    // === BOUTON PRÉCÉDENT (gauche) ===
    // Créer un bouton pour naviguer vers la gauche
    // Ajouter les classes CSS pour le style et la position
    // Ajouter le symbole flèche gauche (◄) avec code HTML
    // Désactiver le bouton par défaut (on est au début)
    let leftBtn = document.createElement('button');
    leftBtn.className = 'slider-btn btnGauche';
    leftBtn.innerHTML = '&#9668';
    leftBtn.disabled = true; // ← Désactiver le bouton par défaut (on est au début)

    // === BOUTON SUIVANT (droite) ===
    // Créer un bouton pour naviguer vers la droite
    // Ajouter les classes CSS pour le style et la position
    // Ajouter le symbole flèche droite (►) avec code HTML
    let rightBtn = document.createElement('button');
    rightBtn.className = 'slider-btn btnGauche';
    rightBtn.innerHTML = '&#9658';
    rightBtn.disabled = true; // ← Désactiver le bouton par défaut (on est au début)

    // === WRAPPER DES CARTES ===
    // Créer le conteneur qui va contenir toutes les cartes
    // Ajouter la classe CSS (display: flex, overflow-x: hidden)
    let cardsContainer = document.createElement('div');
    cardsContainer.className = 'slider-wrapper';   // pour appliquer les styles (flex, overflow-x hidden, etc.)

    // === AJOUTER TOUTES LES CARTES ===
    // Parcourir chaque élément (film ou série) du tableau items
    // Créer une carte pour cet élément
    // Ajouter la carte au wrapper
    for (let i = 0; i < items.length; i++) {

        let card = creerCarteTMDB(items[i], type);
        cardsContainer.appendChild(card);
    };

    // === FONCTION DE SCROLL ===
    // Fonction pour faire défiler le slider vers la gauche ou la droite
    // Calculer la distance de scroll (80% de la largeur visible)
    // Si direction est 'next', scroller vers la droite
    // Sinon, scroller vers la gauche
    function scrollSlider(direction) {
        const distance = Math.floor(cardsContainer.clientWidth * 0.8);
        if (direction === 'next') {
            cardsContainer.scrollBy({ left: distance, behavior: 'smooth' });
        }
        else {
            cardsContainer.scrollBy({ left: -distance, behavior: 'smooth' });
        }
    }
    // === FONCTION POUR METTRE À JOUR LES BOUTONS ===
    // Active ou désactive les boutons selon la position du scroll
    // Désactiver le bouton précédent si on est tout à gauche (début)
    // scrollLeft <= 0 signifie qu'on ne peut plus aller à gauche
    function majBtn() {
        leftBtn.disabled = cardsContainer.scrollLeft <= 0;
    }
    // Calculer la position maximale du scroll (largeur totale - largeur visible)
    // Désactiver le bouton suivant si on est tout à droite (fin)
    // -10 pour une petite marge d'erreur
    const maxScroll = cardsContainer.scrollWidth - cardsContainer.clientWidth;
    rightBtn.disabled = cardsContainer.scrollLeft >= (maxScroll - 10);
    // === ÉVÉNEMENTS DES BOUTONS ===
    // Quand on clique sur le bouton précédent
    // Scroller vers la gauche
    // Après 300ms, mettre à jour l'état des boutons (attendre la fin de l'animation)
    leftBtn.addEventListener('click', function () {
        scrollSlider('prev');
        setTimeout(majBtn, 300);
    })
    // Quand on clique sur le bouton suivant
    // Scroller vers la droite
    // Après 300ms, mettre à jour l'état des boutons
    rightBtn.addEventListener('click', function () {
        scrollSlider('next');
        setTimeout(majBtn, 300);

    })
    // === ÉVÉNEMENT DE SCROLL ===
    // Quand l'utilisateur scroll manuellement, mettre à jour les boutons
    cardsContainer.addEventListener('scroll', majBtn);
    // === INITIALISATION ===
    // Vérifier l'état initial des boutons après un court délai
    // (nécessaire pour que le DOM soit bien rendu)
    setTimeout(majBtn, 0);
    // === ASSEMBLER LE SLIDER ===
    // Ajouter le bouton précédent au conteneur
    // Ajouter le wrapper des cartes au conteneur
    // Ajouter le bouton suivant au conteneur
    // Retourner le slider complet
    sliderContainer.appendChild(leftBtn);
    sliderContainer.appendChild(cardsContainer);
    sliderContainer.appendChild(rightBtn);
    return (sliderContainer);
}

/**
 * Créer une carte HTML complète pour afficher un film ou une série
 * @param {Object} item - Objet contenant toutes les données d'un film/série depuis l'API TMDB
 * @param {String} type - Type de contenu : 'movie' (film) ou 'tv' (série)
 * @returns {HTMLElement} - Élément div représentant la carte complète
 */
function creerCarteTMDB(item, type) {
    // === CRÉER LE CONTENEUR PRINCIPAL ===
    // Créer un div qui va contenir toute la carte
    // Ajouter la classe CSS 'card' pour le style

    let cardMedia = document.createElement('div');
    cardMedia.className = 'card';
    // === EXTRAIRE LES DONNÉES SELON LE TYPE ===
    // Si c'est un film, utiliser 'title', sinon utiliser 'name' (pour les séries)
    let titre;
    if (type === 'movie') {
        titre = item.title || 'Sans titre';
    } else if (type === 'tv')
        titre = item.name || 'Sans titre';

    // Si c'est un film, utiliser 'release_date', sinon 'first_air_date' (séries)
    let dateBrute;
    if (type === 'movie') {
        dateBrute = item.release_date
    }
    else if (type === 'tv') {
        dateBrute = item.first_air_date;
    }

    // Récupérer le résumé, ou mettre un message par défaut s'il n'existe pas
    let resume = item.overview || 'Resumé indisponible.';

    // Récupérer la note moyenne et la formater à 1 décimale (ex: 7.3)
    // Si pas de note, afficher 'N/A'
    let noteStr = (typeof item.vote_average === 'number') ? item.vote_average.toFixed(1) : 'N/A';

    // Construire l'URL complète de l'image (affiche du film)
    // Si poster_path existe, utiliser l'URL TMDB, sinon image placeholder
    let imgSrc = item.poster_path
        ? `${IMAGE_BASE_URL}${item.poster_path}`
        : 'no-picture.jpg';

    /**/
    // === CRÉER L'IMAGE ===
    // Créer un élément img pour l'affiche du film
    // Définir la source de l'image
    // Définir le texte alternatif (pour l'accessibilité)
    // Ajouter la classe CSS pour le style
    let cardImage = document.createElement('img');
    cardImage.setAttribute('alt', 'mon image');
    cardImage.src = imgSrc;
    cardImage.alt = titre;
    // Gérer les erreurs de chargement d'image
    // Si l'image ne charge pas, afficher une image placeholder

    // === CRÉER LE CONTENEUR DES INFORMATIONS ===
    // Créer un div pour contenir toutes les informations textuelles
    // Ajouter la classe CSS pour le style
    let cardInfo = document.createElement('div');
    // === CRÉER LE TITRE ===
    // Créer un élément h3 pour le titre du film/série
    // Définir le texte du titre
    let cardTitre = document.createElement('h3');
    cardTitre.textContent = titre;
    // === CRÉER L'ÉLÉMENT NOTE ===
    // Créer un paragraphe pour afficher la note
    // Définir le contenu HTML avec l'étoile et la note
    let cardNote = document.createElement('p');
    cardNote.textContent = noteStr;
    // === AJOUTER UNE COULEUR SELON LA NOTE ===
    // Convertir la note en nombre pour la comparer
    // Si note >= 7, couleur verte (bonne note)
    // Si note entre 5 et 7, couleur orange (note moyenne)
    // Si note < 5, couleur rouge (mauvaise note)

    // === CRÉER L'ÉLÉMENT DATE DE SORTIE ===
    // Créer un paragraphe pour la date de sortie
    // Si dateSortie existe, la formater en français (jj/mm/aaaa)
    // Sinon afficher 'Date inconnue'
    // Définir le contenu HTML avec la date formatée
    let dateSortie = document.createElement('p');


    dateSortie.textContent = dateBrute;

    // === CRÉER LE BADGE DE TYPE ===
    // Créer un span pour afficher le type (Film ou Série)
    // Ajouter la classe CSS
    // Si type est 'movie', afficher "🎬 Film", sinon "📺 Série"
    // Ajouter des styles inline pour le badge (fond rouge, texte blanc, arrondi)

    // === CRÉER LE CONTENEUR DU RÉSUMÉ ===
    // Créer un div pour contenir le résumé
    // Ajouter la classe CSS
    let cardResume = document.createElement('div');

    // === CRÉER L'ÉLÉMENT RÉSUMÉ ===
    // Créer un paragraphe pour le résumé
    // Ajouter la classe CSS
    // Ajouter des styles inline pour limiter à 3 lignes avec ellipsis (...)
    // overflow: hidden = cacher le débordement
    // text-overflow: ellipsis = ajouter ... à la fin
    // -webkit-line-clamp: 3 = limiter à 3 lignes
    // Définir le contenu HTML avec le résumé
    let resumer = document.createElement('p');
    resumer.textContent = `${resume}`;
    // Ajouter le résumé au conteneur
    cardResume.appendChild(resumer);
    // === ASSEMBLER TOUS LES ÉLÉMENTS ===
    // Ajouter le titre au conteneur d'informations
    // Ajouter le badge de type
    // Ajouter la note
    // Ajouter la date de sortie
    // Ajouter le conteneur du résumé
    cardInfo.appendChild(cardTitre);

    cardInfo.appendChild(cardNote);
    cardInfo.appendChild(dateSortie);
    cardInfo.appendChild(cardResume);
    // Ajouter l'image à la carte
    // Ajouter les informations à la carte
    cardMedia.appendChild(cardImage);
    cardMedia.appendChild(cardInfo);


    // === AJOUTER UN ÉVÉNEMENT DE CLIC ===
    // Changer le curseur en pointeur (main) au survol
    // Ajouter un événement click pour ouvrir la page de détails
    // Vérifier que ce n'est pas un bouton de slider qui a été cliqué
    // Si c'est un bouton slider, ne rien faire

    // Construire l'URL de la page de détails selon le type (film ou série)
    // Ouvrir l'URL dans la même fenêtre

    // Retourner la carte complète
    return (cardMedia);
}

// ========================================
// FONCTIONS BONUS (non utilisées dans l'interface actuelle)
// ========================================

/**
 * Fonction bonus pour rechercher des films/séries par mot-clé
 * Peut être appelée depuis la console pour tester : rechercherContenu('Avengers')
 * @param {String} query - Mot-clé de recherche (ex: 'Avengers', 'Matrix')
 * @returns {Promise<Array>} - Tableau des résultats trouvés
 */
async function rechercherContenu(query) {
    // Construire l'URL de recherche
    // search/multi = rechercher dans films ET séries en même temps
    // encodeURIComponent() = encoder les caractères spéciaux pour l'URL

    // Faire la requête fetch et attendre la réponse

    // Vérifier si la requête a réussi

    // Convertir la réponse JSON en objet JavaScript
    // Afficher les résultats dans la console
    // Retourner le tableau des résultats

    // En cas d'erreur, l'afficher dans la console
    // Retourner un tableau vide
}

/**
 * Fonction bonus pour obtenir tous les détails d'un film spécifique
 * Inclut les acteurs, réalisateur, bande-annonce, etc.
 * Exemple : obtenirDetailsFilm(550) pour Fight Club
 * @param {Number} movieId - ID du film sur TMDB (visible dans l'URL TMDB)
 * @returns {Promise<Object|null>} - Objet contenant tous les détails ou null si erreur
 */
async function obtenirDetailsFilm(movieId) {
    // Construire l'URL pour obtenir les détails d'un film spécifique
    // movie/{movieId} = endpoint pour un film précis
    // append_to_response=credits,videos = inclure aussi les acteurs et vidéos

    // Faire la requête fetch et attendre la réponse

    // Vérifier si la requête a réussi

    // Convertir la réponse JSON en objet JavaScript
    // Afficher les détails dans la console
    // Retourner l'objet contenant tous les détails

    // En cas d'erreur, l'afficher dans la console
    // Retourner null pour indiquer qu'il y a eu une erreur
}

/**
 * Fonction bonus pour obtenir des films filtrés par genre
 * Exemple : obtenirFilmsParGenre(27) pour les films d'horreur
 * @param {Number} genreId - ID du genre TMDB (voir liste ci-dessous)
 * @returns {Promise<Array>} - Tableau des films du genre demandé
 */
async function obtenirFilmsParGenre(genreId) {
    /**
     * === LISTE COMPLÈTE DES GENRES TMDB ===
     * 28 = Action
     * 12 = Aventure
     * 16 = Animation
     * 35 = Comédie
     * 80 = Crime
     * 99 = Documentaire
     * 18 = Drame
     * 14 = Fantastique
     * 27 = Horreur
     * 10402 = Musique
     * 9648 = Mystère
     * 10749 = Romance
     * 878 = Science-Fiction
     * 53 = Thriller
     * 10752 = Guerre
     * 37 = Western
     */

    // Construire l'URL pour découvrir des films par genre
    // discover/movie = découvrir des films avec filtres
    // with_genres = filtrer par ID de genre
    // sort_by=popularity.desc = trier par popularité décroissante

    // Faire la requête fetch et attendre la réponse

    // Vérifier si la requête a réussi

    // Convertir la réponse JSON en objet JavaScript
    // Afficher les résultats dans la console
    // Retourner le tableau des films

    // En cas d'erreur, l'afficher dans la console
    // Retourner un tableau vide
}

// ========================================
// INITIALISATION DE L'APPLICATION
// ========================================

/**
 * Fonction d'initialisation qui se lance au chargement de la page
 * DOMContentLoaded = événement déclenché quand le HTML est complètement chargé
 */
document.addEventListener('DOMContentLoaded', function () {
    // Afficher un message dans la console pour confirmer que le DOM est chargé

    // === VÉRIFICATION DE LA CLÉ API ===
    // Vérifier si la clé API a été remplacée par une vraie clé
    // Si la clé n'a pas été changée, afficher une alerte
    // Afficher un message d'erreur dans la console
    // Afficher les instructions pour obtenir une clé API
    // Arrêter l'exécution (ne pas charger les données)

    // === LANCEMENT DE L'APPLICATION ===
    // Si la clé API est valide, charger toutes les données
});
chargerNetflopTMDB();