"use client";

import { Phone, Clock, MapPin, MessageCircle, ShieldCheck, BadgeCheck, UserCheck, BarChart3 } from 'lucide-react';
import { useScrollAnimation } from '@/lib/useScrollAnimation';
import { useWizard } from './WizardWhatsApp';

export default function Contacto() {
    const headerRef = useScrollAnimation();
    const cardRef = useScrollAnimation({ y: 50 });
    const garantiasRef = useScrollAnimation({ stagger: ".garantia-card", staggerDelay: 0.12 });
    const { open: openWizard } = useWizard();

    return (
        <section id="contacto" className="w-full py-20 px-4 bg-white">
            <div className="max-w-3xl mx-auto">
                <div ref={headerRef} className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-black text-[rgb(0,94,184)] mb-4">
                        Solicita tu valoración gratuita
                    </h2>
                    <p className="text-lg text-slate-600">
                        Primera valoración sin compromiso. Solo 5 nuevas familias al mes.
                    </p>
                </div>

                {/* Card principal con info + CTA */}
                <div
                    ref={cardRef}
                    className="bg-gradient-to-br from-white to-[rgb(232,237,238)] rounded-3xl shadow-xl border border-[rgb(200,207,210)] p-8 md:p-10"
                >
                    {/* Info de contacto */}
                    <div className="grid md:grid-cols-3 gap-4 mb-8">
                        <a
                            href="tel:+34633261963"
                            className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-[rgb(200,207,210)] hover:border-[rgb(0,94,184)] hover:shadow-md transition group"
                        >
                            <div className="w-11 h-11 rounded-xl bg-[rgb(191,231,249)] flex items-center justify-center flex-shrink-0 group-hover:bg-[rgb(0,94,184)] transition">
                                <Phone className="w-5 h-5 text-[rgb(0,94,184)] group-hover:text-white transition" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs text-slate-500">Llamar ahora</p>
                                <p className="font-bold text-[rgb(31,41,51)] text-sm">633 261 963</p>
                            </div>
                        </a>

                        <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-[rgb(200,207,210)]">
                            <div className="w-11 h-11 rounded-xl bg-[rgb(191,231,249)] flex items-center justify-center flex-shrink-0">
                                <Clock className="w-5 h-5 text-[rgb(0,94,184)]" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs text-slate-500">Horario</p>
                                <p className="font-bold text-[rgb(31,41,51)] text-sm">L-V 9-19h · Sáb 9-13h</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-[rgb(200,207,210)]">
                            <div className="w-11 h-11 rounded-xl bg-[rgb(191,231,249)] flex items-center justify-center flex-shrink-0">
                                <MapPin className="w-5 h-5 text-[rgb(0,94,184)]" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs text-slate-500">Zona</p>
                                <p className="font-bold text-[rgb(31,41,51)] text-sm">Comunidad de Madrid</p>
                            </div>
                        </div>
                    </div>

                    {/* CTA principal */}
                    <button
                        onClick={openWizard}
                        className="w-full group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-100 transition-all duration-200"
                    >
                        <div className="flex items-center justify-center gap-4">
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                                <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-white" />
                            </div>
                            <div className="text-left">
                                <p className="text-xl md:text-2xl font-black">Iniciar mi valoración</p>
                                <p className="text-sm md:text-base text-green-100 mt-0.5">
                                    Cuéntanos tu situación · 30 segundos
                                </p>
                            </div>
                        </div>
                    </button>

                    {/* Beneficios */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 text-center">
                        <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                            <BadgeCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span>Sin compromiso</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                            <BadgeCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span>Precios claros</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                            <BadgeCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span>Profesional titulado</span>
                        </div>
                    </div>
                </div>

                {/* Garantías */}
                <div className="mt-16">
                    <h3 className="text-center font-bold text-[rgb(0,94,184)] text-lg mb-8 flex items-center justify-center gap-2">
                        <ShieldCheck className="w-5 h-5" /> Tu Tranquilidad es Nuestra Prioridad
                    </h3>
                    <div ref={garantiasRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="garantia-card bg-white rounded-2xl shadow p-6 flex flex-col items-center border border-[rgb(200,207,210)]">
                            <BadgeCheck className="w-8 h-8 text-[rgb(0,94,184)]" />
                            <h4 className="font-bold mt-2 mb-1 text-slate-900">Valoración Gratuita</h4>
                            <p className="text-sm text-slate-600 text-center">Sin compromiso ni letra pequeña</p>
                        </div>
                        <div className="garantia-card bg-white rounded-2xl shadow p-6 flex flex-col items-center border border-[rgb(200,207,210)]">
                            <UserCheck className="w-8 h-8 text-[rgb(0,94,184)]" />
                            <h4 className="font-bold mt-2 mb-1 text-slate-900">Profesional Titulado</h4>
                            <p className="text-sm text-slate-600 text-center">Especializado en personas mayores</p>
                        </div>
                        <div className="garantia-card bg-white rounded-2xl shadow p-6 flex flex-col items-center border border-[rgb(200,207,210)]">
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
