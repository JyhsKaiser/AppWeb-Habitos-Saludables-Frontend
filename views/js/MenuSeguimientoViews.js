document.getElementById('btn-seccion-seguimiento').addEventListener('click', async () => {


    try {
        const respuestaHabitos = await fetch(`http://localhost:8080/menu/habito/${sessionStorage.getItem('usuarioId')}`);
        const datosHabitos = await respuestaHabitos.json();
        // console.log(datosHabitos);
        const nombreHabito = document.getElementById('nombreHabitoConsulta').value;
        let verificarNombreHabito = false;
        if (nombreHabito === "") {
            document.getElementById('alertaVacio').style.display = 'block';
            setTimeout(() => {
                document.getElementById('alertaVacio').style.display = 'none';
            }, 5000);
            return;
        }
        datosHabitos.forEach(item => {
            if (item.nombre === nombreHabito) {
                verificarNombreHabito = true;
                return;
            }
        });
        if (!verificarNombreHabito) {
            document.getElementById('alertaFracaso').style.display = 'block';
            setTimeout(() => {
                document.getElementById('alertaFracaso').style.display = 'none';
            }, 5000);
            return;
        }
    } catch (error) {

    }
    document.getElementById('seccionAñadirSeguimiento').style.display = 'block';
    document.getElementById('contenedor-consultar-seguimiento').style.display = 'none';
    document.getElementById('seccionModificarSeguimiento').style.display = 'none';
    document.getElementById('seguimiento-seleccionado').style.display = 'none';
});

document.getElementById('verifModificarSeguimientoById').addEventListener('click', async (event) => {
    event.preventDefault();
    document.getElementById("seccionModificarSeguimiento").style.display = "block";
    document.getElementById('seguimiento-seleccionado').style.display = "none";
    document.getElementById('contenedor-consultar-seguimiento').style.display = "none";
    try {
        const usuarioIdTransient = sessionStorage.getItem('usuarioId');
        const seguimientoIdTransient = sessionStorage.getItem('seguimientoSeleccionadoId');
        const nombreHabito = document.getElementById('nombreHabitoConsulta').value;
        const respuestaHabitos = await fetch(`http://localhost:8080/menu/habito/${usuarioIdTransient}`);
        const datosHabitos = await respuestaHabitos.json();
        datosHabitos.forEach(async item => {
            if (item.nombre === nombreHabito) {
                const respuestaSeguimientoConsulta = await fetch(`http://localhost:8080/menu/seguimiento/${nombreHabito}`);
                const dataSeguimientoConsulta = await respuestaSeguimientoConsulta.json();
                dataSeguimientoConsulta.forEach(itemSeg => {
                    if (seguimientoIdTransient == itemSeg.seguimientoId) {
                        document.getElementById('fechaSeguimientoMod').value = itemSeg.fecha;
                        document.getElementById('comentariosSeguimientoMod').value = itemSeg.comentario;
                    }
                })
            }
        });

    } catch (error) {

    }
})