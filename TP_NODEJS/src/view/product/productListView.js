function productListView(req, ListProduct) {
    return (`<!DOCTYPE html> 
            <html lang="fr">
            <head>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
              <title>INDEX</title>
              </head>
              <body>
              <header style="display:flex; justify-content:center; align-items:center; gap:1rem;">
              <h1>PRODUCT LIST</h1>
             </header>
             <main>
              ${ListProduct.map(product => ( // .map crée un tableau d'éléments html

        `<ul>
            <li>${product.name}</li>
            <li>${product.category}</li>
            <li>${product.description}</li>
            <li>${product.price}</li>
            <li>${product.quantity}</li>
        </ul>`
    )).join('')}   
              </main>
              <footer></footer> 
              </body>`)

};
module.exports = productListView;
