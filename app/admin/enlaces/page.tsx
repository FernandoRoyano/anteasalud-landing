"use client";

import { useState } from 'react';
import {
  Globe,
  LayoutDashboard,
  ExternalLink,
  Copy,
  Check,
  FileText,
  MapPin,
  Database,
  Search,
  MessageCircle,
  Briefcase,
} from 'lucide-react';

interface LinkItem {
  label: string;
  url: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface LinkGroup {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  links: LinkItem[];
}

const GROUPS: LinkGroup[] = [
  {
    title: 'Web pública — Landing principal',
    icon: Globe,
    links: [
      { label: 'Home', url: 'https://anteasalud.com', description: 'Página principal de ANTEA Salud' },
    ],
  },
  {
    title: 'Landing pages por servicio',
    icon: FileText,
    links: [
      {
        label: 'Ejercicio para personas mayores Madrid',
        url: 'https://anteasalud.com/ejercicio-personas-mayores-madrid',
        description: 'Tu keyword SEO principal',
      },
      {
        label: 'Prevención de caídas en Madrid',
        url: 'https://anteasalud.com/prevencion-caidas-mayores-madrid',
        description: 'Landing comercial de prevención',
      },
      {
        label: 'Recuperar autonomía mayores Madrid',
        url: 'https://anteasalud.com/recuperar-autonomia-mayores-madrid',
        description: 'Post-operatorio y readaptación',
      },
    ],
  },
  {
    title: 'Landing pages por zona',
    icon: MapPin,
    links: [
      {
        label: 'Madrid capital',
        url: 'https://anteasalud.com/ejercicio-mayores-madrid-capital',
        description: 'Sin recargo de desplazamiento',
      },
      {
        label: 'Móstoles',
        url: 'https://anteasalud.com/ejercicio-mayores-mostoles',
      },
      {
        label: 'Getafe',
        url: 'https://anteasalud.com/ejercicio-mayores-getafe',
      },
    ],
  },
  {
    title: 'VSL y lead magnet',
    icon: FileText,
    links: [
      {
        label: 'Nuestro método (vídeo VSL)',
        url: 'https://anteasalud.com/nuestro-metodo',
        description: 'Página con el vídeo de presentación y CTA al wizard',
      },
      {
        label: 'Guía: 10 ejercicios para prevenir caídas',
        url: 'https://anteasalud.com/guia-prevencion-caidas',
        description: 'Descarga gratuita que captura email',
      },
    ],
  },
  {
    title: 'Panel de administración',
    icon: LayoutDashboard,
    links: [
      { label: 'Dashboard', url: '/admin/dashboard', description: 'KPIs de leads web' },
      { label: 'Leads web', url: '/admin/leads', description: 'Leads del formulario + guía (con badge)' },
      { label: 'Clientes', url: '/admin/clientes', description: 'Gestión de Tino, Isabel...' },
      { label: 'Sesiones', url: '/admin/sesiones', description: 'Calendario y cobros por WhatsApp' },
      { label: 'Guion vídeo VSL', url: '/admin/guion-video', description: 'Guion del vídeo "Nuestro método" listo para grabar' },
    ],
  },
  {
    title: 'Google Sheets (datos)',
    icon: Database,
    links: [
      {
        label: 'Spreadsheet principal',
        url: 'https://docs.google.com/spreadsheets/d/1BUnzJ-IZE9BUbzYug9CaqrO8uJ0D2ls7szCFXm5AVas',
        description: 'Hoja 1 (leads) · Guía caídas · Clientes · Sesiones',
      },
    ],
  },
  {
    title: 'Herramientas de Google',
    icon: Search,
    links: [
      {
        label: 'Google Search Console',
        url: 'https://search.google.com/search-console?resource_id=sc-domain:anteasalud.com',
        description: 'Ver indexación, tráfico orgánico y errores SEO',
      },
      {
        label: 'Google Business Profile',
        url: 'https://business.google.com',
        description: 'Ficha de Google Maps (pendiente verificación)',
      },
      {
        label: 'Google Analytics 4',
        url: 'https://analytics.google.com',
        description: 'Pendiente de configurar ID',
      },
    ],
  },
  {
    title: 'Infraestructura',
    icon: Briefcase,
    links: [
      {
        label: 'Vercel Dashboard',
        url: 'https://vercel.com/dashboard',
        description: 'Deploys, DNS, env vars',
      },
      {
        label: 'Repositorio GitHub',
        url: 'https://github.com/FernandoRoyano/anteasalud-landing',
        description: 'Código fuente del proyecto',
      },
    ],
  },
  {
    title: 'Contacto directo',
    icon: MessageCircle,
    links: [
      {
        label: 'WhatsApp 633 261 963',
        url: 'https://wa.me/34633261963',
        description: 'Abre WhatsApp con tu propio número',
      },
    ],
  },
];

export default function EnlacesPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (url: string) => {
    try {
      const fullUrl = url.startsWith('/') ? `https://anteasalud.com${url}` : url;
      await navigator.clipboard.writeText(fullUrl);
      setCopied(url);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      alert('No se pudo copiar al portapapeles');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-black text-[rgb(31,41,51)]">Enlaces</h1>
        <p className="text-[rgb(130,131,130)] mt-1">
          Todas las URLs importantes del proyecto en un solo sitio
        </p>
      </div>

      <div className="space-y-4">
        {GROUPS.map((group) => {
          const Icon = group.icon;
          return (
            <div
              key={group.title}
              className="bg-white rounded-2xl shadow-md border border-[rgb(200,207,210)] overflow-hidden"
            >
              <div className="flex items-center gap-3 px-5 py-4 bg-[rgb(232,237,238)] border-b border-[rgb(200,207,210)]">
                <div className="w-9 h-9 rounded-xl bg-[rgb(0,94,184)] flex items-center justify-center">
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <h2 className="font-bold text-[rgb(31,41,51)]">{group.title}</h2>
              </div>

              <div className="divide-y divide-[rgb(232,237,238)]">
                {group.links.map((link) => {
                  const isJustCopied = copied === link.url;
                  return (
                    <div
                      key={link.url}
                      className="flex items-center gap-3 px-5 py-4 hover:bg-[rgb(232,237,238)]/50 transition"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[rgb(31,41,51)] text-sm md:text-base">
                          {link.label}
                        </p>
                        {link.description && (
                          <p className="text-xs text-[rgb(130,131,130)] mt-0.5">
                            {link.description}
                          </p>
                        )}
                        <p className="text-xs text-[rgb(0,94,184)] font-mono mt-1 truncate">
                          {link.url}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => handleCopy(link.url)}
                          className="w-9 h-9 rounded-lg bg-[rgb(191,231,249)] text-[rgb(0,94,184)] flex items-center justify-center hover:bg-[rgb(0,94,184)] hover:text-white transition"
                          title="Copiar al portapapeles"
                        >
                          {isJustCopied ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                        <a
                          href={link.url}
                          target={link.url.startsWith('/') ? '_self' : '_blank'}
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-lg bg-[rgb(0,94,184)] text-white flex items-center justify-center hover:bg-[rgb(32,113,188)] transition"
                          title="Abrir"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-[rgb(191,231,249)] rounded-2xl p-5 text-sm text-[rgb(31,41,51)]">
        <p className="font-bold mb-1">💡 Tip:</p>
        <p>
          Guarda en marcadores <code className="bg-white px-1.5 py-0.5 rounded font-mono text-xs">anteasalud.com/admin/enlaces</code> y tendrás acceso rápido a todo desde cualquier navegador.
        </p>
      </div>
    </div>
  );
}

