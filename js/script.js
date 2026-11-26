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
    var mapa = ['inicio','','organigrama','sedes','',
                '','inventario','soporte','sesiones',''];
    var idx = mapa.indexOf(id);
    var botones = document.querySelectorAll('#menu button');
    if (idx >= 0 && botones[idx]) botones[idx].classList.add('activo');
  }

  // 4. Volver arriba
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =========================================================
// INVENTARIO DE EQUIPOS (40 EQUIPOS)
// =========================================================
const inventarioEquipos = [
  // Sede Principal - Ciudad Guayana, Estado Bolívar (19 equipos)
  { codigo: "CV-SP-01", marca: "Lenovo", modelo: "ThinkPad T14", ram: "16 GB", cpu: "Core i7-1165G7", so: "Win 11 Pro", depto: "Gerencia", sede: "Sede Principal", estado: "Operativo", claseEstado: "operativo", problema: "Sin fallas." },
  { codigo: "CV-SP-02", marca: "Lenovo", modelo: "ThinkPad T14", ram: "16 GB", cpu: "Core i7-1165G7", so: "Win 11 Pro", depto: "Gerencia", sede: "Sede Principal", estado: "Operativo", claseEstado: "operativo", problema: "Sin fallas." },
  { codigo: "CV-SP-03", marca: "Dell", modelo: "OptiPlex 7090", ram: "16 GB", cpu: "Core i5-11500", so: "Win 11 Pro", depto: "Planificación y Control", sede: "Sede Principal", estado: "Operativo", claseEstado: "operativo", problema: "Sin fallas." },
  { codigo: "CV-SP-04", marca: "Dell", modelo: "OptiPlex 7090", ram: "16 GB", cpu: "Core i5-11500", so: "Win 11 Pro", depto: "Planificación y Control", sede: "Sede Principal", estado: "Operativo", claseEstado: "operativo", problema: "Sin fallas." },
  { codigo: "CV-SP-05", marca: "HP", modelo: "ProDesk 400 G7", ram: "8 GB", cpu: "Core i5-10500", so: "Win 10 Pro", depto: "Administración y Finanzas", sede: "Sede Principal", estado: "Operativo", claseEstado: "operativo", problema: "Sin fallas." },
  { codigo: "CV-SP-06", marca: "HP", modelo: "ProDesk 400 G7", ram: "8 GB", cpu: "Core i5-10500", so: "Win 10 Pro", depto: "Administración y Finanzas", sede: "Sede Principal", estado: "Operativo", claseEstado: "operativo", problema: "Sin fallas." },
  { codigo: "CV-SP-07", marca: "HP", modelo: "ProDesk 400 G7", ram: "8 GB", cpu: "Core i5-10500", so: "Win 10 Pro", depto: "Administración y Finanzas", sede: "Sede Principal", estado: "Operativo", claseEstado: "operativo", problema: "Sin fallas." },
  { codigo: "CV-SP-08", marca: "HP", modelo: "ProDesk 400 G7", ram: "8 GB", cpu: "Core i5-10500", so: "Win 10 Pro", depto: "Administración y Finanzas", sede: "Sede Principal", estado: "En reparación", claseEstado: "reparacion", problema: "Desconexión intermitente de red LAN." },
  { codigo: "CV-SP-09", marca: "Dell", modelo: "Latitude 5420", ram: "8 GB", cpu: "Core i5-1135G7", so: "Win 10 Pro", depto: "Turismo Social", sede: "Sede Principal", estado: "Operativo", claseEstado: "operativo", problema: "Sin fallas." },
  { codigo: "CV-SP-10", marca: "Dell", modelo: "Latitude 5420", ram: "8 GB", cpu: "Core i5-1135G7", so: "Win 10 Pro", depto: "Turismo Social", sede: "Sede Principal", estado: "En reparación", claseEstado: "reparacion", problema: "Batería degradada (dura menos de 20 min)." },
  { codigo: "CV-SP-11", marca: "Lenovo", modelo: "ThinkCentre M720", ram: "8 GB", cpu: "Core i5-8400", so: "Win 10 Pro", depto: "Planificación y Control", sede: "Sede Principal", estado: "Operativo", claseEstado: "operativo", problema: "Lentitud al iniciar por disco mecánico (HDD)." },
  { codigo: "CV-SP-12", marca: "Lenovo", modelo: "ThinkCentre M720", ram: "8 GB", cpu: "Core i5-8400", so: "Win 10 Pro", depto: "Planificación y Control", sede: "Sede Principal", estado: "En reparación", claseEstado: "reparacion", problema: "Bloqueos frecuentes del explorador de archivos." },
  { codigo: "CV-SP-13", marca: "Lenovo", modelo: "ThinkCentre M720", ram: "8 GB", cpu: "Core i5-8400", so: "Win 10 Pro", depto: "Tecnología (TI)", sede: "Sede Principal", estado: "Operativo", claseEstado: "operativo", problema: "Sin fallas." },
  { codigo: "CV-SP-14", marca: "Dell", modelo: "OptiPlex 3050", ram: "4 GB", cpu: "Core i3-7100", so: "Win 10 Home", depto: "Turismo Social", sede: "Sede Principal", estado: "Operativo", claseEstado: "operativo", problema: "Rendimiento limitado con múltiples pestañas." },
  { codigo: "CV-SP-15", marca: "Dell", modelo: "OptiPlex 3050", ram: "4 GB", cpu: "Core i3-7100", so: "Win 10 Home", depto: "Turismo Social", sede: "Sede Principal", estado: "Crítico", claseEstado: "critico", problema: "Sobrecalentamiento y apagado repentino." },
  { codigo: "CV-SP-16", marca: "HP", modelo: "Compaq Pro 6300", ram: "4 GB", cpu: "Core i5-3470", so: "Win 7 Pro", depto: "Administración y Finanzas", sede: "Sede Principal", estado: "Obsoleto", claseEstado: "obsoleto", problema: "Sin soporte de seguridad; incompatible con software actual." },
  { codigo: "CV-SP-17", marca: "HP", modelo: "Compaq Pro 6300", ram: "4 GB", cpu: "Core i5-3470", so: "Win 7 Pro", depto: "Administración y Finanzas", sede: "Sede Principal", estado: "Obsoleto", claseEstado: "obsoleto", problema: "Fallos en fuente de poder y lentitud extrema." },
  { codigo: "CV-SP-18", marca: "Acer", modelo: "Aspire E15", ram: "4 GB", cpu: "Core i3-5005U", so: "Win 8.1", depto: "Turismo Social", sede: "Sede Principal", estado: "Obsoleto", claseEstado: "obsoleto", problema: "Teclado con teclas dañadas, bisagra rota y sin batería." },
  { codigo: "CV-SP-19", marca: "Lenovo", modelo: "ThinkCentre M91p", ram: "4 GB", cpu: "Core i3-2120", so: "Win 7 Pro", depto: "Recepción / Archivo", sede: "Sede Principal", estado: "Obsoleto", claseEstado: "obsoleto", problema: "Arquitectura antigua; solo usado para impresión básica." },

  // Sucursal 1 - Distrito Capital - Caracas (7 equipos)
  { codigo: "CV-S1-01", marca: "HP", modelo: "ProBook 440 G8", ram: "8 GB", cpu: "Core i5-1135G7", so: "Win 11 Pro", depto: "Turismo Social", sede: "Sucursal 1", estado: "Operativo", claseEstado: "operativo", problema: "Sin fallas." },
  { codigo: "CV-S1-02", marca: "Dell", modelo: "OptiPlex 5080", ram: "8 GB", cpu: "Core i5-10500", so: "Win 10 Pro", depto: "Atención al Trabajador", sede: "Sucursal 1", estado: "Operativo", claseEstado: "operativo", problema: "Sin fallas." },
  { codigo: "CV-S1-03", marca: "Dell", modelo: "OptiPlex 5080", ram: "8 GB", cpu: "Core i5-10500", so: "Win 10 Pro", depto: "Administración y Finanzas", sede: "Sucursal 1", estado: "Operativo", claseEstado: "operativo", problema: "Sin fallas." },
  { codigo: "CV-S1-04", marca: "Lenovo", modelo: "ThinkCentre M710", ram: "4 GB", cpu: "Core i3-7100", so: "Win 10 Pro", depto: "Atención al Trabajador", sede: "Sucursal 1", estado: "Crítico", claseEstado: "critico", problema: "Errores de lectura en disco (sectores dañados)." },
  { codigo: "CV-S1-05", marca: "Lenovo", modelo: "ThinkCentre M710", ram: "4 GB", cpu: "Core i3-7100", so: "Win 10 Pro", depto: "Turismo Social", sede: "Sucursal 1", estado: "Operativo", claseEstado: "operativo", problema: "Sin fallas." },
  { codigo: "CV-S1-06", marca: "HP", modelo: "ProDesk 400 G3", ram: "4 GB", cpu: "Core i3-6100", so: "Win 10 Home", depto: "Administración y Finanzas", sede: "Sucursal 1", estado: "Crítico", claseEstado: "critico", problema: "Pantallazos azules (BSOD) al abrir hojas de cálculo." },
  { codigo: "CV-S1-07", marca: "Dell", modelo: "OptiPlex 390", ram: "4 GB", cpu: "Core i3-2120", so: "Win 7 Pro", depto: "Atención al Trabajador", sede: "Sucursal 1", estado: "Obsoleto", claseEstado: "obsoleto", problema: "Hardware descontinuado; incapaz de ejecutar el sistema web." },

  // Sucursal 2 - Nueva Esparta - Isla de Margarita (7 equipos)
  { codigo: "CV-S2-01", marca: "Lenovo", modelo: "IdeaPad 5", ram: "8 GB", cpu: "Ryzen 5 5500U", so: "Win 11 Home", depto: "Turismo Social", sede: "Sucursal 2", estado: "Operativo", claseEstado: "operativo", problema: "Sin fallas." },
  { codigo: "CV-S2-02", marca: "HP", modelo: "EliteDesk 800 G6", ram: "16 GB", cpu: "Core i5-10500", so: "Win 11 Pro", depto: "Turismo Social", sede: "Sucursal 2", estado: "Operativo", claseEstado: "operativo", problema: "Sin fallas." },
  { codigo: "CV-S2-03", marca: "HP", modelo: "EliteDesk 800 G6", ram: "8 GB", cpu: "Core i5-10500", so: "Win 10 Pro", depto: "Administración y Finanzas", sede: "Sucursal 2", estado: "Operativo", claseEstado: "operativo", problema: "Sin fallas." },
  { codigo: "CV-S2-04", marca: "Dell", modelo: "OptiPlex 3060", ram: "8 GB", cpu: "Core i3-8100", so: "Win 10 Pro", depto: "Atención al Trabajador", sede: "Sucursal 2", estado: "Operativo", claseEstado: "operativo", problema: "Sin fallas." },
  { codigo: "CV-S2-05", marca: "Dell", modelo: "OptiPlex 3060", ram: "4 GB", cpu: "Core i3-8100", so: "Win 10 Pro", depto: "Atención al Trabajador", sede: "Sucursal 2", estado: "Crítico", claseEstado: "critico", problema: "Ruido excesivo en ventilador y lentitud crítica." },
  { codigo: "CV-S2-06", marca: "Lenovo", modelo: "V520", ram: "4 GB", cpu: "Core i3-7100", so: "Win 10 Home", depto: "Turismo Social", sede: "Sucursal 2", estado: "En reparación", claseEstado: "reparacion", problema: "Puertos USB frontales inoperativos y fallos de audio." },
  { codigo: "CV-S2-07", marca: "HP", modelo: "Compaq 6200 Pro", ram: "2 GB", cpu: "Pentium G630", so: "Win 7 Pro", depto: "Administración y Finanzas", sede: "Sucursal 2", estado: "Obsoleto", claseEstado: "obsoleto", problema: "Capacidad insuficiente para tareas ofimáticas actuales." },

  // Sucursal 3 - Santa Elena de Uairén, Estado Bolívar (7 equipos)
  { codigo: "CV-S3-01", marca: "Dell", modelo: "Latitude 3420", ram: "8 GB", cpu: "Core i5-1135G7", so: "Win 11 Pro", depto: "Turismo Social", sede: "Sucursal 3", estado: "Operativo", claseEstado: "operativo", problema: "Sin fallas." },
  { codigo: "CV-S3-02", marca: "Lenovo", modelo: "ThinkCentre M70q", ram: "8 GB", cpu: "Core i5-10400T", so: "Win 10 Pro", depto: "Atención al Trabajador", sede: "Sucursal 3", estado: "Operativo", claseEstado: "operativo", problema: "Sin fallas." },
  { codigo: "CV-S3-03", marca: "Lenovo", modelo: "ThinkCentre M70q", ram: "8 GB", cpu: "Core i5-10400T", so: "Win 10 Pro", depto: "Administración y Finanzas", sede: "Sucursal 3", estado: "Operativo", claseEstado: "operativo", problema: "Sin fallas." },
  { codigo: "CV-S3-04", marca: "HP", modelo: "ProDesk 400 G5", ram: "8 GB", cpu: "Core i3-8100", so: "Win 10 Pro", depto: "Turismo Social", sede: "Sucursal 3", estado: "Operativo", claseEstado: "operativo", problema: "Sin fallas." },
  { codigo: "CV-S3-05", marca: "HP", modelo: "ProDesk 400 G5", ram: "4 GB", cpu: "Core i3-8100", so: "Win 10 Pro", depto: "Atención al Trabajador", sede: "Sucursal 3", estado: "Operativo", claseEstado: "operativo", problema: "Sin fallas." },
  { codigo: "CV-S3-06", marca: "Dell", modelo: "OptiPlex 3040", ram: "4 GB", cpu: "Core i3-6100", so: "Win 10 Home", depto: "Administración y Finanzas", sede: "Sucursal 3", estado: "En reparación", claseEstado: "reparacion", problema: "Pérdida de fecha/hora (pila CMOS agotada) y reinicios." },
  { codigo: "CV-S3-07", marca: "Lenovo", modelo: "ThinkCentre M72e", ram: "4 GB", cpu: "Core i3-3220", so: "Win 10 Home", depto: "Atención al Trabajador", sede: "Sucursal 3", estado: "Operativo", claseEstado: "operativo", problema: "Muy lento; en el límite de su vida útil." }
];

function cargarInventario() {
  var tbody = document.querySelector('#tablaEquipos tbody');
  if (!tbody) return;

  tbody.innerHTML = inventarioEquipos.map(function(eq) {
    return (
      '<tr data-sede="' + eq.sede + '" data-estado="' + eq.estado + '">' +
        '<td><strong>' + eq.codigo + '</strong></td>' +
        '<td>' + eq.marca + '</td>' +
        '<td>' + eq.modelo + '</td>' +
        '<td>' + eq.ram + '</td>' +
        '<td>' + eq.cpu + '</td>' +
        '<td>' + eq.so + '</td>' +
        '<td>' + eq.depto + '</td>' +
        '<td>' + eq.sede + '</td>' +
        '<td><span class="estado ' + eq.claseEstado + '">' + eq.estado + '</span></td>' +
        '<td>' + eq.problema + '</td>' +
      '</tr>'
    );
  }).join('');
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

document.addEventListener('DOMContentLoaded', cargarInventario);
