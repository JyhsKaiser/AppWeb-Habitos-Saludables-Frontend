
// ------------------------------------ Consultar cuenta ---------------------------------------
document.getElementById('aConsultarCuenta').addEventListener('click', async function (event) {
    try {
        const usuarioId = sessionStorage.getItem('usuarioId'); // Obtener el ID del usuario desde sessionStorage

        if (!usuarioId) {
            throw new Error('No se encontró el ID del usuario en sessionStorage');
        }

        const response = await fetch(`http://localhost:8080/menu/usuario/${usuarioId}`); // URL de tu API para obtener los datos
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        const data = await response.json();
        document.getElementById('nombre').value = data.nombre;
        document.getElementById('apellido').value = data.apellido;
        document.getElementById('correo').value = data.email;
        document.getElementById('contraseña').value = data.contraseña;

    } catch (error) {
        console.error('Error al obtener los datos: ', error);
        alert('Hubo un problema al obtener los datos del usuario. Por favor, intenta de nuevo.');
    }
}
);



// ------------------------------------ Modificar usuario ---------------------------------------
document.getElementById("Modificar-cuenta").addEventListener("submit", async function (event) {
    // event.preventDefault();

    const usuarioId = sessionStorage.getItem('usuarioId');
    if (!usuarioId) {
        alert('No se encontró el ID del usuario en sessionStorage');
        return;
    }

    const nombre = document.getElementById("nombreMod").value;
    const apellido = document.getElementById("apellidoMod").value;
    const contraseña = document.getElementById("contraseña1").value;
    const confirmarContraseña = document.getElementById("contraseña2").value;

    // Validar que las contraseñas coincidan
    if (contraseña !== confirmarContraseña) {
        document.getElementById('verif-contraseñas').style.display = 'block';
        setTimeout(() => {
            document.getElementById('verif-contraseñas').style.display = "none";
        }, 5000); // Oculta el contenedor después de 5 segundos
        return;
    }

    // Validar campos obligatorios
    if (!nombre || !apellido) {
        // alert('Nombre y apellido son obligatorios');
        document.getElementById('verif-nombre').style.display = 'block';
        document.getElementById('verif-apellido').style.display = 'block';
        setTimeout(() => {
            document.getElementById('verif-nombre').style.display = "none";
            document.getElementById('verif-apellido').style.display = "none";
        }, 5000); // Oculta el contenedor después de 5 segundos
        return;
    }

    const formDataObj = {
        usuarioId: usuarioId,
        nombre: nombre,
        apellido: apellido,
        contraseña: contraseña // Solo enviar si hay valor nuevo
    };
    console.log(formDataObj);

    try {
        const response = await fetch(`http://localhost:8080/menu/usuario`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObj)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error en la respuesta del servidor');
        }

        const result = await response.json();
        alert('Usuario modificado correctamente');
        window.location.href = './MenuUsuario.html';
    } catch (error) {
        console.error('Error al modificar el usuario:', error);
        alert(error.message || 'Hubo un problema al modificar los datos del usuario.');
    }
});

// ------------------------------ Eliminar usuario ------------------------------------
document.getElementById('btn-eliminar').addEventListener('click', async function () {
    const usuarioId = sessionStorage.getItem('usuarioId'); // Obtener el ID del usuario desde sessionStorage

    if (!usuarioId) {
        alert('No se encontró el ID del usuario en sessionStorage');
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/menu/usuario/${usuarioId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        alert('Usuario eliminado correctamente');
        sessionStorage.clear(); // Limpiar el ID del usuario de sessionStorage
        window.location.href = './Login.html'; // Redirigir a la página de inicio o a la página deseada
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        alert(error.message || 'Hubo un problema al eliminar el usuario.');
    }
}
);
