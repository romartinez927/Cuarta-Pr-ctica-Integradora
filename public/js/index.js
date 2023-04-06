const serverSocket = io(`http://localhost:8080/`)

const formChat = document.querySelector("#formChat")

if (formChat instanceof HTMLFormElement) {
    formChat.addEventListener("submit", event => {
        event.preventDefault()
        const formData = new FormData(formChat)
        const data = {}
        formData.forEach((value, key) => (data[key] = value))

        fetch("/api/chat", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
    })
}

const realTimeProductsContainer = document.getElementById("realTimeProductsContainer") 

const template = `
{{#if showList}}
      <ul>
      {{#each list}}
            <li>
                <h3>Title: {{this.title}}</h3>
                <p>Price: $ {{this.price}}</p>
                <p>Description: {{this.description}}</p>
                <p>Code: {{this.code}}</p>
                <p>Stock: {{this.stock}}</p>
                <p>Category: {{this.category}}</p>
            </li>
      {{/each}}
      </ul>
{{else}}
  <p>No hay productos...</p>
{{/if}}
`

const compileTemplate = Handlebars.compile(template)

serverSocket.on("updateList", data =>{
    if (realTimeProductsContainer !== null) {
        realTimeProductsContainer.innerHTML = compileTemplate({
            list: data.list,
            showList: data.showList
        })
    }
})
