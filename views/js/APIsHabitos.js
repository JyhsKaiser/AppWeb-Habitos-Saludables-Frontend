
// ---------------------------------- Consultar Habito ----------------- -----------------
document.getElementById('aConsultarHabito').addEventListener('click', async function (event) {
    event.preventDefault();
    const usuarioId = sessionStorage.getItem('usuarioId'); // Obtener el ID del usuario desde sessionStorage
    // console.log(usuarioId);
    try {
        const respuesta = await fetch(`http://localhost:8080/menu/habito/${usuarioId}`);
        if (!respuesta.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        const data = await respuesta.json();
        const container = document.getElementById('habitos-container');
        container.innerHTML = ''; // Limpiar cualquier contenido previo
        data.forEach(item => {

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
            fila.addEventListener('click', function () {
                // Guardar el ID del hábito en sessionStorage
                sessionStorage.setItem('habitoSeleccionadoId', item.habitoId);
                sessionStorage.setItem('nombreHabito', item.nombre);
                sessionStorage.setItem('categoriaHabito', item.categoria);
                sessionStorage.setItem('descripcionHabito', item.descripcion);
                document.getElementById('modificar').style.display = 'none';
                document.getElementById('habitoSeleccionado').style.display = 'block';

                document.querySelectorAll('tr').forEach(row => {
                    row.classList.remove('table-active'); // Bootstrap usa 'table-active'
                });
                fila.classList.add('table-active'); // Resaltado de Bootstrap

            });

            container.appendChild(fila);

        });

    } catch (error) {

    }

});

// ---------------------------------- Guardar Habito ----------------- -----------------
document.getElementById('btn-guardar-habito').addEventListener('click', async function (event) {
    event.preventDefault();
    const usuarioId = sessionStorage.getItem('usuarioId'); // Obtener el ID del usuario desde sessionStorage
    console.log(usuarioId);
    const nombre = document.getElementById('nombreHabito').value;
    const categoria = document.getElementById('categoriaHabito').value;
    const descripcion = document.getElementById('descripcionHabito').value;


    try {

        const formDataObj = {
            nombre: nombre,
            categoria: categoria,
            descripcion: descripcion,
            usuarioIdTransient: usuarioId
        };

        console.log(formDataObj);
        const response = await fetch('http://localhost:8080/menu/habito', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObj)
        });

        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        document.getElementById('nombreHabito').value = '';
        document.getElementById('categoriaHabito').value = '';
        document.getElementById('descripcionHabito').value = '';

    } catch (error) {
        console.error('Error:', error);
    }

    document.getElementById('alertaExito').style.display = 'block';
    setTimeout(() => {
        document.getElementById('alertaExito').style.display = "none";
    }, 5000); // Oculta el contenedor después de 5 segundos

});

// ----------------------------------Modificar Habito----------------- -----------------
document.getElementById('btn-modificar-habito').addEventListener('click', async function (event) {
    event.preventDefault();
    const usuarioId = sessionStorage.getItem('usuarioId'); // Obtener el ID del usuario desde sessionStorage
    const nombre = document.getElementById('nombreHabitoMod').value;
    const categoria = document.getElementById('categoriaHabitoMod').value;
    const descripcion = document.getElementById('descripcionHabitoMod').value;
    const habitoId = sessionStorage.getItem('habitoSeleccionadoId');
    try {

        const formDataObj = {
            nombre: nombre,
            categoria: categoria,
            descripcion: descripcion,
            habitoId: habitoId
        };

        console.log(formDataObj);
        const response = await fetch(`http://localhost:8080/menu/habito/${habitoId}/${nombre}/${categoria}/${descripcion}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObj)
        });

        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        // --------------------- Recargar la tabla de hábitos después de modificar uno ------------------------
        const respuesta = await fetch(`http://localhost:8080/menu/habito/${usuarioId}`);
        if (!respuesta.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        const data = await respuesta.json();
        const container = document.getElementById('habitos-container');
        container.innerHTML = ''; // Limpiar cualquier contenido previo
        data.forEach(item => {

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
            fila.addEventListener('click', function () {
                // Guardar el ID del hábito en sessionStorage
                sessionStorage.setItem('habitoSeleccionadoId', item.habitoId);
                sessionStorage.setItem('nombreHabito', item.nombre);
                sessionStorage.setItem('categoriaHabito', item.categoria);
                sessionStorage.setItem('descripcionHabito', item.descripcion);
                document.getElementById('modificar').style.display = 'none';

                document.querySelectorAll('tr').forEach(row => {
                    row.classList.remove('table-active'); // Bootstrap usa 'table-active'
                });
                fila.classList.add('table-active'); // Resaltado de Bootstrap
            });

            container.appendChild(fila);

        });
        document.getElementById('')
        document.getElementById('modificar').style.display = 'none';
        document.getElementById('nombreHabitoMod').value = '';
        document.getElementById('categoriaHabitoMod').value = '';
        document.getElementById('descripcionHabitoMod').value = '';


    } catch (error) {
        console.error('Error:', error);
    }
});

// ----------------------------------Eliminar Habito----------------- -----------------
document.getElementById('btn-eliminar-habito').addEventListener('click', async function (event) {
    // event.preventDefault();
    const habitoId = sessionStorage.getItem('habitoSeleccionadoId');

    if (!habitoId) {

        return;
    }

    try {

        const response = await fetch(`http://localhost:8080/menu/habito/delete/${habitoId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        sessionStorage.removeItem('habitoSeleccionadoId'); // Limpiar el ID del hábito de sessionStorage

    } catch (error) {
        console.error('Error:', error);
    }

    const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
    modal.hide(); // Cierra el modal

    const usuarioId = sessionStorage.getItem('usuarioId'); // Obtener el ID del usuario desde sessionStorage

    try {
        // --------------------- Recargar la tabla de hábitos después de Eliminar uno ------------------------
        const respuesta = await fetch(`http://localhost:8080/menu/habito/${usuarioId}`);
        if (!respuesta.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        const data = await respuesta.json();
        const container = document.getElementById('habitos-container');
        container.innerHTML = ''; // Limpiar cualquier contenido previo
        data.forEach(item => {

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
            fila.addEventListener('click', function () {
                // Guardar el ID del hábito en sessionStorage
                sessionStorage.setItem('habitoSeleccionadoId', item.habitoId);
                sessionStorage.setItem('nombreHabito', item.nombre);
                sessionStorage.setItem('categoriaHabito', item.categoria);
                sessionStorage.setItem('descripcionHabito', item.descripcion);
                document.getElementById('modificar').style.display = 'none';

                document.querySelectorAll('tr').forEach(row => {
                    row.classList.remove('table-active'); // Bootstrap usa 'table-active'
                });
                fila.classList.add('table-active'); // Resaltado de Bootstrap

            });

            container.appendChild(fila);

        });
    } catch (error) {

    }
});
