function listarSeguimientos(opc) {
    console.log("Hola!");
    const usuarioIdTransient = sessionStorage.getItem('usuarioId');
    let api = "";
    switch (opc) {
        case 1:
            let fecha = document.getElementById('fechaSeguimiento').value;
            if (fecha === "") {
                document.getElementById('alertaVacio').style.display = 'block';
                setTimeout(() => {
                    document.getElementById('alertaVacio').style.display = 'none';
                }, 5000);
                return;
            }
            api = `http://localhost:8080/menu/seguimiento/${fecha}/${usuarioIdTransient}`;
            break;
        case 2:
            let fechaInicio = document.getElementById('fechaInicioSeguimiento').value;
            let fechaFin = document.getElementById('fechaFinSeguimiento').value;
            if (fechaInicio === "" || fechaFin === "") {
                document.getElementById('alertaVacio').style.display = 'block';
                setTimeout(() => {
                    document.getElementById('alertaVacio').style.display = 'none';
                }, 5000);
                return;
            }
            api = `http://localhost:8080/menu/seguimiento/entre_fechas/Inicio_${fechaInicio}/Fin_${fechaFin}/usuario_${usuarioIdTransient}`;
            break;
        case 3:
            api = `http://localhost:8080/menu/usuario/${usuarioIdTransient}`;
            break;
        case 4:
            let estado = document.getElementById('estadoSeguimiento').value;
            if (estado === "") {
                document.getElementById('alertaVacio').style.display = 'block';
                setTimeout(() => {
                    document.getElementById('alertaVacio').style.display = 'none';
                }, 5000);
                return;
            }
            api = `http://localhost:8080/menu/seguimiento/estado/usuario_${usuarioIdTransient}/estado_${estado}`;
            break;
        default:
            break;
    }

    $("#tabla_seguimientos").DataTable({
        destroy: true,
        ajax: {
            type: "GET",

            url: api,
            "dataSrc": ""
        },
        columns: [
            { data: "seguimiento_id" },
            { data: 'estado' },
            { data: 'fecha' },
            { data: 'comentario' }
        ],

        "iDisplayLength": 3,
        order: [2, 'desc'],

    });
}