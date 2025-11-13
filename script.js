// --- Fonction générique pour gérer tous les popups ---
function wirePopup(triggerSel, popupId, closeId) {

  // 1️⃣ Sélectionne les trois éléments :
  const trigger = document.querySelector(triggerSel); // bouton ou zone cliquable = triggerSel
  const pop = document.getElementById(popupId);       // popup à afficher
  const close = document.getElementById(closeId);     // bouton "Fermer" du popup

  // 2️⃣ Si un des trois éléments n’existe pas → on arrête pour éviter une erreur
  if (!trigger || !pop || !close) return;

  // 3️⃣ Fonction qui OUVRE le popup
  const open = () => {
    pop.style.display = 'flex';        // affiche le popup
    document.body.style.overflow = 'hidden'; // bloque le scroll du fond
  };

  // 4️⃣ Fonction qui FERME le popup
  const closeAll = () => {
    pop.style.display = 'none';        // cache le popup
    document.body.style.overflow = ''; // réactive le scroll
  };

  // 5️⃣ Quand on clique sur la zone déclencheuse → ouvre le popup
  trigger.addEventListener('click', open);

  // 6️⃣ Quand on clique sur le bouton "Fermer" → ferme le popup
  close.addEventListener('click', closeAll);

  // 7️⃣ Si on clique en dehors du contenu (sur le fond noir) → ferme aussi
  pop.addEventListener('click', (e) => {
    if (e.target === pop) closeAll();
  });

  // 8️⃣ Si on appuie sur la touche Échap → ferme le popup
  document.addEventListener('keydown', (e) => {
    // "keydown" = événement qui se déclenche dès qu’on appuie sur une touche du clavier
    // e = objet "event" transmis automatiquement, contenant les infos sur la touche pressée

    // e.key = nom de la touche pressée (ex: "a", "Enter", "Escape", etc...)
    // Ici, on vérifie si c’est la touche "Escape" et si le popup est affiché
    if (e.key === 'Escape' && pop.style.display === 'flex') {
      closeAll(); // ferme le popup
    }
  });

}

// --- Utilisation de la fonction pour chaque élément interactif du bureau ---
wirePopup('.dossier', 'popup', 'closeBtn');       // zone XP
wirePopup('.etagere1', 'popDiplome', 'closeDiplome');   // diplôme
wirePopup('.tiroir-gauche', 'popTiroir', 'closeTiroir');    // engagement associatif
wirePopup('.tiroir-droit', 'popTiroirD', 'closeTiroirD');   // réalisations
wirePopup('.etagere2', 'popInfos', 'closeInfos');     // infos personnelles
wirePopup('.etagere3', 'popSkills', 'closeSkills');





if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}

let body = document.querySelector('body');
let soleil = document.createElement('span');
// Initialise l’emoji selon l’état actuel du body
soleil.textContent = document.body.classList.contains('dark') ? '🌑' : '🌕';
soleil.style.fontSize = '2.5rem';
soleil.style.cursor = 'pointer';
soleil.style.position = 'absolute';
soleil.className = 'soleil'; 
soleil.role = 'button';
soleil.tabIndex = '0';
soleil.setAttribute('aria-label', 'Basculer le mode clair ou sombre');
soleil.removeAttribute('aria-controls');

let scene = document.querySelector('.scene');
scene.appendChild(soleil);

soleil.addEventListener('click', () => {
  document.body.classList.toggle('dark');

  if (document.body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
    soleil.textContent = '🌑';

  } else {
    localStorage.setItem('theme', 'light');
    soleil.textContent = '🌕';


  }

})

// === Accessibilité clavier ===
// Permet d'activer chaque zone au clavier (Enter ou Espace)
document.querySelectorAll('.zone[role="button"], .soleil').forEach(zone => {
  zone.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      zone.click();
      e.preventDefault();
    }
  });
});

