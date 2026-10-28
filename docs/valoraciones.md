# Herramienta de valoración funcional

Ruta privada: `/admin/valoraciones`, protegida por el proxy de autenticación existente.
La primera versión acepta puntuaciones manuales de los tres componentes de SPPB y cuatro
criterios de caídas. Las instrucciones enlazan a las páginas del protocolo oficial.

La interfaz guía seis pasos: preparación, equilibrio, marcha, silla, caídas e informe.
Cada prueba muestra instrucciones y una tabla de referencia del protocolo, con selección
manual de puntos mediante botones de opción. Los límites no especificados en la tabla
original de silla se señalan sin inventar reglas de conversión. Los pasos permiten volver
y conservan el estado; avanzar con pendientes no completa pruebas ni asigna ceros.
La acción de interrumpir marca la valoración como suspendida y lleva al informe. Antes
de exportar se enumeran los requisitos pendientes de identificación, propuesta y revisión.

Referencia de cálculo: [Pasaporte profesional Vivifrail, 2020](https://vivifrail.com/wp-content/uploads/2020/02/Pasaporte-sanitarios.pdf).
Se registra esta versión en el informe. La clasificación automática se limita a personas de
70 años o más con datos completos y revisión de idoneidad. No realiza diagnósticos.
Los criterios positivos de caídas se muestran por separado del rendimiento funcional.

No se convierten tiempos automáticamente en puntos: los asigna el profesional según las tablas.
No se implementa la clasificación alternativa mediante velocidad de marcha de 6 metros ni la
selección del perfil avanzado E. Los resultados pendientes o una interrupción no equivalen a cero.

Mientras se edita, los datos permanecen en el estado de la página; los cambios sin guardar
se pierden al salir. «Guardar informe en el historial» conserva una copia revisada e inmutable.
El historial está en `/admin/valoraciones/informes`; cada ficha permite consultar resultados,
descargar un PDF generado en servidor y compartir el archivo con aplicaciones compatibles.
«Guardar y descargar PDF» también archiva la copia revisada antes de iniciar la descarga.
Abrir correo o WhatsApp prepara un mensaje genérico; el PDF se adjunta manualmente si el
dispositivo no permite compartir archivos. No se envían mensajes automáticamente ni se
generan enlaces públicos para familiares. Los PDF anteriores no se importan automáticamente.

La persistencia usa la pestaña `Informes valoracion`, separada de los leads. Solo el UUID y
la fecha de creación quedan legibles; referencia, evaluación y propuesta se cifran juntos con
AES-256-GCM, IV aleatorio y el UUID como datos autenticados. `ASSESSMENT_ENCRYPTION_KEY`
debe contener 32 bytes en hexadecimal (64 caracteres), en el servidor. Está configurada en
Production y en el entorno local ignorado. Conservar esta clave en la copia de seguridad de
secretos: cambiarla sin migrar el cifrado impide leer los informes. Es independiente de la
contraseña del panel. No hay sincronización con clientes ni archivo PDF público.

La API y las páginas requieren sesión; los PDF y respuestas administrativas usan `no-store`.
El servidor valida referencia, fecha, propuesta, puntuaciones y revisión profesional antes de
guardar. Si se interrumpe, también exige observaciones. Se conserva el estado incompleto
cuando procede. Repetir una petición idéntica con el mismo UUID devuelve la copia guardada;
reutilizarlo para otro contenido se rechaza. Sheets no garantiza unicidad entre instancias
concurrentes. Fernando revisa el destinatario y confirma el envío en su aplicación.

Pruebas: `node --test tests/functional-assessment.test.mjs`.
Persistencia, permisos, cifrado y PDF: `node --test tests/assessment-reports.test.mjs`.
Antes de modificar reglas clínicas, contrastar el protocolo, actualizar su versión y probar los
límites, los datos ausentes, los criterios de caídas y el bloqueo de exportación sin revisión.
