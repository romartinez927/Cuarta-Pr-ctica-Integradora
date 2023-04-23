const API_URL = `/api${window.location.pathname}`

const productContainer = document.querySelector('#productContainer')

// DOM
// cart
fetch(`${API_URL}`)
  .then(res => res.json())
  .then(data => {
    productContainer.innerHTML = ''

    let products = ''
    data.products.forEach(({product, quantity}) => {
      products += `<br/>
        <div>
            <h3>Title:${product[0].title}</h3>
            <p>Description:${product[0].description}.</p>
            <p>Price: $${product[0].price}</p> 
            <p>Cantidad: ${quantity}</p> 
            <p>Categoria: ${product[0].category}</p>
        </div><br/>
        `
    });
    productContainer.innerHTML = products

  })
  .catch(error => console.error(error))