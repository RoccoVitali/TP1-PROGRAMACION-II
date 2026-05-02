const titulo = document.getElementById("titulo");
const descripcion = document.getElementById("descripcion");
const fecha = document.getElementById("fecha");
const email = document.getElementById("email");
const telefono = document.getElementById("telefono");
const prioridad = document.getElementById("prioridad");
const estado = document.getElementById("estado");

const boton = document.getElementById("guardar");
const lista = document.getElementById("lista");
const error = document.getElementById("error");
const filtroEstado = document.getElementById("filtroEstado");
const contador = document.getElementById("contador");

let tareas = [];
let editando = -1;

const guardado = localStorage.getItem("tareas");

if (guardado) {
    tareas = JSON.parse(guardado);
    mostrar();
}

titulo.addEventListener("input", function () {
    if (titulo.value.trim() === "") {
        error.textContent = "Campo obligatorio";
        
    } else {
        error.textContent = "";
    }
});

boton.addEventListener("click", function () {

    if (titulo.value.trim() === "" || email.value.trim() === "") {
        error.textContent = "Completar campos";
        return;
    }

    if (!email.value.includes("@")) {
        error.textContent = "Email inválido";
        return;
    }
    
    if (prioridad.value === "") {
    error.textContent = "Seleccionar prioridad";
    return;
}

    error.textContent = "";

    const tarea = {
        titulo: titulo.value,
        descripcion: descripcion.value,
        fecha: fecha.value,
        email: email.value,
        telefono: telefono.value,
        prioridad: prioridad.value,
        estado: estado.value
    };

    if (editando === -1) {
        tareas.push(tarea);
    } else {
        tareas[editando] = tarea;
        editando = -1;
    }

    localStorage.setItem("tareas", JSON.stringify(tareas));

    limpiar();
    mostrar();
});

filtroEstado.addEventListener("change", mostrar);

function mostrar() {

    lista.innerHTML = "";

    if (tareas.length === 0) {
    lista.innerHTML = "<p>No hay tareas</p>";
    return;
}

    let pendientes = 0;
    let completadas = 0;

    tareas.sort(function (a, b) {
        return new Date(a.fecha) - new Date(b.fecha);
    });

    tareas.forEach(function (t, index) {

        if (filtroEstado.value !== "" && t.estado !== filtroEstado.value) {
            return;
        }

        if (t.estado === "pendiente") pendientes++;
        else completadas++;

        const li = document.createElement("li");
        li.textContent = t.titulo + " - " + t.prioridad + " - " + t.estado;
        li.classList.add(t.estado);

        const eliminar = document.createElement("button");
        eliminar.textContent = "X";

        eliminar.addEventListener("click", function () {
            tareas.splice(index, 1);
            localStorage.setItem("tareas", JSON.stringify(tareas));
            mostrar();
        });

        const editar = document.createElement("button");
        editar.textContent = "Editar";

        editar.addEventListener("click", function () {
            titulo.value = t.titulo;
            descripcion.value = t.descripcion;
            fecha.value = t.fecha;
            email.value = t.email;
            telefono.value = t.telefono;
            prioridad.value = t.prioridad;
            estado.value = t.estado;
            editando = index;
        });

        li.appendChild(eliminar);
        li.appendChild(editar);

        lista.appendChild(li);
    });

    contador.textContent =
    "Pendientes: " + pendientes + " | Completadas: " + completadas;
}

function limpiar() {
    titulo.value = "";
    descripcion.value = "";
    fecha.value = "";
    email.value = "";
    telefono.value = "";
    prioridad.value = "";
    estado.value = "";
};