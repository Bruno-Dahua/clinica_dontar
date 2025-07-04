document.addEventListener("DOMContentLoaded", async (event) => {

    event.preventDefault();

    await api.get("/patients/")
    .then(response => {
        const patients = response.data;

        const tableBody = document.getElementById("pacientes-body");

        patients.forEach(patient => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${patient.dni}</td>
            <td>${patient.firstName}</td>
            <td>${patient.lastName}</td>
            <td>${patient.username}</td>
            <td>${patient.dateOfBirth}</td>
            <td>${patient.obraSocial}</td>
            <td>${patient.phone}</td>
            `

            tableBody.appendChild(row);
        });
    });

});