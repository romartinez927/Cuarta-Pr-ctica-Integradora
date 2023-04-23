const serverSocket = io('http://localhost:8080')

const formChat = document.querySelector("#formChat")
const messagesContainer = document.querySelector('#messagesContainer')

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

const template = `
{{#if hayMensajes }}
        {{#each mensajes}}
            <li>{{this.user}}: {{this.message}}</li>
        {{/each}}
    {{else}}
        <p>no hay mensajes...</p>
{{/if}}
`

const compileTemplate = Handlebars.compile(template)

serverSocket.on('actualizarMensajes', data => {
    if (messagesContainer !== null) {
        messagesContainer.innerHTML = compileTemplate({ 
            mensajes: data.mensajes, 
            hayMensajes: data.hayMensajes
        })
    }
})

