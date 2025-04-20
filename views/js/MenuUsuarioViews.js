/* ------------------------------------ Enlaces de las Cards ------------------------------------ */
document.getElementById('aModificarCuenta').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('aModificarCuenta').className = 'nav-link active';
    document.getElementById('aConsultarCuenta').className = 'nav-link';
    document.getElementById('aEliminarCuenta').className = 'nav-link';

    document.getElementById('consultar-cuenta').style.display = 'none';
    document.getElementById('modificar-cuenta').style.display = 'block';
});
document.getElementById('aConsultarCuenta').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('aModificarCuenta').className = 'nav-link';
    document.getElementById('aConsultarCuenta').className = 'nav-link active';
    document.getElementById('aEliminarCuenta').className = 'nav-link';

    document.getElementById('consultar-cuenta').style.display = 'block';
    document.getElementById('modificar-cuenta').style.display = 'none';

});

// document.getElementById('aEliminarCuenta').addEventListener('click', function (event) {
//     event.preventDefault();
//     document.getElementById('aModificarCuenta').className = 'nav-link';
//     document.getElementById('aConsultarCuenta').className = 'nav-link';
//     document.getElementById('aEliminarCuenta').className = 'nav-link active';

//     document.getElementById('consultar-cuenta').style.display = 'none';
//     document.getElementById('modificar-cuenta').style.display = 'none';
// });
