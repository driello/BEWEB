/**
 * Mini-projet : version dynamique éco-conçue du site
 
Objectif : ajouter une interaction utile mais sobre au site HTML/CSS existant.
 
Fonctionnalités demandées
 
Menu burger fonctionnel (DOM + eventListener)
 
Thème clair/sombre persistant via localStorage
 
Chargement différé des images secondaires
 
Compteur d’économies : afficher le poids total économisé avec capture d'écran
 */

// 🔹 On récupère le thème enregistré dans le stockage local du navigateur (si l’utilisateur en a choisi un précédemment)
let theme = localStorage.getItem('theme');
if (theme === 'dark') {
  document.body.classList.add('dark');
}



// 🔹 Quand toute la page (HTML) est chargée, on exécute ce code
document.addEventListener('DOMContentLoaded', () => {

  // On sélectionne les éléments HTML nécessaires
  const header = document.querySelector('header'); // Le haut de la page
  const nav = document.querySelector('nav');       // Le menu de navigation


  // --- Création du bouton "burger" (menu mobile) ---
  const burger = document.createElement('button'); // Crée un bouton HTML
  burger.type = 'button';                          // Définit son type
  burger.textContent = 'MENU ☰';                        // Ajoute le symbole du menu (3 barres)
  burger.className = 'burger';                     // Ajoute une classe CSS (utile pour le style)
  burger.setAttribute('aria-label', 'Ouvrir le menu'); // Accessibilité : indique sa fonction aux lecteurs d’écran
  header.appendChild(burger);                      // On ajoute le bouton dans le header


  // --- Gestion du clic sur le burger ---
  burger.addEventListener('click', () => {
    // Si la nav est fermée → on l’ouvre ; si elle est ouverte → on la ferme
    nav.classList.toggle('active');
  });

  // --- Fermer le menu si on clique sur un lien ou un <li> ---
  nav.addEventListener('click', (e) => {
    // Vérifie si le clic a eu lieu sur un lien <a> ou un élément de liste <li>
    if (e.target.closest('a, li')) {
      nav.classList.remove('active'); // On ferme le menu
    }
  });


  // --- Fermer le menu si on clique n’importe où ailleurs sur la page ---
  document.addEventListener('click', (e) => {
    // Si le clic n’est pas à l’intérieur du menu nav ET pas sur le burger
    if (!nav.contains(e.target) && !burger.contains(e.target)) {
      nav.classList.remove('active'); // On ferme la nav
    }
  });


  // --- Création du bouton "mode sombre / clair" ---
  let modeSombre = document.createElement('button');
  let footer = document.querySelector('footer');
  modeSombre.innerHTML = "🌓";
  footer.appendChild(modeSombre);

  // Ajoute un "écouteur d'événement" (eventListener) sur le bouton
  modeSombre.addEventListener('click', () => {

    // Active ou désactive la classe "dark" sur le <body>.
    document.body.classList.toggle('dark');                 // classList.toggle() → change le thème instantanément.

    if (document.body.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');              // localStorage → garde le choix même après rechargement de la page.
    } else {
      localStorage.setItem('theme', 'light');
    }
  });


});







