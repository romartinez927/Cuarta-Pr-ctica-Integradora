// @ts-ignore
const serverSocket = io('http://localhost:8080/')

const btnEnviar = document.querySelector('#btnEnviar')

if (btnEnviar) {
    btnEnviar.addEventListener('click', evento => {
        const inputTitle = document.querySelector('#inputTitle')
        const inputPrice = document.querySelector('#inputPrice')

        if (!(inputTitle instanceof HTMLInputElement) || !(inputPrice instanceof HTMLInputElement)) return

        const title = inputTitle.value
        const price = inputPrice.value

        if (!title || !price) return

        serverSocket.emit('nuevoProducto', { title, price })
    })
}

const plantillaProductos = `
{{#if hayProductos }}
<ul>
    {{#each productos}}
    <li> 
        <h3>{{this.title}}</h3>
        <p>Precio: $ {{this.price}}</p>
    </li>
    {{/each}}
</ul>
{{else}}
<p>no hay productos...</p>
{{/if}}
`
const armarHtmlProductos = Handlebars.compile(plantillaProductos)

serverSocket.on('actualizarProductos', productos => {
    const divProductos = document.querySelector('#productos')
    if (divProductos) {
        divProductos.innerHTML = armarHtmlProductos({ productos, hayProductos: productos.length > 0 })
    }
})