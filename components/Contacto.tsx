"use client";

import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Phone, Smartphone, Clock, MapPin, PenLine, Search, Dumbbell, Target, Info, Loader2, Mail, CircleCheck, CircleX, ShieldCheck, BadgeCheck, UserCheck, BarChart3 } from 'lucide-react';
import { useScrollAnimation } from '@/lib/useScrollAnimation';
import { useWizard } from './WizardWhatsApp';

export default function Contacto() {
    const form = useRef<HTMLFormElement>(null);
    const [enviando, setEnviando] = useState(false);
    const [estado, setEstado] = useState<'ok' | 'error' | ''>('');
    const headerRef = useScrollAnimation();
    const columnsRef = useScrollAnimation({ stagger: ".contacto-col", staggerDelay: 0.2, y: 50 });
    const garantiasRef = useScrollAnimation({ stagger: ".garantia-card", staggerDelay: 0.12 });
    const { open: openWizard } = useWizard();

    const enviarCorreo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.current) return;

        // Recopilar opciones seleccionadas manualmente antes de enviar
        const formData = new FormData(form.current);
        const opciones = formData.getAll('opciones');
        const opcionesResumenInput = form.current.querySelector<HTMLInputElement>('input[name="opciones_resumen"]');
        if (opcionesResumenInput) {
            opcionesResumenInput.value = opciones.join(', ');
        }

        setEnviando(true);
        setEstado('');

        try {
            await emailjs.sendForm(
                'service_antea_contacto', // <-- pon tu service ID aquí
                'Antea Salud',            // <-- ¡IMPORTANTE! Verifica que este sea el ID (ej. template_x9x9x9) y no solo el nombre
                form.current,
                'GkuifuSj9iMoXN9fw'       // <-- pon tu public key aquí
            );
            setEnviando(false);
            setEstado('ok');
            form.current?.reset();
            setTimeout(() => setEstado(''), 5000);
        } catch (error) {
            setEnviando(false);
            setEstado('error');
            setTimeout(() => setEstado(''), 5000);
        }
    };

    return (
        <section id="contacto" className="w-full py-16 px-4 bg-white">
            <div className="max-w-4xl mx-auto">
                <div ref={headerRef}>
                <h2 className="text-3xl md:text-4xl font-black text-[rgb(0,94,184)] mb-4 text-center">
                    Solicita tu Evaluación Gratuita de Ejercicio para Mayores
                </h2>
                <p className="text-lg text-slate-600 mb-10 text-center">
                    Primera valoración sin compromiso. Solo 5 nuevas familias al mes.
                </p>
                </div>
                <div ref={columnsRef} className="grid md:grid-cols-2 gap-10 items-start">
                    {/* Contacto Directo */}
                    <div className="contacto-col bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6">
                        <h3 className="font-bold text-[rgb(0,94,184)] text-lg mb-4 flex items-center gap-2">
                            <Phone className="w-5 h-5" /> Contacto Inmediato
                        </h3>
                        <button
                            onClick={openWizard}
                            className="inline-flex items-center gap-2 py-3 px-5 bg-green-500 text-white rounded-xl font-semibold text-lg shadow hover:bg-green-600 transition mb-2"
                        >
                            <Smartphone className="w-5 h-5" /> WhatsApp: 633 261 963
                        </button>
                        <a
                            href="tel:+34633261963"
                            className="inline-flex items-center gap-2 py-3 px-5 bg-blue-100 text-blue-900 rounded-xl font-semibold text-lg shadow hover:bg-blue-200 transition"
                        >
                            <Phone className="w-5 h-5" /> Llamar ahora: 633 261 963
                        </a>

                        <div className="flex flex-col gap-6 mt-6">
                            <div>
                                <h4 className="font-bold text-slate-700 flex items-center gap-2">
                                    <Clock className="w-4 h-4" /> Horario
                                </h4>
                                <p className="text-sm text-slate-900"><strong>L-V:</strong> 9:00-13:00 | 16:00-19:00</p>
                                <p className="text-sm text-slate-900"><strong>Sáb:</strong> 9:00-13:00</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-700 flex items-center gap-2">
                                    <MapPin className="w-4 h-4" /> Zona Servicio
                                </h4>
                                <p className="text-sm text-slate-900">Comunidad de Madrid</p>
                                <small className="text-slate-500">Madrid capital • Móstoles • Alcalá • Getafe • Leganés y más</small>
                            </div>
                        </div>
                    </div>
                    {/* Formulario */}
                    <div className="contacto-col bg-white rounded-2xl shadow-lg p-8">
                        <h3 className="font-bold text-[rgb(0,94,184)] text-lg mb-4 flex items-center gap-2">
                            <PenLine className="w-5 h-5" /> O escríbenos aquí
                        </h3>
                        <form ref={form} onSubmit={enviarCorreo} className="flex flex-col gap-4 text-slate-900">
                            <input
                                type="text"
                                name="user_name"
                                placeholder="Tu nombre completo"
                                required
                                className="px-4 py-3 rounded-xl border border-slate-300 focus:border-[rgb(0,94,184)] focus:ring-1 focus:ring-[rgb(191,231,249)] transition text-slate-900"
                                disabled={enviando}
                            />
                            <input
                                type="email"
                                name="user_email"
                                placeholder="Tu email"
                                required
                                className="px-4 py-3 rounded-xl border border-slate-300 focus:border-[rgb(0,94,184)] focus:ring-1 focus:ring-[rgb(191,231,249)] transition text-slate-900"
                                disabled={enviando}
                            />
                            <input
                                type="tel"
                                name="user_phone"
                                placeholder="Teléfono de contacto"
                                required
                                className="px-4 py-3 rounded-xl border border-slate-300 focus:border-[rgb(0,94,184)] focus:ring-1 focus:ring-[rgb(191,231,249)] transition text-slate-900"
                                disabled={enviando}
                            />
                            <select
                                name="ubicacion"
                                required
                                disabled={enviando}
                                className="px-4 py-3 rounded-xl border border-slate-300 focus:border-[rgb(0,94,184)] focus:ring-1 focus:ring-[rgb(191,231,249)] transition text-slate-900"
                            >
                                <option value="">¿En qué zona de Madrid?</option>
                                <option value="Madrid capital">Madrid capital</option>
                                <option value="Sur Madrid">Sur (Móstoles, Fuenlabrada, Getafe, Leganés...)</option>
                                <option value="Norte Madrid">Norte (Alcobendas, San Sebastián de los Reyes...)</option>
                                <option value="Este Madrid">Este (Alcalá de Henares, Torrejón de Ardoz...)</option>
                                <option value="Oeste Madrid">Oeste (Pozuelo, Las Rozas, Majadahonda...)</option>
                            </select>
                            <textarea
                                name="message"
                                placeholder="Cuéntanos: ¿edad?, ¿situación actual?, ¿objetivos?..."
                                required
                                rows={4}
                                className="px-4 py-3 rounded-xl border border-slate-300 focus:border-[rgb(0,94,184)] focus:ring-1 focus:ring-[rgb(191,231,249)] transition resize-none text-slate-900"
                                disabled={enviando}
                            />
                            <div>
                                <label className="block font-semibold mb-2 text-slate-700">¿Qué te interesa?</label>
                                <div className="flex flex-wrap items-center gap-3">
                                    <label className="flex items-center gap-1">
                                        <input
                                            type="checkbox"
                                            name="opciones"
                                            value="Evaluación gratuita"
                                            disabled={enviando}
                                            className="accent-[rgb(0,94,184)]"
                                        />
                                        <span className="text-slate-900 inline-flex items-center gap-1"><Search className="w-4 h-4" /> Evaluación gratuita</span>
                                    </label>
                                    <label className="flex items-center gap-1">
                                        <input
                                            type="checkbox"
                                            name="opciones"
                                            value="Sesión suelta"
                                            disabled={enviando}
                                            className="accent-[rgb(0,94,184)]"
                                        />
                                        <span className="text-slate-900 inline-flex items-center gap-1"><Dumbbell className="w-4 h-4" /> Sesión suelta (45€)</span>
                                    </label>
                                    <label className="flex items-center gap-1">
                                        <input
                                            type="checkbox"
                                            name="opciones"
                                            value="Plan semanal"
                                            disabled={enviando}
                                            className="accent-[rgb(0,94,184)]"
                                        />
                                        <span className="text-slate-900 inline-flex items-center gap-1"><Target className="w-4 h-4" /> Plan 2 días/semana (70€)</span>
                                    </label>
                                    <label className="flex items-center gap-1">
                                        <input
                                            type="checkbox"
                                            name="opciones"
                                            value="Solo información"
                                            disabled={enviando}
                                            className="accent-[rgb(0,94,184)]"
                                        />
                                        <span className="text-slate-900 inline-flex items-center gap-1"><Info className="w-4 h-4" /> Solo información y precios</span>
                                    </label>
                                </div>
                            </div>
                            <input type="hidden" name="opciones_resumen" />
                            <button
                                type="submit"
                                className="mt-4 w-full py-3 bg-gradient-to-r from-[rgb(32,113,188)] to-[rgb(0,94,184)] text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 active:scale-100 transition inline-flex items-center justify-center gap-2"
                                disabled={enviando}
                            >
                                {enviando ? <><Loader2 className="w-5 h-5 animate-spin" /> Enviando...</> : <><Mail className="w-5 h-5" /> Solicitar información</>}
                            </button>
                            {estado === 'ok' && (
                                <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl px-5 py-4 mt-2 text-center font-semibold">
                                    <h4 className="flex items-center justify-center gap-2"><CircleCheck className="w-5 h-5" /> ¡Mensaje enviado!</h4>
                                    <p>Te contactaremos en menos de 24h para programar tu evaluación gratuita.</p>
                                </div>
                            )}
                            {estado === 'error' && (
                                <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl px-5 py-4 mt-2 text-center font-semibold">
                                    <h4 className="flex items-center justify-center gap-2"><CircleX className="w-5 h-5" /> Error al enviar</h4>
                                    <p>Por favor, inténtalo de nuevo o contáctanos por WhatsApp.</p>
                                    <small>Revisa la consola del navegador (F12) para ver detalles del error.</small>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
                {/* Garantías */}
                <div className="mt-16">
                    <h3 className="text-center font-bold text-[rgb(0,94,184)] text-lg mb-8 flex items-center justify-center gap-2">
                        <ShieldCheck className="w-5 h-5" /> Tu Tranquilidad es Nuestra Prioridad
                    </h3>
                    <div ref={garantiasRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="garantia-card bg-white rounded-2xl shadow p-6 flex flex-col items-center">
                            <BadgeCheck className="w-8 h-8 text-[rgb(0,94,184)]" />
                            <h4 className="font-bold mt-2 mb-1 text-slate-900">Valoración Gratuita</h4>
                            <p className="text-sm text-slate-600 text-center">Sin compromiso ni letra pequeña</p>
                        </div>
                        <div className="garantia-card bg-white rounded-2xl shadow p-6 flex flex-col items-center">
                            <UserCheck className="w-8 h-8 text-[rgb(0,94,184)]" />
                            <h4 className="font-bold mt-2 mb-1 text-slate-900">Profesional Titulado</h4>
                            <p className="text-sm text-slate-600 text-center">Especializado en personas mayores</p>
                        </div>
                        <div className="garantia-card bg-white rounded-2xl shadow p-6 flex flex-col items-center">
                            <BarChart3 className="w-8 h-8 text-[rgb(0,94,184)]" />
                            <h4 className="font-bold mt-2 mb-1 text-slate-900">Resultados Medibles</h4>
                            <p className="text-sm text-slate-600 text-center">Progreso documentado cada semana</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
