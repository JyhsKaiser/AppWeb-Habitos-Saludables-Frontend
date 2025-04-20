// ------------------------- Consulta Seguimiento por Nombre de Habito --------------------------------
document.getElementById('btn-consultar-seguimiento').addEventListener('click', async (event) => {
    event.preventDefault();
    const nombreHabito = document.getElementById("nombreHabitoConsulta").value;
    // console.log(nombreHabito);
    document.getElementById('seguimiento-seleccionado').style.display = 'none';
    document.getElementById('seccionAñadirSeguimiento').style.display = 'none';
    document.getElementById('seccionModificarSeguimiento').style.display = 'none';

    if (nombreHabito === "") {
        document.getElementById('alertaVacio').style.display = 'block';
        setTimeout(() => {
            document.getElementById('alertaVacio').style.display = 'none';
        }, 5000);
        return;
    }
    try {

        const respuestaSeguimientoConsulta = await fetch(`http://localhost:8080/menu/seguimiento/${nombreHabito}`);
        const dataSeguimientoConsulta = await respuestaSeguimientoConsulta.json();
        // console.log(dataSeguimientoConsulta);



        const contenedorSeguimiento = document.getElementById('seguimientos-container');
        contenedorSeguimiento.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos elementos



        dataSeguimientoConsulta.forEach(item => {

            const input = document.createElement('input');
            input.setAttribute('type', 'checkbox');
            input.setAttribute('class', 'form-check-input');
            input.setAttribute('id', 'flexCheckDefault');

            if (item.estado) {
                input.setAttribute('checked', 'checked');
            } else {
                input.removeAttribute('checked');
            }

            input.setAttribute('disabled', 'disabled');

            const fila = document.createElement('tr');
            fila.setAttribute('data-bs-toggle', 'collapse');
            fila.setAttribute('href', '#collapseExample');
            fila.setAttribute('aria-expanded', 'false');
            fila.innerHTML = `
                <td>${item.fecha}</td>
                <td>${item.comentario}</td>                
                <td>${input.outerHTML}</td>
            `;
            contenedorSeguimiento.appendChild(fila);

            fila.addEventListener('click', (event) => {
                document.getElementById('seguimiento-seleccionado').style.display = 'block';
                // Guardar el ID del seguimiento en sessionStorage
                sessionStorage.setItem('seguimientoSeleccionadoId', item.seguimientoId);
                console.log(sessionStorage.getItem('seguimientoSeleccionadoId'));
                document.querySelectorAll('tr').forEach(row => {
                    row.classList.remove('table-active'); // Bootstrap usa 'table-active'
                });
                fila.classList.add('table-active'); // Resaltado de Bootstrap
            });

        });
        document.getElementById('contenedor-consultar-seguimiento').style.display = 'block';


    } catch (error) {
        document.getElementById('contenedor-consultar-seguimiento').style.display = 'none';

        document.getElementById('alertaFracaso').style.display = 'block';
        setTimeout(() => {
            document.getElementById('alertaFracaso').style.display = 'none';
        }, 5000);
    }
})

/* ---------------------------- Carga Lista de Habitos al Cargar la Pagina -------------------------------- */
document.addEventListener('DOMContentLoaded', async (event) => {
    event.preventDefault();
    try {
        sessionStorage.removeItem('habitoId');
        console.log(sessionStorage.getItem('habitoId'));
        const usuarioIdTransient = sessionStorage.getItem('usuarioId');
        const respuestaHabitos = await fetch(`http://localhost:8080/menu/habito/${usuarioIdTransient}`);
        const datosHabitos = await respuestaHabitos.json();
        console.log(datosHabitos);
        const contenedor = document.getElementById('habitos-container');
        contenedor.innerHTML = '';
        datosHabitos.forEach(item => {
            const fila = document.createElement('tr');
            fila.setAttribute('data-bs-toggle', 'collapse');
            fila.setAttribute('href', '#collapseExample');
            fila.setAttribute('aria-expanded', 'false');
            fila.innerHTML = `
                    <td>${item.nombre}</td>
                    <td>${item.categoria}</td>
                    <td>${item.descripcion}</td>                
                `;
            // Agregar event listener a cada fila
            // fila.addEventListener('click', function () {
            //     // Guardar el ID del hábito en sessionStorage
            //     sessionStorage.setItem('habitoSeleccionadoId', item.habitoId);

            //     document.querySelectorAll('tr').forEach(row => {
            //         row.classList.remove('table-active'); // Bootstrap usa 'table-active'
            //     });
            //     fila.classList.add('table-active'); // Resaltado de Bootstrap
            // });
            contenedor.appendChild(fila);
        })

    } catch (error) {

    }

});

