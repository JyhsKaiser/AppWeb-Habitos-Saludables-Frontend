// Ingresar datos
document.getElementById('registro').addEventListener('submit', async function (event) {
    event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional

    const formData = new FormData(this);
    const formDataObj = Object.fromEntries(formData.entries());


    // Verifica si el email es correcto
    let email = document.getElementById('email').value;
    // let emailRegex = /^[a-zA-Z\d._%+-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    // if (!emailRegex.test(email)) {
    //     document.getElementById('verif-correo').style.display = 'block';
    //     setTimeout(() => {
    //         document.getElementById('verif-correo').style.display = "none";
    //     }, 5000); // Oculta el contenedor después de 3 segundos
    //     alert('El email no es correcto');
    //     return;
    // }
    try {
        // Verifica si el correo ya está registrado
        const respuesta = await fetch(`http://localhost:8080/menu/usuario/email/${email}`);
        const data = await respuesta.json();
        if (data) { // Asumiendo que el servidor devuelve un campo 'exists' que indica si el correo ya está registrado
            document.getElementById('verif-correo-ya-existe').style.display = 'block';
            setTimeout(() => {
                document.getElementById('verif-correo-ya-existe').style.display = "none";
            }, 5000); // Oculta el contenedor después de 5 segundos
            document.getElementById('email').value = '';
            return;
        }


    } catch (error) {
        // alert('Error al enviar el formulario, revisa los campos que llenaste');
    }


    // Verifica si las contraseñas son iguales
    // let pass1 = document.getElementById('contraseña1').value;
    // let pass2 = document.getElementById('contraseña2').value;
    // if (pass1 != pass2) {
    //     document.getElementById('verif-contraseñas').style.display = 'block';
    //     setTimeout(() => {
    //         document.getElementById('verif-contraseñas').style.display = "none";
    //     }, 5000); // Oculta el contenedor después de 3 segundos

    //     return;
    // }


    try {

        const response = await fetch('http://localhost:8080/menu/usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObj)
        });

        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        // Limpiar los campos del formulario
        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = '';
        document.getElementById('email').value = '';
        document.getElementById('contraseña1').value = '';
        document.getElementById('contraseña2').value = '';

        // Mostrar el modal de éxito
        let successModal = new bootstrap.Modal(document.getElementById('successModal'));
        successModal.show();



    } catch (error) {
        alert('Error al enviar el formulario, revisa los campos que llenaste');
    }
});