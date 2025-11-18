function addProductView(req) {
  return (`<!DOCTYPE html> 
            <html lang="fr">
             <head>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
              <title>INDEX</title>
              <style>
  /* Mise en page globale */
  body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    background: #f3f4f6;
  }

  /* Le formulaire */
  #create-product-form {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-width: 420px;
    margin: 2rem auto;
    padding: 1.5rem;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  /* Les labels + champs alignés en colonne */
  #create-product-form label {
    display: flex;
    flex-direction: column;
    font-size: 0.9rem;
    font-weight: 600;
    color: #111827;
  }

  /* Inputs (texte, nombre, etc.) */
  #create-product-form input,
  #create-product-form textarea {
    margin-top: 0.25rem;
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    font: inherit;
  }

  /* Effet focus (accessibilité + UX) */
  #create-product-form input:focus,
  #create-product-form textarea:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }

  /* Bouton */
  #create-product-form button {
    margin-top: 0.5rem;
    padding: 0.6rem 1rem;
    border: none;
    border-radius: 4px;
    background: #2563eb;
    color: #ffffff;
    font-weight: 600;
    cursor: pointer;
  }

  #create-product-form button:hover {
    background: #1d4ed8;
  }
</style>

              </head>
              <body>
              <header style="display:flex; justify-content:center; align-items:center; gap:1rem;">
              <h1>CREATE PRODUCT</h1>
             </header>
             <main>
              
          <form id="create-product-form" method="post" action="/products/addProduct">

          

        <!-- Chaque champ a un "name" qui correspond à la clé de ton modèle Mongoose -->


          <label>
          Catégorie
          <select name="category" id="category" required />
          <option value="boisson">Boisson</option>
          <option value="aliment">Aliment</option>
          <option value="epicerie">Epicerie</option>
          </select>
        </label>

        <label>
          Nom
          <input type="text" name="name" required />
        </label>

      

        <label>
          Description
          <textarea name="description"></textarea>
        </label>

        <label>
          Prix
          <input type="number" step="0.01" name="price" required />
        </label>

        <label>
          Quantité
          <input type="number" name="quantity"  required />
        </label>

        <button type="submit">Créer le produit</button>
      </form>
      
              </main>
              <footer></footer> 
              </body>`

  )
};
module.exports = addProductView;
