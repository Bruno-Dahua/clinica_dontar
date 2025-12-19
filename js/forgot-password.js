const usernameValid = document.getElementById("email_input");
const botonEnviar = document.querySelector(".contenedor__boton");

window.addEventListener("DOMContentLoaded", () => {
    botonEnviar.disabled = !usernameValid.validity.valid || !usernameValid.value.trim();
});


usernameValid.addEventListener("input", () => {
    botonEnviar.disabled = !usernameValid.validity.valid || !usernameValid.value.trim();
});

document.getElementById("forgot-password").addEventListener("submit", function (event) {

    event.preventDefault();

    const username = usernameValid.value.trim();

    const data = {
        username: username
    }

    axios({
        method: 'put',
        url: 'https://turnosmedicos-production.up.railway.app/auth/forgot-password',
        data: data,
    })
        .then(res => {
            alert("Su contraseña ha sido modificada con su número de dni");
            window.location.href = "/clinica_dontar/html/login.html"
        })
        .catch(err => {
            alert("Hubo un error al intentar modificar la contraseña");
        })
});