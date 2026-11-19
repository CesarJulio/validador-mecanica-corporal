/**
 * Receptor de resultados del Validador de Mecánica Corporal.
 * Se pega en la hoja de configuración: Extensiones → Apps Script.
 * - Práctica de estudiantes  → pestaña "Resultados"
 * - Registro del taller      → pestaña "Taller" (datos anónimos de participantes)
 */
const HOJAS = {
  Resultados: ['Fecha', 'Nombre', 'Grupo', 'Ejercicio', 'Total', 'Correctas', 'Incorrectas', '% correcto', 'Criterio que más falló', 'Detalle por criterio', 'Fuente'],
  Taller: ['Fecha', 'Equipo', 'Código participante', 'Programa', 'Momento', 'Ejercicio', 'Total', 'Correctas', 'Incorrectas', '% correcto', 'Criterio que más falló', 'Detalle por criterio', 'Fuente']
};

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    if (d.hoja === 'Taller') {
      obtenerHoja_('Taller').appendRow([
        new Date(),
        texto_(d.equipo), texto_(d.codigo), texto_(d.programa), texto_(d.momento), texto_(d.ejercicio),
        numero_(d.total), numero_(d.correctas), numero_(d.incorrectas), numero_(d.porcentaje),
        texto_(d.falla), texto_(d.detalle), texto_(d.fuente)
      ]);
    } else {
      obtenerHoja_('Resultados').appendRow([
        new Date(),
        texto_(d.nombre), texto_(d.grupo), texto_(d.ejercicio),
        numero_(d.total), numero_(d.correctas), numero_(d.incorrectas), numero_(d.porcentaje),
        texto_(d.falla), texto_(d.detalle), texto_(d.fuente)
      ]);
    }
    return respuesta_({ ok: true });
  } catch (err) {
    return respuesta_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return respuesta_({ ok: true, servicio: 'validador-resultados', version: 2 });
}

function obtenerHoja_(nombre) {
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  let hoja = libro.getSheetByName(nombre);
  if (!hoja) {
    const enc = HOJAS[nombre];
    hoja = libro.insertSheet(nombre);
    hoja.appendRow(enc);
    hoja.setFrozenRows(1);
    hoja.getRange(1, 1, 1, enc.length).setFontWeight('bold');
  }
  return hoja;
}

// Limita el largo y evita que un texto se interprete como fórmula.
function texto_(v) {
  const s = String(v == null ? '' : v).slice(0, 300);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function numero_(v) {
  const n = Number(v);
  return isFinite(n) ? n : '';
}

function respuesta_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
