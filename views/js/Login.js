document.getElementById('login').addEventListener('submit', async function (event) {
    event.preventDefault();

    let email = document.getElementById('correo').value;
    let contraseña = document.getElementById('contraseña').value;

    try {
        const respuesta = await fetch(`http://localhost:8080/menu/usuario/${email}/${contraseña}`);
        if (!respuesta.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        const data = await respuesta.json();
        const usuarioId = data.usuarioId; // Asumiendo que el servidor devuelve un campo 'usuarioId'
        console.log("ID del usuario:" + usuarioId);

        sessionStorage.setItem('usuarioId', data.usuarioId);

        // Redirigir a la página de inicio o a la página deseada
        window.location.href = './Menu.html';
    } catch (error) {
        console.error('Error:', error);
        // alert('Hubo un problema con la solicitud. Por favor, intenta de nuevo.');
    }
});

