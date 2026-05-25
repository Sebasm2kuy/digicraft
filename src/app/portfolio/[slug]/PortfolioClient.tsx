'use client';

import { useEffect } from 'react';
import { Icon } from '@iconify/react';

interface PortfolioProject {
  slug: string;
  title: string;
  icon: string;
  description: string;
  category: string;
  liveUrl?: string;
}

const projects: Record<string, PortfolioProject> = {
  ecommerce: {
    slug: 'ecommerce',
    title: 'E-Commerce Premium',
    icon: 'mdi:cart',
    category: 'Desarrollo Web',
    description: 'Tienda online de alto rendimiento con diseño boutique, checkout optimizado y experiencia de compra excepcional para clientes exigentes.',
  },
  'fitness-app': {
    slug: 'fitness-app',
    title: 'Fitness Tracker Pro',
    icon: 'mdi:run-fast',
    category: 'App Móvil',
    description: 'App de seguimiento fitness con dashboard intuitivo, rutinas personalizadas y métricas en tiempo real para alcanzar tus metas.',
  },
  'boda-romantica': {
    slug: 'boda-romantica',
    title: 'Boda Romántica',
    icon: 'mdi:heart',
    category: 'Invitación Virtual',
    description: 'Invitación digital elegante con animaciones románticas, galería interactiva y RSVP en línea para el día más especial.',
  },
  'spot-publicitario': {
    slug: 'spot-publicitario',
    title: 'Spot Publicitario',
    icon: 'mdi:filmstrip',
    category: 'Producción Audiovisual',
    description: 'Pieza audiovisual de alta producción para campañas publicitarias con motion graphics y color grading cinematográfico.',
  },
  'cafe-artesanal': {
    slug: 'cafe-artesanal',
    title: 'Identidad Café Artesanal',
    icon: 'mdi:coffee',
    category: 'Branding',
    description: 'Sistema de identidad visual completo para café artesanal: logo, papelería, packaging y guía de marca.',
  },
  'fashion-editorial': {
    slug: 'fashion-editorial',
    title: 'Sesión Fashion Editorial',
    icon: 'mdi:hanger',
    category: 'Edición de Fotos',
    description: 'Retoque profesional de fotografía editorial de moda con estética premium para publicaciones internacionales.',
  },
  'tarjetas-virtuales': {
    slug: 'tarjetas-virtuales',
    title: 'Tarjetas Virtuales Premium',
    icon: 'mdi:card-account-details',
    category: 'Invitación Virtual',
    description: 'Tarjetas de presentación digitales interactivas con animaciones personalizadas y diseño exclusivo.',
  },
  'cuidar-contigo': {
    slug: 'cuidar-contigo',
    title: 'Cuidar Contigo',
    icon: 'mdi:heart-pulse',
    category: 'App Móvil',
    description: 'Aplicación de cuidado y salud personal con seguimiento de bienestar, recordatorios de medicamentos y contacto de emergencia. Diseñada para cuidadores y personas que necesitan atención personalizada.',
    liveUrl: 'https://cuidar-contigo-app.vercel.app/',
  },
};

export default function PortfolioClient({ slug }: { slug: string }) {
  const project = projects[slug];

  // Redirect to home if slug doesn't exist
  useEffect(() => {
    if (!project) {
      window.location.href = '/digicraft/#portfolio';
    }
  }, [project]);

  if (!project) {
    return null;
  }

  return (
    <>
      {/* Noise texture */}
      <div className="noise" aria-hidden="true">
        <svg>
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* Page background */}
      <div
        style={{
          minHeight: '100vh',
          background: 'var(--bg)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Radial gradient gold effect */}
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '800px',
            height: '800px',
            background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '2rem 1.5rem',
            textAlign: 'center',
          }}
        >
          {/* Back to portfolio link */}
          <div className="fade-in-up" style={{ marginBottom: '3rem' }}>
            <a
              href="/digicraft/#portfolio"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--text-muted)',
                fontSize: '0.85rem',
                fontFamily: "'Syne', sans-serif",
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                transition: 'color 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              <Icon icon="mdi:arrow-left" width={18} />
              Volver al Portfolio
            </a>
          </div>

          {/* Icon */}
          <div className="fade-in-up fade-in-up-delay-1 pulse-border" style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--accent-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
            <Icon icon={project.icon} width={36} style={{ color: 'var(--accent)' }} />
          </div>

          {/* Label */}
          <p className="label fade-in-up fade-in-up-delay-1" style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
            DigiCraft Studio — Proyecto
          </p>

          {/* Title */}
          <h1 className="heading-lg fade-in-up fade-in-up-delay-2" style={{ color: 'var(--text-main)', marginBottom: '1.5rem', maxWidth: '600px' }}>
            {project.title}
          </h1>

          {/* Live link or coming soon */}
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary fade-in-up fade-in-up-delay-2"
              style={{ marginBottom: '2rem' }}
            >
              Ver App en Vivo <Icon icon="mdi:open-in-new" width={18} />
            </a>
          ) : (
            <p className="shimmer-text fade-in-up fade-in-up-delay-2" style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.25rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '2rem' }}>
              Próximamente
            </p>
          )}

          {/* Description */}
          <p className="fade-in-up fade-in-up-delay-3" style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '550px', marginBottom: '2.5rem' }}>
            {project.description}
          </p>

          {/* Gold divider */}
          <div className="fade-in-up fade-in-up-delay-3" style={{ width: '60px', height: '2px', background: 'var(--accent)', marginBottom: '2.5rem' }} />

          {/* Category tag */}
          <span className="fade-in-up fade-in-up-delay-4" style={{ display: 'inline-block', padding: '0.5rem 1.25rem', border: '1px solid var(--border)', borderRadius: '4px', fontFamily: "'Syne', sans-serif", fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)' }}>
            {project.category}
          </span>
        </div>

        {/* Brand at bottom */}
        <div
          className="fade-in-up fade-in-up-delay-4"
          style={{
            position: 'fixed',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: '0.9rem',
            letterSpacing: '-0.02em',
          }}
        >
          Digi<span style={{ color: 'var(--accent)' }}>Craft</span> Studio
        </div>
      </div>
    </>
  );
}
