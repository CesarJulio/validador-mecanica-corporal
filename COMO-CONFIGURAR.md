# Cómo configurar el Validador de Mecánica Corporal

Tú, como docente, decides qué ejercicios ven los estudiantes y con qué criterios se evalúan.
Todo se controla desde una hoja de Google Sheets.

## 1. Crear la hoja (una sola vez)

1. Entra a Google Sheets y crea una hoja nueva. Ponle un nombre, por ejemplo "Configuración validador".
2. Ve a **Archivo → Importar → Subir** y elige el archivo `config.csv` de esta carpeta.
   Elige "Reemplazar hoja actual".
3. Opcional, para que sea más cómodo: selecciona las celdas de la columna **valor** que dicen TRUE
   (las filas que terminan en `.activo`) y ve a **Insertar → Casilla de verificación**.
   Quedan como casillas: marcada = ejercicio visible, desmarcada = oculto.

## 2. Publicar la hoja como CSV (una sola vez)

1. Ve a **Archivo → Compartir → Publicar en la Web**.
2. En "Vínculo", elige la hoja y el formato **Valores separados por comas (.csv)**.
3. Pulsa **Publicar** y copia el enlace. Termina en `output=csv`.
4. Envíale ese enlace a Claude o pégalo en `index.html`, en la línea `const CONFIG_URL = "";`.

Publicar la hoja como CSV solo permite leerla. Nadie puede editarla sin tu permiso.

## 3. Uso diario

| Quiero… | Hago esto en la hoja |
|---|---|
| Ocultar un ejercicio | Desmarco su casilla `.activo` (o escribo FALSE) |
| Mostrar un ejercicio | Marco su casilla `.activo` (o escribo TRUE) |
| Hacer un criterio más exigente | Cambio el número en la columna **valor** |
| Dar un aviso a los estudiantes | Escribo el texto en la fila `mensaje` |

Los cambios tardan **entre 1 y 5 minutos** en llegar a los estudiantes, porque Google actualiza
la versión publicada cada pocos minutos. El estudiante solo necesita recargar la página.

No cambies los textos de la columna **clave**: la página los usa para reconocer cada ajuste.

## Vista docente

Agrega `?docente` al final del enlace de la página (por ejemplo `https://.../index.html?docente`) para:

- Ver **todos** los ejercicios, incluso los desactivados (aparecen marcados como "inactivo para estudiantes").
- Mover los criterios con deslizadores durante una clase. Estos cambios aplican solo en ese
  dispositivo; para cambiar los criterios de todo el curso, edita la hoja.
- Ver de dónde se cargó la configuración (hoja de Google, archivo config.csv o valores por defecto).

## Ejercicios disponibles

| Clave | Ejercicio | Posición frente a la cámara |
|---|---|---|
| `levantamiento` | Levantamiento de carga | De perfil |
| `rcp` | RCP: compresiones | De perfil |
| `hombro` | Abducción de hombro | De frente |
| `silla` | Sentarse y levantarse (30 s) | De perfil |
| `empujar` | Empujar o halar | De perfil |
| `equilibrio` | Equilibrio en un pie | De frente |
