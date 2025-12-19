document.getElementById("container__register").addEventListener("submit", function (event) {
    event.preventDefault();

    const firstname = document.querySelector(".input__firstname").value;
    const lastname = document.querySelector(".input__lastname").value;

    const dateOfBirth = document.getElementById("dateOfBirth").value;

    const dni = document.querySelector(".input__dni").value;
    const obraSocial = document.querySelector(".input__obra_social").value;
    const phone = document.querySelector(".input__telefono").value;
    const username = document.querySelector(".input__email").value;
    const password = document.querySelector(".input__password").value;
    const confirmPassword = document.querySelector(".input__password_confirm").value;

    const data = {
        dni: parseInt(dni, 10),
        firstName: firstname,
        lastName: lastname,
        username: username,
        password: password,
        confirmPassword: confirmPassword,
        dateOfBirth: dateOfBirth,
        obraSocial: obraSocial,
        phone: phone
    }

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    axios({
        method: 'post',
        url: 'https://turnosmedicos-production.up.railway.app/patients/register',
        data: data,
    })
        .then(res => {
            alert("Usted se registro correctamente");
            window.location.href= "/clinica_dontar/html/login.html";
        })
        .catch(err => {
            if (err.response && err.response.data) {
                alert("Error: " + JSON.stringify(err.response.data));
            } else {
                alert("Error inesperado");
            }
        });

})

function limpiarCampos() {

    document.querySelector(".input__firstname").value = '';
    document.querySelector(".input__lastname").value= '';
    document.getElementById("dateOfBirth").value= '';
    document.querySelector(".input__dni").value= '';
    document.querySelector(".input__obra_social").value= '';
    document.querySelector(".input__telefono").value= '';
    document.querySelector(".input__email").value= '';
    document.querySelector(".input__password").value= '';
    document.querySelector(".input__password_confirm").value= '';
}