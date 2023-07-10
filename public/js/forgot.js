const formForgot = document.getElementById('formForgot')
const token = window.location.pathname.split('/')[2]
console.log("AAA" + token)
const API_URL = `/forgot/${token}`

if (formForgot instanceof HTMLFormElement) {
    formForgot.addEventListener("submit", async event => {
        event.preventDefault()

        const input_email = document.querySelector('#input_email2')
        const input_password = document.querySelector('#input_password2')

        if (
            input_email instanceof HTMLInputElement &&
            input_password instanceof HTMLInputElement
        ) {

            const datosUsuario = {
                email: input_email.value,
                password: input_password.value,
            }

            await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosUsuario)
            })
            .then((response) => response.json())
            .then((data) => {
            console.log(data)
            if (data.message === 'success') {
                alert("Contraseña actualizada Exitosamente! Lo estamos redirigiendo, debera iniciar sesión")
                setTimeout(() => {
                window.location.href = '/login'
                }, 5000)
            } else {
                alert("no se pudo actualizar la contraseña")
            }
            })
            .catch((error) => console.error(error))
        }

        irLogin()
    })
}

function irLogin() {
    window.location.href = '/login'
}

redirigirLoginBtn.addEventListener("click", irLogin)
