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
            <h3>Id:${product}</h3>
            <p>Cantidad: ${quantity}</p> 
        </div><br/>
        `
        console.log(data.products)
    });
    productContainer.innerHTML = products

  })
  .catch(error => console.error(error))