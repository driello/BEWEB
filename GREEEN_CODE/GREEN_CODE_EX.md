### EXEMPLE GREEN CODE


/ Code initial
setInterval(() => {
  document.querySelectorAll('.item').forEach(i => {
    i.textContent = Date.now();
  });
}, 100);
## La boucle met l'heure a jour toutes les 100ms
## Pas compréhensible et énergivore



const clock = document.querySelector('#horloge');
function updateClock() {
  clock.textContent = new Date().toLocaleTimeString();
}
updateClock();
setInterval(updateClock, 10000);
## La boucle met l'heure a jour toutes les 10s
## compréhensible (grace aux termes) 
## Réutilisable grâce à la fonction



for (let i = 0; i < document.querySelectorAll('.card').length; i++) {
  document.querySelectorAll('.card')[i].classList.add('active');
}
## Le navigateur va lire tout le dom a chaque passage de la boucle 

const cards = document.querySelectorAll('.card');
cards.forEach(card => card.classList.add('active'));


setInterval(() => {
  console.log('Mise à jour');
}, 10);
## deux paramètres la fonction ert la frequence (10 = 10ms)


### MAUVAIS CODE CHARGE TOUT LE DOM
input.addEventListener('input', () => {
  document.querySelector('#result').innerHTML = input.value;
});

### BON CODE CHARGE JUSTE LA PARTIE NECESSAIRE
const result = document.querySelector('#result');
input.addEventListener('input', e => {
  result.textContent = e.target.value;
});
### LE RENDU VISUEL EST LE MEME MAIS PAS LA PERFORMANCE OU LA CLARETé DU CODE 
 


### CREER UN LISTENER PAR BOUTON / PAS BON MAX DEUX TROIS LISTENER
 const buttons = document.querySelectorAll('.btn');
buttons.forEach(b => {
  b.addEventListener('click', () => alert('ok'));
});



### Ecoute lévenement d'un clic, si c un btn il affiche alert
document.addEventListener('click', e => {
  if (e.target.classList.contains('btn')) alert('ok');
});


### ON VA APPELER LE DOM TROIS FOIS / PAS BIEN !!!!!!
const box = document.querySelector('.box');
box.style.width = '200px';
box.style.height = '200px';
box.style.background = 'red';


### ON LE FAIT QU UNE SEULE FOIS
const box = document.querySelector('.box');
box.style.cssText = 'width:200px;height:200px;background:red';



ADDITIONNER TOUS LES CHIFFRES D'UN TABLEAU
function add(a, b) {
  return Array.from(arguments).reduce((x, y) => x + y, 0);
}
### MEME RESULTAT

function add(a, b) {
  return a + b;
}