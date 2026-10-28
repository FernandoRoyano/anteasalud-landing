'use client';

import { useEffect, useState } from 'react';
import { Download, Mail, MessageCircle, Share2 } from 'lucide-react';

export default function ReportActions({ id, date }: { id: string; date: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [sharing, setSharing] = useState(false);
  const url = `/api/admin/valoraciones/${id}/pdf`;
  useEffect(() => {
    const controller = new AbortController();
    fetch(url, { signal: controller.signal, cache: 'no-store' }).then(async response => {
      if (!response.ok) throw new Error('PDF unavailable');
      const blob = await response.blob();
      setFile(new File([blob], `antea-informe-${date}-${id.slice(0, 8)}.pdf`, { type: 'application/pdf' }));
    }).catch(() => { if (!controller.signal.aborted) setMessage('No se pudo preparar el PDF para compartir. Intenta descargarlo o recarga la página.'); });
    return () => controller.abort();
  }, [url, date, id]);
  async function share() {
    if (!file) return;
    if (!navigator.canShare?.({ files: [file] })) { setMessage('Este navegador no permite compartir archivos. Descarga el PDF y adjúntalo en tu correo o WhatsApp.'); return; }
    setSharing(true);
    try { await navigator.share({ files: [file], title: 'Informe ANTEA Salud' }); }
    catch (error) { if (!(error instanceof Error && error.name === 'AbortError')) setMessage('No se pudo abrir el envío. Descarga el PDF y adjúntalo manualmente.'); }
    finally { setSharing(false); }
  }
  const buttonClass = 'inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-primary/30 bg-white px-4 py-3 text-sm font-semibold text-primary hover:bg-primary-50';
  const body = 'Hola, te hago llegar el informe de valoración de ANTEA Salud. Si tienes alguna duda, lo comentamos. Un saludo, Fernando.';
  return <section aria-label="Descargar y compartir informe" className="mt-6 rounded-2xl border border-primary/20 bg-primary-50 p-5"><div className="flex flex-wrap gap-3"><a href={url} download className={`${buttonClass} !bg-primary !text-white`}><Download className="size-4" />Descargar PDF</a><button type="button" onClick={share} disabled={!file || sharing} className={`${buttonClass} disabled:opacity-50`}><Share2 className="size-4" />{sharing ? 'Abriendo…' : file ? 'Compartir PDF' : 'Preparando PDF…'}</button><a className={buttonClass} href={`mailto:?subject=${encodeURIComponent('Informe de valoración · ANTEA Salud')}&body=${encodeURIComponent(body)}`}><Mail className="size-4" />Abrir correo</a><a className={buttonClass} href={`https://wa.me/?text=${encodeURIComponent(body)}`} target="_blank" rel="noreferrer"><MessageCircle className="size-4" />Abrir WhatsApp</a></div><p className="mt-4 text-sm text-muted">Compartir PDF abre las aplicaciones compatibles del dispositivo. Si abres correo o WhatsApp con los otros botones, descarga y adjunta el PDF tú mismo antes de enviarlo. Revisa el destinatario.</p>{message && <p role="status" className="mt-3 text-sm font-semibold text-primary-dark">{message}</p>}</section>;
}
