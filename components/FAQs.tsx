"use client";

import { useState } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { useScrollAnimation } from '@/lib/useScrollAnimation';
import { useWizard } from './WizardWhatsApp';

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const headerRef = useScrollAnimation();
  const faqsRef = useScrollAnimation({ stagger: ".faq-item", staggerDelay: 0.08 });
  const { open: openWizard } = useWizard();

  const faqs = [
    {
      question: "¿Cómo funciona el primer contacto?",
      answer: "Es muy sencillo. Llamas, escribes o envías un WhatsApp. En menos de 24 horas te contactamos para una valoración completamente gratuita. Conocemos tu situación, necesidades y objetivos. Sin compromiso."
    },
    {
      question: "¿Cuánto cuesta una sesión?",
      answer: "Sesión suelta 55€ (30 minutos). Plan de 2 días por semana 45€/sesión (90€/semana). Para zonas fuera de Madrid capital se añaden 10€ por sesión por desplazamiento. Primera valoración siempre gratuita y sin compromiso."
    },
    {
      question: "¿Qué documentación necesito?",
      answer: "Solo nos interesa entender tu estado de salud actual. Si tienes informes médicos recientes (resonancias, operaciones, etc.), nos ayuda a diseñar un mejor plan. Pero no es obligatorio. Realizaremos una evaluación completa en la primera sesión."
    },
    {
      question: "¿Qué titulación tenéis?",
      answer: "Graduado en Ciencias de la Actividad Física y el Deporte (CCAFYD), titulación universitaria oficial, con 14 años de experiencia especializado en ejercicio para personas mayores, readaptación y prevención de caídas. Formación continua en ejercicio adaptado y envejecimiento saludable."
    },
    {
      question: "¿Cuántas sesiones necesita?",
      answer: "Depende de cada persona. Algunos ven resultados en 4-6 semanas, otros necesitan 2-3 meses. La mayoría nota mejora en equilibrio, fuerza y confianza en 6-8 sesiones. Evaluamos constantemente y ajustamos el plan."
    },
    {
      question: "¿Podemos espaciar o parar las sesiones cuando mejore?",
      answer: "Claro. El objetivo es que recupere autonomía y confianza. Cuando veamos los avances esperados, ajustamos la frecuencia: menos sesiones por semana, mantenimiento puntual o parar del todo. Sin permanencia, sin penalizaciones."
    },
    {
      question: "¿Hacéis coordinación con mi médico?",
      answer: "Sí, si lo necesitas. Podemos coordinarnos con tu médico o fisioterapeuta del hospital para alinear objetivos y compartir evolución. Trabajamos en equipo por tu salud."
    },
    {
      question: "¿Dónde operáis?",
      answer: "Operamos en Madrid capital y municipios de la Comunidad de Madrid en un radio de hasta 22 km del centro: Móstoles, Leganés, Alcorcón, Getafe, Fuenlabrada, Pozuelo, Majadahonda, Las Rozas, Boadilla, Villaviciosa de Odón, Coslada, San Fernando de Henares, Rivas-Vaciamadrid, Torrejón de Ardoz, Alcobendas y Tres Cantos. Vamos a tu domicilio."
    },
    {
      question: "¿Cobráis desplazamiento?",
      answer: "Madrid capital sin recargo. Para el resto de la Comunidad de Madrid aplicamos un recargo de +10€ por sesión por desplazamiento. Por ejemplo, una sesión suelta en Móstoles cuesta 65€ (55€ + 10€). Es una cantidad fija por sesión, sin sorpresas."
    },
    {
      question: "¿Cómo se paga?",
      answer: "Tienes dos opciones: pago por sesión suelta o pago mensual con la parte proporcional según las sesiones del mes. Aceptamos Bizum, transferencia bancaria y efectivo. No trabajamos con domiciliaciones bancarias."
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // JSON-LD FAQPage para que Google muestre las preguntas desplegables en SERPs
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section id="faqs" className="w-full bg-white py-24 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-2 bg-[rgb(191,231,249)] rounded-full">
            <span className="text-sm font-semibold text-[rgb(0,94,184)]">Preguntas frecuentes</span>
          </div>
          <h2 className="font-display text-fluid-4xl font-black tracking-tight text-[rgb(31,41,51)]">
            Respuestas a tus dudas
          </h2>
          <p className="text-xl text-[rgb(130,131,130)] max-w-2xl mx-auto">
            Todo lo que necesitas saber sobre nuestro servicio de ejercicio a domicilio para personas mayores
          </p>
        </div>

        {/* Acordeón FAQs */}
        <div ref={faqsRef} className="space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item rounded-2xl border-2 transition-all duration-300 ${openIndex === index
                ? 'border-[rgb(0,94,184)] bg-[rgb(191,231,249)] shadow-lg'
                : 'border-[rgb(200,207,210)] bg-white shadow-md hover:shadow-lg'
                }`}
            >
              {/* Header acordeón */}
              <button
                onClick={() => toggleAccordion(index)}
                className={`w-full flex items-center justify-between p-7 text-left transition-colors rounded-2xl ${openIndex === index ? 'bg-[rgb(191,231,249)]' : 'hover:bg-[rgb(232,237,238)]'
                  }`}
              >
                <h3 className={`text-lg font-bold pr-6 flex-1 ${openIndex === index ? 'text-[rgb(0,94,184)]' : 'text-[rgb(31,41,51)]'
                  }`}>
                  {faq.question}
                </h3>
                <span
                  className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg transition-all duration-300 ${openIndex === index
                    ? 'bg-[rgb(0,94,184)] text-white rotate-180'
                    : 'bg-[rgb(232,237,238)] text-[rgb(130,131,130)]'
                    }`}
                >
                  ▼
                </span>
              </button>

              {/* Respuesta (desplegable) */}
              {openIndex === index && (
                <div className="px-7 pb-7 pt-0 text-[rgb(31,41,51)] leading-relaxed">
                  <div className="border-t-2 border-[rgb(0,94,184)]/30 pt-6">
                    <p className="text-base md:text-lg">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA pequeño */}
        <div className="mt-16 bg-gradient-to-r from-[rgb(191,231,249)] to-[rgb(232,237,238)] rounded-3xl p-12 text-center border-2 border-[rgb(0,94,184)]/30">
          <h3 className="text-2xl md:text-3xl font-bold text-[rgb(31,41,51)] mb-4">
            ¿Tienes otra pregunta?
          </h3>
          <p className="text-lg text-[rgb(130,131,130)] mb-8">
            Nuestro equipo te responderá en <span className="font-bold text-[rgb(31,41,51)]">menos de 24 horas</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+34633261963"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-[rgb(200,207,210)] text-[rgb(31,41,51)] font-bold text-lg rounded-2xl hover:bg-[rgb(232,237,238)] hover:border-[rgb(0,94,184)] shadow-md hover:shadow-lg transition-all"
            >
              <Phone className="w-5 h-5" /> Llamar ahora
            </a>
            <button
              onClick={openWizard}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[rgb(0,94,184)] text-white font-bold text-lg rounded-2xl hover:bg-[rgb(32,113,188)] shadow-md hover:shadow-lg transition-all"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
