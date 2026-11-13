export default function SessionConditions() {
  return <aside aria-label="Pago, cambios y cancelaciones de sesiones" className="mt-6 rounded-xl border border-primary/20 bg-primary-50 p-5 text-muted">
    <h3 className="font-semibold text-primary-dark">Cómo se realiza el pago</h3>
    <p className="mt-3 leading-relaxed">El pago se realiza a principio de mes, por las sesiones previstas para ese mes. El importe mensual depende del calendario de sesiones acordado.</p>
    <p className="mt-3 leading-relaxed">Si empezáis a mitad de mes, se pagan únicamente las sesiones previstas desde la incorporación. Los festivos se reprograman para otro día o, a petición del cliente, no se incluyen en el calendario ni en el importe del mes.</p>
    <h3 className="mt-5 font-semibold text-primary-dark">Si necesitáis cambiar o cancelar una sesión</h3>
    <p className="mt-3 leading-relaxed">Avísanos el día anterior, con un mínimo de 12 horas de antelación. Siempre que sea posible, agradecemos 24 horas de aviso para organizar las visitas.</p>
    <p className="mt-3 leading-relaxed">Si surge una emergencia ajena a la persona, como una enfermedad o un ingreso hospitalario, avísanos cuanto antes. Las cancelaciones fuera de plazo sin una causa de emergencia y su posible cobro se valoran caso por caso.</p>
    <h3 className="mt-5 font-semibold text-primary-dark">Qué ocurre con una sesión ya pagada</h3>
    <p className="mt-3 leading-relaxed">Si se cancela con el aviso acordado o por una emergencia ajena a la persona, la sesión queda como saldo pendiente y se descuenta del pago del mes siguiente. Como alternativa, podemos acordar recuperarla otro día de la semana si hay disponibilidad tanto del profesional como del cliente.</p>
  </aside>;
}
