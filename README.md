# 🏃‍♂️ ANTEASalud · Landing Page

Landing profesional para captación de familias que buscan ejercicio funcional y fisioterapia a domicilio para mayores.

Desarrollado con **Next.js, Tailwind CSS** y **EmailJS** para recepción de contactos instantánea sin backend.

---

## 🚀 Instalación y Arranque

Instala dependencias
npm install

Inicia el servidor de desarrollo
npm run dev

text

---

## 📦 Estructura principal

- **Menú móvil tipo bottom sheet** (moderno y ultra usable)
- **Secciones premium:** Hero, Beneficios, Solución, Servicios, Proceso, Opiniones, Cobertura, FAQs, CTA y Footer
- **Formulario profesional:** con EmailJS y feedback visual
- **WhatsApp flotante y contacto directo**
- **100% responsive y accesible**

---

## ✉️ EmailJS: Integración y configuración

1. Crea cuenta y servicio en [EmailJS](https://www.emailjs.com/)
2. Configura en el Dashboard el correo de recepción
3. Copia tus claves en `components/Contacto.tsx`:
   - `service_antea_contacto`
   - `Antea Salud` (nombre de plantilla)
   - Tu Public Key (ejemplo: `GkuifuSj9iMoXN9fw`)
4. Los campos enviados están mapeados en la plantilla HTML de EmailJS
5. Puedes personalizar el asunto, cuerpo y destinatario desde el panel

---

## 🛡️ Seguridad y buenas prácticas

- Todas las claves (.env, .env.local) y archivos de entorno están excluidos con `.gitignore`
- No se expone información sensible en el repo
- Los emails llegan solo a la cuenta configurada en EmailJS (modificable en el Dashboard)

---

## 📱 Despliegue y Producción

Puedes desplegar en **Vercel, Netlify, Render** o cualquier host compatible con Next.js  
Solo necesitas configurar tus variables de entorno y clave pública de EmailJS.

---

## 🔗 Links útiles

- [Anteasalud.com (preview)](https://anteasalud.com)  <!-- Opcional, añade si tienes Live Demo -->
- [EmailJS Dashboard](https://dashboard.emailjs.com/)
- [Tailwind CSS docs](https://tailwindcss.com/docs)

---

## 📞 Contacto & soporte

¿Dudas? ¿Feedback?  
Abre un issue en GitHub, o usa el propio formulario de contacto de la landing para pruebas en real.

---
