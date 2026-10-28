# Captación y seguimiento de solicitudes

Google Sheets conserva las columnas A:I existentes. Las nuevas columnas J:Q son:
ID, Procedencia, Ruta, Formulario, Mensaje, Próxima acción, Fecha seguimiento y Motivo descarte.
Se añaden sus cabeceras al guardar o actualizar un contacto. Si esas columnas tienen otras cabeceras,
la operación se detiene para evitar sobrescribir datos propios.

Los contactos nuevos reciben un UUID. Los antiguos se identifican por una huella de sus datos
originales y reciben ese identificador en la hoja al editarse por primera vez. No se migran
ni reinterpretan automáticamente sus mensajes históricos. Si hay registros antiguos idénticos,
el panel rechaza la edición ambigua. Los cambios se localizan por identidad, aunque la hoja se
haya ordenado después de cargar el panel; se debe ordenar siempre la fila completa A:Q.
Evitar ordenar la hoja mientras se está guardando una edición: Sheets no ofrece una transacción
que combine la búsqueda del identificador y la escritura de la fila.

El panel permite filtrar por procedencia, estado, zona y seguimiento pendiente en horario de Madrid.
Los pendientes incluyen hoy y fechas vencidas, excluyendo contactos convertidos o descartados.
Los teléfonos y emails coincidentes se marcan como contactos repetidos sin fusionarlos ni borrarlos.
La procedencia describe la página de solicitud; no atribuye automáticamente un canal publicitario.

Un error de lectura se muestra como error. La ausencia de la pestaña opcional de la guía se admite.
Un fallo de email posterior al guardado no convierte la solicitud en fallida. Los campos de texto
se escriben con `RAW` para conservar teléfonos y mensajes sin interpretar fórmulas.

Los teléfonos deben contener entre 9 y 15 dígitos. Si el envío ocurre antes de dos segundos,
se pide esperar y reintentar, sin confirmar una solicitud que no se ha guardado.
El navegador limita la espera a 30 segundos y conserva el identificador para reintentar sin duplicar.

Verificación sin red ni credenciales: `node --test tests/leads.test.mjs`.

## Reenvíos e historial

La ficha permite borrar definitivamente un lead, previa confirmación. El endpoint DELETE requiere
sesión, identidad estable y procedencia explícita. Localiza de nuevo el registro y rechaza
identidades ausentes o ambiguas. Vacía únicamente A:Q sin desplazar filas ni tocar columnas
adicionales; los registros vacíos no se muestran. No hay papelera ni restauración en el panel.
Como en la edición, no se debe ordenar la hoja mientras se ejecuta un borrado.

El navegador agrupa envíos simultáneos del mismo formulario y conserva durante diez minutos
un UUID por huella de contenido en sessionStorage. No guarda datos personales en ese almacenamiento.
Un reintento tras perder la respuesta usa el mismo UUID; una consulta con contenido distinto recibe otro.
El servidor busca ese UUID en Sheets antes de añadir la fila y comprueba que corresponde al mismo contenido.
Los reenvíos confirmados no repiten el aviso por email ni el evento de conversión del formulario.
Las escrituras concurrentes del mismo UUID se agrupan dentro de cada instancia del servidor.
Sheets no ofrece una restricción única o transacción entre esa búsqueda y el append: dos peticiones
simultáneas que alcancen instancias diferentes antes de guardar pueden todavía crear un duplicado.
Para una garantía global de una sola escritura haría falta almacenamiento con unicidad o un bloqueo distribuido.

La ficha permite abrir otras solicitudes con el mismo teléfono normalizado o email, sin fusionarlas.
Los contadores separan nuevos, pendientes de hoy y atrasados. «Contactado» actualiza el estado;
«Agendar valoración» prepara la ficha para elegir la fecha y guardar, sin confirmar una cita por sí solo.

Los resultados por procedencia cuentan solicitudes por estado actual. No representan personas únicas,
ni un historial de etapas: al pasar a «Convertido», la solicitud aparece como cliente, no como valoración realizada.
La atribución publicitaria y el coste por cliente requieren datos de campaña que todavía no se capturan.

## Verificación del 25 de octubre de 2026

Las correcciones de captación están desplegadas en producción. Se comprobaron tres solicitudes
sintéticas por `/api/contact`: contacto, asistente de WhatsApp y descarga de guía. Las tres
aparecieron en el panel, en sus pestañas correspondientes y con interés, procedencia, ruta,
formulario y mensaje separados. Reenviar el mismo identificador no añadió otra fila.
Las tres solicitudes de prueba quedaron como «Descartado», identificadas para no contactarlas.

Se verificó la disponibilidad de los formularios de 12 páginas, el consentimiento y el honeypot
en su HTML. Un envío demasiado rápido devuelve 400 y el acceso sin sesión a los leads devuelve 401.
Las 18 pruebas automatizadas, TypeScript y el lint de los archivos afectados pasan.
Esto no equivale a una prueba de interacción completa en navegador.

Pendientes:
- `EMAILJS_PRIVATE_KEY` sigue sin aparecer en las variables de Production del proyecto
  `anteasalud-landing`. Cuando se añada, hay que redesplegar y comprobar la aceptación del
  aviso por EmailJS y su recepción en el buzón; guardar una solicitud no acredita la entrega del email.
- Verificar los eventos de conversión de Google Ads en navegador; no se comprobó su recepción.

## Revisión del 26 de octubre de 2026

- Pasan las 23 pruebas automatizadas, TypeScript (`npx tsc --noEmit`) y el lint completo.
- En producción responden 43 páginas públicas, con título y un único H1. Se comprobaron
  268 enlaces internos, sus anclas y 31 recursos de imagen o JavaScript sin errores HTTP.
- `/pacifico` redirige con 308 a la landing y conserva los parámetros de campaña.
- Tres solicitudes sintéticas nuevas (contacto, asistente y guía) se guardaron en las hojas
  correspondientes, con campos separados. El reenvío conservó un solo registro. Las tres
  quedaron como «Descartado», identificadas como pruebas para no contactarlas.
- Los datos inválidos devuelven 400. Las API administrativas sin sesión devuelven 401.
  Dashboard, leads, artículos y valoraciones responden 200 con sesión y redirigen al acceso
  sin ella. El cierre de sesión responde 200.
- Hay 21 artículos publicados y tres borradores; las tres URL de borrador devuelven 404.
- `EMAILJS_PRIVATE_KEY` sigue ausente en Production. La entrega de email sigue pendiente.
- No había navegador disponible: no se verificaron la interacción visual, la exportación
  PDF de valoraciones ni la recepción de conversiones de Google Ads en navegador.

Los informes técnicos locales están en `.vercel/site-audit.json`, `.vercel/admin-audit.json`
y `.vercel/capture-audit-result.json` (directorio ignorado por Git, sin credenciales).
