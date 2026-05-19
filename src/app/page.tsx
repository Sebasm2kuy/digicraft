'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import {
  Globe,
  Smartphone,
  Mail,
  ImagePlus,
  Film,
  Palette,
  ArrowRight,
  CheckCircle,
  XCircle,
  Menu,
  X,
  ChevronDown,
  User,
  Heart,
  Quote,
  Send,
  Phone,
  Instagram,
  Twitter,
  Linkedin,
  MessageCircle,
} from 'lucide-react';

/* ============================================
   DATA
   ============================================ */

const services = [
  {
    icon: <Globe size={28} />,
    title: 'Desarrollo Web',
    desc: 'Sitios web modernos, rápidos y responsivos. Desde landing pages hasta tiendas online completas con las últimas tecnologías.',
  },
  {
    icon: <Smartphone size={28} />,
    title: 'Apps Móviles',
    desc: 'Aplicaciones nativas y multiplataforma con experiencias fluidas. iOS, Android y PWA para llegar a todos tus usuarios.',
  },
  {
    icon: <Mail size={28} />,
    title: 'Invitaciones Virtuales',
    desc: 'Invitaciones interactivas para bodas, cumpleaños y eventos. Diseños únicos con animaciones, RSVP y galería de fotos.',
  },
  {
    icon: <ImagePlus size={28} />,
    title: 'Edición de Fotos',
    desc: 'Retoque profesional, composición, manipulación digital y optimización para redes sociales o impresión de alta calidad.',
  },
  {
    icon: <Film size={28} />,
    title: 'Edición de Video',
    desc: 'Montaje cinematográfico, motion graphics, color grading y efectos especiales para contenido que impacta y conecta.',
  },
  {
    icon: <Palette size={28} />,
    title: 'Diseño & Branding',
    desc: 'Identidad visual completa: logos, paletas, tipografías y guías de marca para destacar en un mercado competitivo.',
  },
];

const stats = [
  { number: 150, suffix: '+', label: 'Proyectos Completados' },
  { number: 120, suffix: '+', label: 'Clientes Felices' },
  { number: 5, suffix: '', label: 'Años de Experiencia' },
  { number: 12, suffix: '', label: 'Países Alcanzados' },
];

const portfolio = [
  {
    title: 'E-Commerce Premium',
    category: 'Desarrollo Web',
    seed: 'webdesign1',
  },
  {
    title: 'Fitness Tracker Pro',
    category: 'Apps Móviles',
    seed: 'appmobile2',
  },
  {
    title: 'Boda Romántica',
    category: 'Invitación Virtual',
    seed: 'invitation3',
  },
  {
    title: 'Spot Publicitario',
    category: 'Edición de Video',
    seed: 'videoedit4',
  },
  {
    title: 'Identidad Café Artesanal',
    category: 'Branding',
    seed: 'branding5',
  },
  {
    title: 'Sesión Fashion Editorial',
    category: 'Edición de Fotos',
    seed: 'photoedit6',
  },
];

const processSteps = [
  {
    number: '01',
    title: 'Descubrimos',
    desc: 'Escuchamos tu idea, analizamos tus objetivos y definimos la estrategia perfecta para tu proyecto. Sin costos ocultos.',
  },
  {
    number: '02',
    title: 'Creamos',
    desc: 'Diseñamos y desarrollamos con los más altos estándares. Recibes actualizaciones constantes y revisiones ilimitadas.',
  },
  {
    number: '03',
    title: 'Entregamos',
    desc: 'Lanzamos tu proyecto al mundo y te damos soporte continuo. Tu éxito es nuestra mejor carta de presentación.',
  },
];

const pricing = [
  {
    name: 'Starter',
    price: '$99',
    period: 'USD',
    desc: 'Perfecto para comenzar tu presencia digital',
    featured: false,
    features: [
      { text: 'Landing page responsiva', included: true },
      { text: 'Diseño de 1 invitación virtual', included: true },
      { text: '5 fotos editadas', included: true },
      { text: 'Entrega en 5 días', included: true },
      { text: 'Revisión ilimitada', included: false },
    ],
  },
  {
    name: 'Pro',
    price: '$249',
    period: 'USD',
    desc: 'Ideal para negocios en crecimiento',
    featured: true,
    features: [
      { text: 'Sitio web multi-página', included: true },
      { text: '3 invitaciones virtuales', included: true },
      { text: '15 fotos + 1 video editado', included: true },
      { text: 'Entrega en 7 días', included: true },
      { text: '3 rondas de revisión', included: true },
    ],
  },
  {
    name: 'Premium',
    price: '$499',
    period: 'USD',
    desc: 'Solución completa para tu marca',
    featured: false,
    features: [
      { text: 'App o web completa + backend', included: true },
      { text: 'Invitaciones ilimitadas', included: true },
      { text: 'Paquete foto + video completo', included: true },
      { text: 'Branding completo', included: true },
      { text: 'Soporte prioritario 30 días', included: true },
    ],
  },
];

