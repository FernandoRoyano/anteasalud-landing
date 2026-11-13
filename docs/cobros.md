# Registro de cobros

En Admin > Sesiones, el bloque Cobros muestra el dinero recibido y el saldo pendiente del mes seleccionado. Cada cliente puede tener varios pagos parciales, con importe, fecha y método (transferencia, efectivo, Bizum, tarjeta u otro).

Registrar cobro guarda un apunte manual; no ejecuta cargos bancarios ni emite facturas. Los estados Pendiente, Parcial y Pagado se calculan comparando los pagos vigentes con el importe de las sesiones. Un exceso se muestra por separado y no compensa otros clientes ni se traslada automáticamente a otro mes.

El historial permite anular errores. La anulación conserva el importe original y registra cuándo se anuló. El saldo se recalcula al anular o cambiar las sesiones. Los importes de sesiones siguen usando las tarifas y créditos del cálculo existente.

## Almacenamiento

Se utiliza la misma hoja configurada en GOOGLE_SHEET_ID y la misma cuenta de servicio. La pestaña Cobros se crea automáticamente al acceder por primera vez; no necesita nuevas variables de entorno. Sus columnas son: id, clientId, billingMonth, amountCents, paidOn, method, createdAt, voidedAt. No modificar su orden. Los importes se guardan en céntimos enteros y el mes corresponde al servicio, aunque el pago tenga otra fecha.

Las rutas GET, POST y DELETE de /api/admin/payments requieren la sesión de administrador. Un mismo identificador de cobro se cuenta una vez incluso tras reintentos. Después de una respuesta de red incierta, el formulario conserva el identificador y los datos para reintentar. Si se cierra, consultar el historial antes de registrar de nuevo el mismo dinero.

No se convierten cobros históricos automáticamente: hasta que se registren, los meses con sesiones aparecerán como pendientes.
