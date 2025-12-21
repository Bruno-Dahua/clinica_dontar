function getPatientById() {
    const dniPatient = document.getElementById("dni");

    dniPatient.addEventListener("change", async (event) => {
        event.preventDefault();

        const dni = dniPatient.value;
    
        try{
            const response = await api.get(`patients/${dni}`);
            const data = response.data;

            document.getElementById("nombre").value = data.firstName;
            document.getElementById("apellido").value = data.lastName;

            localStorage.setItem("idPatient", data.id);

        }
        catch(err) {
            alert(JSON.stringify(err.response.data));
        }

    })
}

async function getSpeciality() {

    try{
        const response = await api.get("specialities/");
        const data = response.data;

        const selectSpecialities = document.getElementById("especialidad");
        selectSpecialities.innerHTML = '<option value="">Selecciona una especialidad</option>';

        data.forEach(speciality => {
            const item = document.createElement("option");
            item.value = speciality.idSpeciality;
            item.textContent = speciality.name;
            selectSpecialities.appendChild(item);
        });

    }
    catch(err) {
        alert(JSON.stringify(err.response.data));
    }

}

function getProfessionalForSpeciality() {
    document.getElementById("especialidad").addEventListener("change", async function() {
        const IdSpeciality = this.value;

        const selectProfessional = document.getElementById("profesional");
        selectProfessional.innerHTML = '<option value="">Selecciona una profesional</option>';
        selectProfessional.disabled = true;

        try{
            const response = await api.get(`professionals/speciality/${IdSpeciality}`);
            const data = response.data;

            data.forEach(profesional => {
                const item = document.createElement("option");
                item.value = profesional.id;
                item.textContent = `${profesional.firstName} ${profesional.lastName}`;
                selectProfessional.appendChild(item);

            })

            if(data.length > 0){
                selectProfessional.disabled = false;
            }

        }
        catch(err) {
            alert(JSON.stringify(err.response.data));
        }


    });
}

function selectDayAppointment() {
    document.getElementById("profesional").addEventListener("change", async function () {

        const idProfesional = this.value;
        const selectDate = document.getElementById("fecha");
        selectDate.innerHTML = '<option value="">Seleccione una fecha</option>';
        selectDate.disabled = true;

        if(!idProfesional) return;

        await api.get(`appointment/date/${idProfesional}`)
        .then(response => {
            const fechas = response.data;
            fechas.forEach(fecha => {
                const option = document.createElement("option");
                option.value = fecha;
                option.textContent = fecha; 
                selectDate.appendChild(option);
            });

            if(fechas.length > 0){
                selectDate.disabled = false;
            }

        })
        .catch(err => {
            alert(JSON.stringify(err.response.data));
        });
    });

}

function selectTimeAppointment() {
    document.getElementById("fecha").addEventListener("change", async function() {
        const fecha = this.value;
        const idProfesional = document.getElementById("profesional").value;
        const selectTime = document.getElementById("hora");
        selectTime.innerHTML = '<option value="">Seleccione un horario</option>';
        selectTime.disabled = true;

        if(!idProfesional || !fecha) return;

        await api.get(`appointment/available/${idProfesional}?date=${fecha}`)
        .then(res => {
            const horarios = res.data;
            horarios.forEach(time => {
                const option = document.createElement("option");
                option.value = time;
                option.textContent = time;
                selectTime.appendChild(option);
            });

            if(horarios.length > 0){
                selectTime.disabled = false;
            }
        })
        .catch(err => {
            alert(JSON.stringify(err.response.data));
        });

    });
}

function bookAppointment() {
    document.getElementById("confirmarTurno").addEventListener("click", (event) => {
        event.preventDefault();

        const idSpeciality = document.getElementById("especialidad").value;
        const idProfesional = document.getElementById("profesional").value;
        const day = document.getElementById("fecha").value;
        const time = document.getElementById("hora").value;
        const isFirstVisit = document.getElementById("primeraConsulta").checked;

        const appointment = {
            appointmentDay: day,
            appointmentTime: time,
            idProfessional: idProfesional,
            idSpeciality: idSpeciality,
            idPatient: localStorage.getItem("idPatient"),
            firstAppointment: isFirstVisit
        };

        console.log("APPOINTMENT QUE ENVÍO:", appointment);
        console.log("ID PATIENT:", appointment.idPatient);
        console.log("TIPO ID PATIENT:", typeof appointment.idPatient);

        api.post(`appointment/reservation`, appointment)
        .then(res => {
            alert("El turno se ha registrado correctamente");
            limpiarCampos()
        })
        .catch(err => {
            alert(JSON.stringify(err.response.data));
            limpiarCampos();
        });

    })

}

function limpiarCampos(){
    
    document.getElementById("especialidad").value = '';
    document.getElementById("profesional").value = '';
    document.getElementById("fecha").value = '';
    document.getElementById("hora").value = '';
    document.getElementById("primeraConsulta").checked = '';

}

document.addEventListener("DOMContentLoaded", () => {
    getPatientById(),
    getSpeciality(),
    getProfessionalForSpeciality(),
    selectDayAppointment(),
    selectTimeAppointment(),
    bookAppointment()
})