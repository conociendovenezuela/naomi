// =========================================================
// NAVEGACIÓN POR PESTAÑAS
// =========================================================
function mostrarPestana(id, boton) {
  // 1. Ocultar todas las pestañas
  document.querySelectorAll('.pestana').forEach(function(p) {
    p.classList.remove('activa');
  });

  // 2. Mostrar la pestaña seleccionada
  var target = document.getElementById(id);
  if (target) {
    target.classList.add('activa');
  }

  // 3. Actualizar botón activo del menú
  document.querySelectorAll('#menu button').forEach(function(b) {
    b.classList.remove('activo');
  });
  if (boton) {
    boton.classList.add('activo');
  } else {
    // Si viene de un botón interno, buscamos el botón correspondiente en el menú
    var mapa = ['inicio','identidad','organigrama','sedes','departamentos',
                'diagnostico','inventario','soporte','recursos','equipo'];
    var idx = mapa.indexOf(id);
    var botones = document.querySelectorAll('#menu button');
    if (idx >= 0 && botones[idx]) botones[idx].classList.add('activo');
  }

  // 4. Volver arriba
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =========================================================
// FILTRO DE LA TABLA DE INVENTARIO
// =========================================================
function filtrarTabla() {
  var sede = document.getElementById('filtroSede').value;
  var estado = document.getElementById('filtroEstado').value;
  var filas = document.querySelectorAll('#tablaEquipos tbody tr');

  filas.forEach(function(fila) {
    var okSede = !sede || fila.dataset.sede === sede;
    var okEstado = !estado || fila.dataset.estado === estado;
    fila.style.display = (okSede && okEstado) ? '' : 'none';
  });
}