// ------------------------ Añadir seguimiento ------------------------
document.getElementById('btn-agregar-seguimiento').addEventListener('click', async (event) => {
    event.preventDefault();
    const usuarioIdTransient = sessionStorage.getItem('usuarioId');
    const nombreHabito = document.getElementById('nombreHabitoConsulta').value;

    const fecha = document.getElementById('fechaSeguimiento').value;
    const comentarios = document.getElementById('comentariosSeguimiento').value;
    const checkbox = document.getElementById('cumplido');
    const estado = checkbox.checked ? 1 : 0;
    try {
        const respuestaHabitos = await fetch(`http://localhost:8080/menu/habito/${usuarioIdTransient}`);
        const datosHabitos = await respuestaHabitos.json();

        datosHabitos.forEach(async (item) => {
            if (item.nombre === nombreHabito) {
                const formDataObj = {
                    fecha: fecha,
                    estado: estado,
                    comentario: comentarios,
                    usuarioIdTransient: usuarioIdTransient,
                    habitoIdTransient: item.habitoId
                };
                console.log(formDataObj);

                const respuestaSeguimiento = await fetch(`http://localhost:8080/menu/seguimiento`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formDataObj)
                });
            }
        });
        document.getElementById('alertaExito').style.display = 'block';
        setTimeout(() => {
            document.getElementById('alertaExito').style.display = 'none';
        }, 5000);
    } catch (error) {

    }


    document.getElementById('seccionAñadirSeguimiento').style.display = 'none';


})

// ------------------------ Editar seguimiento ------------------------
document.getElementById('btn-modificar-seguimiento').addEventListener('click', async (event) => {
    event.preventDefault();
    const usuarioIdTransient = sessionStorage.getItem('usuarioId');
    const seguimientoIdTransient = sessionStorage.getItem('seguimientoSeleccionadoId');
    const nombreHabito = document.getElementById('nombreHabitoConsulta').value;
    const fecha = document.getElementById('fechaSeguimientoMod').value;
    const comentarios = document.getElementById('comentariosSeguimientoMod').value;
    const checkbox = document.getElementById('cumplidoMod');
    const estado = checkbox.checked ? 1 : 0;

    console.log(comentarios)

    try {
        const respuestaHabitos = await fetch(`http://localhost:8080/menu/habito/${usuarioIdTransient}`);
        const datosHabitos = await respuestaHabitos.json();



        datosHabitos.forEach(async (item) => {



            if (item.nombre === nombreHabito) {
                const formDataObj = {
                    seguimientoId: seguimientoIdTransient,
                    fecha: fecha,
                    estado: estado,
                    comentario: comentarios
                };
                console.log(formDataObj);

                const respuestaSeguimiento = await fetch(`http://localhost:8080/menu/seguimiento`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formDataObj)
                });
            }
        });


        const respuestaSeguimientoConsulta = await fetch(`http://localhost:8080/menu/seguimiento/${nombreHabito}`);
        const dataSeguimientoConsulta = await respuestaSeguimientoConsulta.json();
        // console.log(dataSeguimientoConsulta);
        // document.getElementById('contenedor-consultar-seguimiento').style.display = 'block';
        document.getElementById('alertaExito').style.display = 'block';
        setTimeout(() => {
            document.getElementById('alertaExito').style.display = 'none';
        }, 5000);

    } catch (error) {

    }


    document.getElementById('seccionAñadirSeguimiento').style.display = 'none';
    document.getElementById('seccionModificarSeguimiento').style.display = 'none';

})

// ------------------------ Eliminar seguimiento ------------------------
document.getElementById('btn-eliminar-seguimiento').addEventListener('click', async (event) => {
    event.preventDefault();
    const seguimientoIdTransient = sessionStorage.getItem('seguimientoSeleccionadoId');
    const nombreHabito = document.getElementById('nombreHabitoConsulta').value;
    console.log(seguimientoIdTransient);
    try {
        const respuestaSeguimiento = await fetch(`http://localhost:8080/menu/seguimiento/${seguimientoIdTransient}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        document.getElementById('alertaExito').style.display = 'block';
        setTimeout(() => {
            document.getElementById('alertaExito').style.display = 'none';
        }, 5000);
    } catch (error) {

    }

    document.getElementById('seccionModificarSeguimiento').style.display = 'none';
    document.getElementById('contenedor-consultar-seguimiento').style.display = 'none';
    document.getElementById('seguimiento-seleccionado').style.display = 'none';
})