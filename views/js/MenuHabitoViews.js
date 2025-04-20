/* ------------------------------------ Enlaces de las Cards HAbitos ------------------------------------ */
document.getElementById('aAñadirHabito').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('aAñadirHabito').className = 'nav-link active';
    document.getElementById('aConsultarHabito').className = 'nav-link';

    document.getElementById('agregar').style.display = 'block';
    document.getElementById('consultar').style.display = 'none';

    sessionStorage.removeItem('habitoSeleccionadoId');

});
document.getElementById('aConsultarHabito').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('aAñadirHabito').className = 'nav-link';
    document.getElementById('aConsultarHabito').className = 'nav-link active';

    document.getElementById('agregar').style.display = 'none';
    document.getElementById('consultar').style.display = 'block';

});

// habitoID;
document.getElementById('modificarView').addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('modificar').style.display = 'block';
    document.getElementById('nombreHabitoMod').value = sessionStorage.getItem('nombreHabito');
    document.getElementById('categoriaHabitoMod').value = sessionStorage.getItem('categoriaHabito');
    document.getElementById('descripcionHabitoMod').value = sessionStorage.getItem('descripcionHabito');
    // const habitoID = sessionStorage.getItem('habitoSeleccionadoId'); // Obtener el ID del usuario desde sessionStorage
    // console.log(habitoID);
});

document.getElementById('verifEliminarHabitoById').addEventListener('click', (event) => {
    const habitoId = sessionStorage.getItem('habitoSeleccionadoId');

    if (!habitoId) {
        document.getElementById('alertaFracaso').style.display = 'block';
        setTimeout(() => {
            document.getElementById('alertaFracaso').style.display = "none";
        }, 5000)
        return;
    }
    // Obtener el modal por ID
    const myModal = new bootstrap.Modal(document.getElementById('exampleModal'));

    // Abrir el modal
    myModal.show();
})

/*------------------------------- Cerrar Sesion----------------- */
// document.getElementById('aCerrarSesion').addEventListener('click', (event) => {
//     event.preventDefault();
//     // ------- Limpia todos los datos de habitos -------------------
//     sessionStorage.removeItem('habitoSeleccionadoId');
//     sessionStorage.removeItem('nombreHabito');
//     sessionStorage.removeItem('categoriaHabito');
//     sessionStorage.removeItem('descripcionHabito');
//     // --------- Limpia todos lo datos de usuario ---------------------
//     sessionStorage.removeItem('usuarioId');
//     sessionStorage.removeItem('correoUsuario');
//     window.location.href = './Login.html';
// });