"use client";

import { useState } from 'react';

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "¿Cómo funciona el primer contacto?",
      answer: "Es muy sencillo. Llamas, escribes o envías un WhatsApp. En menos de 24 horas te contactamos para una valoración completamente gratuita. Conocemos tu situación, necesidades y objetivos. Sin compromiso."
    },
    {
      question: "¿Cuánto cuesta una sesión?",
      answer: "Los precios varían según la duración, la frecuencia y el tipo de servicio (entrenamiento funcional, fisioterapia especializada, etc.). Tras la valoración inicial, te presentamos un plan personalizado con presupuesto exacto. Puedes elegir planes de 1-3 sesiones por semana."
    },
    {
      question: "¿Qué documentación necesito?",
      answer: "Solo nos interesa entender tu estado de salud actual. Si tienes informes médicos recientes (resonancias, operaciones, etc.), nos ayuda a diseñar un mejor plan. Pero no es obligatorio. Realizaremos una evaluación completa en la primera sesión."
    },
    {
      question: "¿Los profesionales están titulados?",
      answer: "Sí, 100%. Todos nuestros fisioterapeutas y entrenadores están titulados universitarios, colegiados y especializados en personas mayores. Verificamos sus credenciales antes de trabajar con nosotros."
    },
    {
      question: "¿Cuántas sesiones necesita?",
      answer: "Depende de cada persona. Algunos ven resultados en 4-6 semanas, otros necesitan 2-3 meses. La mayoría nota mejora en equilibrio, fuerza y confianza en 6-8 sesiones. Evaluamos constantemente y ajustamos el plan."
    },
    {
      question: "¿Puedo dejar de ir si veo que mejoro?",
      answer: "Claro. El objetivo es que recuperes autonomía y confianza. Una vez alcanzados tus objetivos, puedes seguir con sesiones de mantenimiento menos frecuentes o parar. Tú controlas tu plan."
    },
    {
      question: "¿Qué pasa si no me siento cómodo con el profesional?",
      answer: "Sin problema. Si en la primera sesión sientes que no es el adecuado, lo comunicamos y buscamos otro. Tu comodidad y confianza son prioritarias. Queremos que te sientas seguro."
    },
    {
      question: "¿Hacéis coordinación con mi médico?",
      answer: "Sí, si lo necesitas. Podemos coordinarnos con tu médico o fisioterapeuta del hospital para alinear objetivos y compartir evolución. Trabajamos en equipo por tu salud."
    },
    {
      question: "¿Dónde operáis?",
      answer: "Operamos en toda España. Vamos a domicilio, así que nos desplazamos donde tú estés. Consulta con nosotros si tu ciudad está incluida."
    },
    {
      question: "¿Hay opciones de pago flexible?",
      answer: "Sí. Ofrecemos planes de pago mensuales, quincenales o por sesión suelta. También aceptamos domiciliaciones bancarias para mayor comodidad. Consulta las opciones disponibles en tu zona."
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="w-full bg-white py-24 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-2 bg-[rgb(191,231,249)] rounded-full">
            <span className="text-sm font-semibold text-[rgb(0,94,184)]">Preguntas frecuentes</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[rgb(31,41,51)]">
            Respuestas a tus dudas
          </h2>
          <p className="text-xl text-[rgb(130,131,130)] max-w-2xl mx-auto">
            Todo lo que necesitas saber sobre nuestro servicio de ejercicio y fisioterapia a domicilio
          </p>
        </div>

        {/* Acordeón FAQs */}
        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-2xl border-2 transition-all duration-300 ${openIndex === index
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
              className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-[rgb(200,207,210)] text-[rgb(31,41,51)] font-bold text-lg rounded-2xl hover:bg-[rgb(232,237,238)] hover:border-[rgb(0,94,184)] shadow-md hover:shadow-lg transition-all"
            >
              📞 Llamar ahora
            </a>
            <a
              href="https://wa.me/34633261963?text=Tengo%20una%20pregunta%20sobre%20ANTEA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-[rgb(0,94,184)] text-white font-bold text-lg rounded-2xl hover:bg-[rgb(32,113,188)] shadow-md hover:shadow-lg transition-all"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