const testimonials = [
  {
    text: 'La invitación virtual para mi boda fue espectacular. Todos los invitados quedaron impresionados con la animación y la interactividad. ¡100% recomendado!',
    author: 'María González',
    role: 'Invitación Virtual',
    initials: 'MG',
  },
  {
    text: 'Nos desarrollaron la app para nuestro restaurante en tiempo récord. La interfaz es intuitiva y los clientes la aman. Ventas incrementaron un 40%.',
    author: 'Carlos Mendoza',
    role: 'App Móvil',
    initials: 'CM',
  },
  {
    text: 'El video corporativo que crearon para nuestra startup fue clave para conseguir inversión. Profesionales, creativos y siempre puntuales.',
    author: 'Ana Rodríguez',
    role: 'Edición de Video',
    initials: 'AR',
  },
];

const marqueeItems = [
  'Desarrollo Web',
  'Aplicaciones Móviles',
  'Invitaciones Virtuales',
  'Edición de Fotos',
  'Edición de Videos',
  'Diseño Gráfico',
  'Branding',
];

const navLinks = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Precios', href: '#precios' },
  { label: 'Contacto', href: '#contacto' },
];

/* ============================================
   COMPONENT
   ============================================ */

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [whatsappVisible, setWhatsappVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [countersAnimated, setCountersAnimated] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const toastTimeout = useRef<NodeJS.Timeout | null>(null);

  /* ---- Custom Cursor ---- */
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (cursorRef.current) {
      cursorRef.current.style.left = `${e.clientX}px`;
      cursorRef.current.style.top = `${e.clientY}px`;
      cursorRef.current.style.transform = 'translate(-50%, -50%)';
    }
    if (followerRef.current) {
      followerRef.current.style.left = `${e.clientX}px`;
      followerRef.current.style.top = `${e.clientY}px`;
      followerRef.current.style.transform = 'translate(-50%, -50%)';
    }
  }, []);

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const isInteractive =
      target.tagName === 'A' ||
      target.tagName === 'BUTTON' ||
      target.closest('a') ||
      target.closest('button');
    if (isInteractive) {
      cursorRef.current?.classList.add('hovering');
      followerRef.current?.classList.add('hovering');
    } else {
      cursorRef.current?.classList.remove('hovering');
      followerRef.current?.classList.remove('hovering');
    }
  }, []);

  /* ---- Reveal on Scroll ---- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ---- Scroll Events ---- */
  useEffect(() => {
    const onScroll = () => {
      // Navbar shrink
      setNavScrolled(window.scrollY > 80);

      // WhatsApp button
      setWhatsappVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ---- Stats Counter ---- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !countersAnimated) {
            setCountersAnimated(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    return () => observer.disconnect();
  }, [countersAnimated]);

  /* ---- Cursor Events ---- */
  useEffect(() => {
    if (window.innerWidth > 1024) {
      window.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseover', handleMouseOver);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [handleMouseMove, handleMouseOver]);

  /* ---- Toast helper ---- */
  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    if (toastTimeout.current) clearTimeout(toastTimeout.current);
    toastTimeout.current = setTimeout(() => {
      setToastVisible(false);
    }, 4000);
  };

  /* ---- Smooth scroll ---- */
  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  /* ---- Form submit ---- */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('¡Mensaje enviado con éxito! Te contactaremos pronto.');
    (e.target as HTMLFormElement).reset();
  };

  /* ---- Menu body lock ---- */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      {/* ===== FLOATING ELEMENTS ===== */}
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={followerRef} className="cursor-follower" />
      <div className="noise-overlay" />

      {/* ===== TOAST ===== */}
      <div className={`toast ${toastVisible ? 'show' : ''}`}>
        <CheckCircle size={20} className="toast-icon" />
        <span>{toastMessage}</span>
      </div>

      {/* ===== WHATSAPP FLOAT ===== */}
      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
        className={`whatsapp-float ${whatsappVisible ? 'visible' : ''}`}
        aria-label="WhatsApp"
      >
        <MessageCircle size={28} />
      </a>

      {/* ===== NAVIGATION ===== */}
      <nav className={`navbar ${navScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <a href="#" className="nav-logo">
            Digi<span className="accent">Craft</span>
          </a>

          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* ===== MENU OVERLAY ===== */}
      <div className={`menu-overlay ${menuOpen ? 'open' : ''}`}>
        <ul className="menu-overlay-links">
          {navLinks.map((link, i) => (
            <li key={link.href} style={{ transitionDelay: menuOpen ? `${i * 0.08}s` : '0s' }}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* ===== HERO ===== */}
      <section className="hero">
        <video
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect fill='%23171717' width='1920' height='1080'/%3E%3C/svg%3E"
        >
          <source src="https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_30fps.mp4" type="video/mp4" />
        </video>
        <div className="hero-content">
          <div className="hero-label reveal">Estudio Digital Creativo</div>
          <h1 className="display-xl filled reveal reveal-delay-1">Creamos Lo Digital</h1>
          <p className="hero-subtitle reveal reveal-delay-2">
            Transformamos ideas en experiencias digitales extraordinarias. Diseño, desarrollo y
            creatividad para llevar tu marca al siguiente nivel.
          </p>
          <button
            className="btn-primary reveal reveal-delay-3"
            onClick={() => handleNavClick('#contacto')}
          >
            Empezar Proyecto <ArrowRight size={18} />
          </button>
        </div>
        <div className="scroll-indicator">
          <span>Scroll</span>
          <ChevronDown size={20} color="var(--text-muted)" />
        </div>
      </section>

      {/* ===== MARQUEE ===== */}
      <div className="marquee-section">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i}>
              {item}
              <span className="separator">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ===== SERVICES ===== */}
      <section id="servicios" className="section">
        <div className="section-header reveal">
          <div className="section-label">Nuestros Servicios</div>
          <h2 className="section-title">Lo que hacemos mejor</h2>
        </div>
        <div className="services-grid">
          {services.map((service, i) => (
            <div
              className={`service-card reveal reveal-delay-${Math.min(i + 1, 5)}`}
              key={service.title}
            >
              <div className="service-card-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <div className="service-card-arrow">
                Saber más <ArrowRight size={16} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== STATS ===== */}
      <div className="stats-section" ref={statsRef}>
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <div
              className={`stat-item reveal reveal-delay-${i + 1}`}
              key={stat.label}
            >
              <div className="stat-number">
                {countersAnimated ? stat.number : 0}
                {stat.suffix}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== PORTFOLIO ===== */}
      <section id="portfolio" className="section">
        <div className="section-header reveal">
          <div className="section-label">Portfolio</div>
          <h2 className="section-title">Trabajos Recientes</h2>
        </div>
        <div className="portfolio-grid">
          {portfolio.map((item, i) => (
            <div
              className={`portfolio-item reveal reveal-delay-${Math.min(i + 1, 5)}`}
              key={item.seed}
            >
              <Image
                src={`https://picsum.photos/seed/${item.seed}/800/600.jpg`}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                unoptimized
              />
              <div className="portfolio-overlay">
                <h3>{item.title}</h3>
                <p>{item.category}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section id="proceso" className="section divider-section">
        <div className="section-header reveal">
          <div className="section-label">Nuestro Proceso</div>
          <h2 className="section-title">Cómo Trabajamos</h2>
        </div>
        <div className="process-grid">
          {processSteps.map((step, i) => (
            <div
              className={`process-step reveal reveal-delay-${i + 1}`}
              key={step.number}
            >
              <div className="process-step-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section id="precios" className="section divider-section">
        <div className="section-header reveal" style={{ textAlign: 'center' }}>
          <div className="section-label">Precios</div>
          <h2 className="section-title">Planes que se adaptan a ti</h2>
        </div>
        <div className="pricing-grid">
          {pricing.map((plan, i) => (
            <div
              className={`pricing-card reveal reveal-delay-${i + 1} ${plan.featured ? 'featured' : ''}`}
              key={plan.name}
            >
              <div className="pricing-badge">Más Popular</div>
              <h3>{plan.name}</h3>
              <div className="price">
                {plan.price}
                <span> / {plan.period}</span>
              </div>
              <p className="price-desc">{plan.desc}</p>
              <ul className="pricing-features">
                {plan.features.map((f) => (
                  <li key={f.text} className={f.included ? '' : 'disabled'}>
                    {f.included ? <CheckCircle size={18} /> : <XCircle size={18} />}
                    {f.text}
                  </li>
                ))}
              </ul>
              <button
                className={plan.featured ? 'btn-primary' : 'btn-outline'}
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => handleNavClick('#contacto')}
              >
                Elegir Plan <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section divider-section">
        <div className="section-header reveal" style={{ textAlign: 'center' }}>
          <div className="section-label">Testimonios</div>
          <h2 className="section-title">Lo que dicen nuestros clientes</h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div
              className={`testimonial-card reveal reveal-delay-${i + 1}`}
              key={t.author}
            >
              <Quote size={32} className="quote-icon" />
              <p>&ldquo;{t.text}&rdquo;</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  <User size={20} />
                </div>
                <div className="testimonial-info">
                  <h4>{t.author}</h4>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contacto" className="section divider-section">
        <div className="section-header reveal" style={{ textAlign: 'center' }}>
          <div className="section-label">Contacto</div>
          <h2 className="section-title">Hablemos de tu proyecto</h2>
        </div>
        <div className="contact-grid">
          {/* Left - Info */}
          <div className="reveal">
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <Mail size={22} />
              </div>
              <div>
                <h4>Email</h4>
                <a href="mailto:hola@digicraft.studio">hola@digicraft.studio</a>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <Phone size={22} />
              </div>
              <div>
                <h4>WhatsApp</h4>
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                  +1 (234) 567-890
                </a>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <Instagram size={22} />
              </div>
              <div>
                <h4>Instagram</h4>
                <a
                  href="https://instagram.com/digicraft"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @digicraft.studio
                </a>
              </div>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.7', marginTop: '1rem' }}>
              ¿Tienes un proyecto en mente? Escríbenos y te responderemos en menos de 24 horas.
              Estamos listos para crear algo increíble juntos.
            </p>
          </div>

          {/* Right - Form */}
          <form className="contact-form reveal reveal-delay-2" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input type="text" id="nombre" placeholder="Tu nombre completo" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="tu@email.com" required />
            </div>
            <div className="form-group">
              <label htmlFor="servicio">Servicio</label>
              <select id="servicio" required defaultValue="">
                <option value="" disabled>
                  Selecciona un servicio
                </option>
                <option value="web">Desarrollo Web</option>
                <option value="app">Apps Móviles</option>
                <option value="invitacion">Invitaciones Virtuales</option>
                <option value="fotos">Edición de Fotos</option>
                <option value="video">Edición de Video</option>
                <option value="branding">Diseño & Branding</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="mensaje">Mensaje</label>
              <textarea
                id="mensaje"
                placeholder="Cuéntanos sobre tu proyecto..."
                required
              />
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Enviar Mensaje <Send size={16} />
            </button>
          </form>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="cta-banner">
        <div className="reveal">
          <h2 className="display-xl filled" style={{ marginBottom: '2rem' }}>
            ¿Listo?
          </h2>
          <button
            className="btn-primary reveal reveal-delay-1"
            onClick={() => handleNavClick('#contacto')}
          >
            Comenzar Ahora <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <a href="#" className="nav-logo" style={{ fontSize: '1.3rem' }}>
              Digi<span className="accent">Craft</span>
            </a>
            <p>
              Estudio digital creativo especializado en transformar ideas en experiencias
              digitales extraordinarias. Tu visión, nuestra experiencia.
            </p>
            <div className="footer-social">
              <a href="https://instagram.com/digicraft" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://twitter.com/digicraft" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="https://linkedin.com/company/digicraft" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Navegación</h4>
            <ul>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-links">
            <h4>Servicios</h4>
            <ul>
              {services.map((s) => (
                <li key={s.title}>
                  <a href="#servicios" onClick={(e) => { e.preventDefault(); handleNavClick('#servicios'); }}>
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 DigiCraft Studio. Todos los derechos reservados.</p>
          <p>
            Hecho con <Heart size={14} style={{ display: 'inline', verticalAlign: 'middle', color: 'var(--accent)' }} /> por DigiCraft
          </p>
        </div>
      </footer>
    </>
  );
}
