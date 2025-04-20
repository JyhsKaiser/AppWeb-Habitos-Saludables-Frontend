document.addEventListener('DOMContentLoaded', function () {
    const usuarioId = sessionStorage.getItem('usuarioId');

    if (!usuarioId) {
        // Redirigir al login o mostrar error
        window.location.href = './Login.html';
        // Opcional: Mostrar mensaje antes de redirigir
        // alert('Debes iniciar sesión para acceder'); 
    }
});




document.getElementById('aCerrarSesion').addEventListener('click', (event) => {
    event.preventDefault();
    // Eliminar todos los datos de sesión
    sessionStorage.clear(); // Opción nuclear (recomendado)
    // O específicamente: sessionStorage.removeItem('usuarioId');
    window.location.href = './Login.html';
});
