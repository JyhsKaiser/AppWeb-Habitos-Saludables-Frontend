// Obtener Los datos
document.getElementById('aHabitos').addEventListener('click', async function (event) {
    try {
        const response = await fetch('http://localhost:8080/menu/usuario'); // URL de tu API para obtener los datos
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        const data = await response.json();
        const container = document.getElementById('consultar-cuenta');
        container.innerHTML = ''; // Limpiar cualquier contenido previo

        data.forEach(item => {
            const paragraph = document.createElement('p');
            // paragraph.textContent = `ID: ${item.id}, Nombre: ${item.nombre}, Genero: ${item.genero}, Edad: ${item.edad}`;
            paragraph.textContent = `ID: ` + item.usuarioId + `, Nombre: ${item.nombre}, Apellido: ${item.apellido}, Email: ${item.email}, Contraseña: ${item.contraseña}`;
            container.appendChild(paragraph);

        });



    } catch (error) {
        console.error('Error al obtener los datos: ', error);
    }
});