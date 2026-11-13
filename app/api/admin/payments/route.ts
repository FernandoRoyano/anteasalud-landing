import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getClientById, getPayments, recordPayment, voidPayment } from '@/lib/sheets';
import { billingMonthSchema, paymentInputSchema, PaymentConflictError } from '@/lib/payments';
import { invalidBody } from '@/lib/admin-schemas';

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  const month = billingMonthSchema.safeParse(request.nextUrl.searchParams.get('month'));
  if (!month.success) return NextResponse.json({ error: 'Mes no válido' }, { status: 400 });
  try {
    return NextResponse.json({ payments: await getPayments(month.data) }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('[Payments:GET] No se pudieron cargar los cobros', error);
    return NextResponse.json({ error: 'No se pudieron cargar los cobros' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  const parsed = paymentInputSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return invalidBody(parsed.error);
  try {
    if (!(await getClientById(parsed.data.clientId))) return NextResponse.json({ error: 'Cliente no encontrado' }, { status: 404 });
    return NextResponse.json({ payment: await recordPayment(parsed.data) });
  } catch (error) {
    if (error instanceof PaymentConflictError) return NextResponse.json({ error: 'Este identificador ya corresponde a otro cobro. Recarga los datos.' }, { status: 409 });
    console.error('[Payments:POST] No se pudo guardar el cobro', error);
    return NextResponse.json({ error: 'No se pudo confirmar el cobro. Reintenta con los mismos datos para evitar duplicados.' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  const id = paymentInputSchema.shape.id.safeParse(request.nextUrl.searchParams.get('id'));
  if (!id.success) return NextResponse.json({ error: 'Cobro no válido' }, { status: 400 });
  try {
    if (!(await voidPayment(id.data))) return NextResponse.json({ error: 'Cobro no encontrado' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Payments:DELETE] No se pudo anular el cobro', error);
    return NextResponse.json({ error: 'No se pudo confirmar la anulación. Reintenta la operación.' }, { status: 500 });
  }
}
