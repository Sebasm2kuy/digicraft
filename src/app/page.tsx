'use client';

import { useEffect, useRef, useState, useCallback, FormEvent } from 'react';
import { Icon } from '@iconify/react';

/* ════════════════════════════════════════════════════════════════
   DATA
   ════════════════════════════════════════════════════════════════ */

const searchData = [
  { title: 'Desarrollo Web', section: '#servicios', icon: 'mdi:web' },
  { title: 'Aplicaciones Móviles', section: '#servicios', icon: 'mdi:cellphone' },
  { title: 'Invitaciones Virtuales', section: '#servicios', icon: 'mdi:card-account-mail' },
  { title: 'Edición de Fotos', section: '#servicios', icon: 'mdi:image-edit' },
  { title: 'Edición de Video', section: '#servicios', icon: 'mdi:movie-edit' },
  { title: 'Diseño & Branding', section: '#servicios', icon: 'mdi:palette-swatch' },
  { title: 'Cuidar Contigo', section: '/digicraft/portfolio/cuidar-contigo', icon: 'mdi:heart-pulse' },
  { title: 'Centro Logístico Frimaral V2', section: '/digicraft/portfolio/frimaral-logistica', icon: 'mdi:truck-delivery' },
  { title: 'Invitación Virtual TikTok', section: '/digicraft/portfolio/invitacion-virtual', icon: 'ic:baseline-tiktok' },
  { title: 'E-Commerce Premium', section: '/digicraft/portfolio/ecommerce', icon: 'mdi:cart' },
  { title: 'Fitness Tracker Pro', section: '/digicraft/portfolio/fitness-app', icon: 'mdi:run-fast' },
  { title: 'Boda Romántica', section: '/digicraft/portfolio/boda-romantica', icon: 'mdi:heart' },
  { title: 'Spot Publicitario', section: '/digicraft/portfolio/spot-publicitario', icon: 'mdi:filmstrip' },
  { title: 'Café Artesanal', section: '/digicraft/portfolio/cafe-artesanal', icon: 'mdi:coffee' },
  { title: 'Fashion Editorial', section: '/digicraft/portfolio/fashion-editorial', icon: 'mdi:hanger' },
  { title: 'Tarjetas Virtuales Premium', section: '/digicraft/portfolio/tarjetas-virtuales', icon: 'mdi:card-account-details' },
  { title: 'Plan Starter', section: '#precios', icon: 'mdi:rocket-launch' },
  { title: 'Plan Pro', section: '#precios', icon: 'mdi:star' },
  { title: 'Plan Premium', section: '#precios', icon: 'mdi:crown' },
  { title: 'Portfolio', section: '#portfolio', icon: 'mdi:view-grid' },
  { title: 'Proceso de Trabajo', section: '#proceso', icon: 'mdi:cog' },
  { title: 'Contacto', section: '#contacto', icon: 'mdi:email' },
];

/* ─── Portfolio Items ─── */
const portfolioItems = [
  {
    slug: 'cuidar-contigo',
    title: 'Cuidar Contigo',
    category: 'App Móvil',
    icon: 'mdi:heart-pulse',
    image: '/digicraft/cuidar-contigo-preview.png',
    useLocalImage: true,
    liveUrl: 'https://cuidar-contigo-app.vercel.app/',
    description: 'App de cuidado y bienestar personal',
    liveLabel: 'Ver App',
  },
  {
    slug: 'frimaral-logistica',
    title: 'Centro Logístico Frimaral V2',
    category: 'Software a Medida',
    icon: 'mdi:truck-delivery',
    imageSeed: 'digicraft-frimaral',
    liveUrl: 'https://planilladecarga.github.io/centrologisticofrimaralV2/',
    description: 'Sistema de gestión logística con control de inventario, despachos y monitoreo de temperatura en tiempo real.',
    liveLabel: 'Ver App',
  },
  {
    slug: 'invitacion-virtual',
    title: 'Invitación Virtual',
    category: 'Invitación Virtual',
    icon: 'ic:baseline-tiktok',
    isTikTokEmbed: true,
    tikTokVideoId: '7641569299802508562',
    tikTokCite: 'https://www.tiktok.com/@digicraft.studio/video/7641569299802508562',
    description: 'Invitaciones digitales elegantes e interactivas para todo tipo de eventos.',
  },
  {
    slug: 'tarjetas-virtuales',
    title: 'Tarjetas Virtuales Premium',
    category: 'Invitación Virtual',
    icon: 'mdi:card-account-details',
    imageSeed: 'digicraft-tarjetas',
    description: 'Tarjetas de presentación digitales interactivas con diseño exclusivo.',
  },
  {
    slug: 'ecommerce',
    title: 'E-Commerce Premium',
    category: 'Desarrollo Web',
    icon: 'mdi:cart',
    imageSeed: 'digicraft-ecommerce',
    description: 'Tienda online de alto rendimiento con diseño boutique.',
  },
  {
    slug: 'fitness-app',
    title: 'Fitness Tracker Pro',
    category: 'App Móvil',
    icon: 'mdi:run-fast',
    imageSeed: 'digicraft-fitness',
    description: 'App de seguimiento fitness con dashboard intuitivo.',
  },
  {
    slug: 'boda-romantica',
    title: 'Boda Romántica',
    category: 'Invitación Virtual',
    icon: 'mdi:heart',
    imageSeed: 'digicraft-boda',
    description: 'Invitación digital elegante con animaciones románticas.',
  },
  {
    slug: 'spot-publicitario',
    title: 'Spot Publicitario',
    category: 'Producción Audiovisual',
    icon: 'mdi:filmstrip',
    imageSeed: 'digicraft-spot',
    description: 'Pieza audiovisual de alta producción con motion graphics.',
  },
  {
    slug: 'cafe-artesanal',
    title: 'Café Artesanal',
    category: 'Branding',
    icon: 'mdi:coffee',
    imageSeed: 'digicraft-cafe',
    description: 'Identidad visual completa para café artesanal.',
  },
  {
    slug: 'fashion-editorial',
    title: 'Fashion Editorial',
    category: 'Edición de Fotos',
    icon: 'mdi:hanger',
    imageSeed: 'digicraft-fashion',
    description: 'Retoque profesional de fotografía editorial de moda.',
  },
];

const stats = [
  { value: 150, suffix: '+', label: 'Proyectos Completados' },
  { value: 120, suffix: '+', label: 'Clientes Felices' },
  { value: 5, suffix: '', label: 'Años de Experiencia' },
  { value: 12, suffix: '', label: 'Países Alcanzados' },
];

const services = [
  { icon: 'mdi:web', title: 'Desarrollo Web', desc: 'Sitios web modernos, responsivos y optimizados para SEO. Desde landing pages hasta plataformas completas con la última tecnología.' },
  { icon: 'mdi:cellphone', title: 'Apps Móviles', desc: 'Aplicaciones nativas e híbridas para iOS y Android. Interfaces intuitivas con rendimiento excepcional.' },
  { icon: 'mdi:card-account-mail', title: 'Invitaciones Virtuales', desc: 'Diseños digitales elegantes e interactivos para todo tipo de eventos. Bodas, cumpleaños, quinceañeras y más.' },
  { icon: 'mdi:image-edit', title: 'Edición de Fotos', desc: 'Retoque profesional, manipulación creativa y composición digital. Resultados de alta calidad para cualquier propósito.' },
  { icon: 'mdi:movie-edit', title: 'Edición de Video', desc: 'Producción audiovisual profesional, motion graphics y color grading cinematográfico para redes sociales y más.' },
  { icon: 'mdi:palette-swatch', title: 'Diseño & Branding', desc: 'Identidad visual completa, logos, papelería y guías de marca. Creamos marcas que conectan con su audiencia.' },
];

const processSteps = [
  { num: '01', title: 'Descubrimos', desc: 'Escuchamos tus ideas, analizamos tu marca y definimos la visión del proyecto. Investigamos tu mercado y competencia para crear una estrategia sólida.' },
  { num: '02', title: 'Diseñamos', desc: 'Creamos wireframes, prototipos y el diseño visual completo de tu proyecto. Cada pixel es cuidadosamente pensado para comunicar tu marca.' },
  { num: '03', title: 'Desarrollamos', desc: 'Damos vida al diseño con código limpio y las mejores tecnologías. Construyemos experiencias rápidas, seguras y escalables.' },
  { num: '04', title: 'Lanzamos', desc: 'Probamos todo a fondo, optimizamos el rendimiento y lanzamos tu proyecto al mundo. Te acompañamos con soporte continuo.' },
];

const testimonials = [
  { name: 'María González', service: 'Invitación Virtual', quote: 'DigiCraft transformó nuestra boda digital. Las invitaciones fueron exactamente lo que soñábamos. Elegantes, interactivas y nuestros invitados quedaron encantados.', avatar: 'MG' },
  { name: 'Carlos Mendoza', service: 'App Móvil', quote: 'La app de fitness que desarrollaron superó todas nuestras expectativas. El diseño es intuitivo, el rendimiento impecable y nuestros usuarios la aman.', avatar: 'CM' },
  { name: 'Ana Rodríguez', service: 'Edición de Video', quote: 'El spot publicitario que crearon para mi marca fue increíble. La calidad cinematográfica y los motion graphics elevaron nuestra imagen al siguiente nivel.', avatar: 'AR' },
];

/* ─── Helpers ─── */
function normalize(str: string) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

const navLinks = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Precios', href: '#precios' },
  { label: 'Contacto', href: '#contacto' },
];

/* ════════════════════════════════════════════════════════════════
   COMPONENT
   ════════════════════════════════════════════════════════════════ */

export default function Home() {
  /* ─── Refs ─── */
  const navbarRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const toastRef = useRef<HTMLDivElement>(null);
  const whatsappBtnRef = useRef<HTMLAnchorElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const statsAnimated = useRef(false);

  /* ─── State ─── */
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeResult, setActiveResult] = useState(-1);
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [visitCounts, setVisitCounts] = useState<{ total: number; daily: number } | null>(null);
  const [todayDate, setTodayDate] = useState('');

  /* ─── Today's Date ─── */
  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formatted = now.toLocaleDateString('es-ES', options);
    setTodayDate(formatted.charAt(0).toUpperCase() + formatted.slice(1));
  }, []);

  /* ─── Visit Counter ─── */
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const stored = localStorage.getItem('digicraft-visits');
    let visits = { total: 0, daily: 0, lastDate: '' };
    if (stored) { try { visits = JSON.parse(stored); } catch { /* */ } }
    if (visits.lastDate !== today) visits.daily = 0;
    visits.total += 1;
    visits.daily += 1;
    visits.lastDate = today;
    localStorage.setItem('digicraft-visits', JSON.stringify(visits));
    setVisitCounts({ total: visits.total, daily: visits.daily });
  }, []);

  /* ─── Theme Toggle ─── */
  useEffect(() => {
    const saved = localStorage.getItem('digicraft-theme') as 'dark' | 'light' | null;
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const initial = saved || (prefersLight ? 'light' : 'dark');
    if (initial === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    requestAnimationFrame(() => setTheme(initial));
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.add('theme-transition');
    if (next === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('digicraft-theme', next);
    setTheme(next);
    setTimeout(() => document.documentElement.classList.remove('theme-transition'), 500);
  }, [theme]);

  /* ─── Search ─── */
  const searchResults = (() => {
    if (searchQuery.trim() === '') return searchData;
    const q = normalize(searchQuery);
    return searchData.filter((item) => normalize(item.title).includes(q));
  })();

  const openSearch = useCallback(() => {
    setSearchOpen(true);
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInputRef.current?.focus(), 100);
  }, []);

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
    setSearchQuery('');
    setActiveResult(-1);
    document.body.style.overflow = '';
  }, []);

  /* ─── Toast ─── */
  const showToast = useCallback(() => {
    if (toastRef.current) {
      toastRef.current.classList.add('show');
      setTimeout(() => toastRef.current?.classList.remove('show'), 4000);
    }
  }, []);

  /* ─── Scroll Reveal ─── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('active'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ─── Navbar scroll effect ─── */
  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        navbarRef.current.classList.toggle('scrolled', window.scrollY > 80);
      }
      if (whatsappBtnRef.current) {
        whatsappBtnRef.current.classList.toggle('visible', window.scrollY > 500);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ─── Stats Count-Up ─── */
  useEffect(() => {
    const container = statsRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsAnimated.current) {
            statsAnimated.current = true;
            stats.forEach((stat) => {
              const el = document.getElementById(`stat-${stat.value}`);
              if (!el) return;
              const duration = 2000;
              const startTime = performance.now();
              function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }
              function update(currentTime: number) {
                const progress = Math.min((currentTime - startTime) / duration, 1);
                el.textContent = Math.floor(easeOutCubic(progress) * stat.value) + stat.suffix;
                if (progress < 1) requestAnimationFrame(update);
              }
              requestAnimationFrame(update);
            });
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  /* ─── Smooth Scroll ─── */
  const scrollTo = useCallback((e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    if (target.startsWith('/digicraft')) { window.location.href = target; return; }
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
    if (menuOverlayRef.current) menuOverlayRef.current.classList.remove('open');
    document.body.style.overflow = '';
  }, []);

  /* ─── Mobile Menu ─── */
  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => {
      if (!prev) {
        document.body.style.overflow = 'hidden';
        setTimeout(() => menuOverlayRef.current?.classList.add('open'), 10);
      } else {
        document.body.style.overflow = '';
        menuOverlayRef.current?.classList.remove('open');
      }
      return !prev;
    });
  }, []);

  /* ─── Keyboard ─── */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
      if (e.key === 'Escape' && searchOpen) closeSearch();
      if (searchOpen) {
        if (e.key === 'ArrowDown') { e.preventDefault(); setActiveResult((p) => p < searchResults.length - 1 ? p + 1 : p); }
        if (e.key === 'ArrowUp') { e.preventDefault(); setActiveResult((p) => p > 0 ? p - 1 : p); }
        if (e.key === 'Enter' && activeResult >= 0) {
          e.preventDefault();
          const item = searchResults[activeResult];
          if (item) {
            if (item.section.startsWith('/digicraft')) { window.location.href = item.section; }
            else { closeSearch(); setTimeout(() => document.querySelector(item.section)?.scrollIntoView({ behavior: 'smooth' }), 100); }
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen, searchResults, activeResult, openSearch, closeSearch]);

  /* ─── Contact Form ─── */
  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    showToast();
    (e.target as HTMLFormElement).reset();
  }, [showToast]);

  /* ─── Theme Toggle Icon ─── */
  const themeIcon = theme === 'dark' ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="#F8F7F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
  );

  /* ════════════════════════════════════════════════════════════════
     RENDER
     ════════════════════════════════════════════════════════════════ */
  return (
    <>
      {/* ─── Toast ─── */}
      <div id="toast" ref={toastRef}>
        <Icon icon="mdi:check-circle" width={18} style={{ color: 'var(--accent)' }} />
        Mensaje enviado con éxito
      </div>

      {/* ─── Date + Visit Counter Bar ─── */}
      <div className="top-info-bar">
        <div className="top-info-left">
          <Icon icon="mdi:calendar" width={14} style={{ color: 'var(--accent)' }} />
          <span>{todayDate}</span>
        </div>
        <div className="top-info-right">
          {visitCounts && (
            <>
              <div className="visit-stat">
                <Icon icon="mdi:eye-outline" width={14} />
                <span className="visit-label">Hoy:</span>
                <span className="visit-number">{visitCounts.daily}</span>
              </div>
              <div className="visit-divider" />
              <div className="visit-stat">
                <Icon icon="mdi:account-group-outline" width={14} />
                <span className="visit-label">Total:</span>
                <span className="visit-number">{visitCounts.total}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ─── Navbar ─── */}
      <nav id="navbar" ref={navbarRef}>
        <a href="#hero" onClick={(e) => scrollTo(e, '#hero')} style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1.3rem', letterSpacing: '-0.02em' }}>
          Digi<span style={{ color: 'var(--accent)' }}>Craft</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              className="nav-link"
              style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.85rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', transition: 'color 0.3s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {link.label}
            </a>
          ))}
          <button onClick={openSearch} aria-label="Buscar" style={{ background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer', padding: '0.25rem', display: 'flex' }}>
            <Icon icon="mdi:magnify" width={22} />
          </button>
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Cambiar tema">
            <span className="toggle-thumb">{themeIcon}</span>
          </button>
        </div>

        {/* Mobile Nav */}
        <div className="flex items-center gap-3 md:hidden">
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Cambiar tema">
            <span className="toggle-thumb">{themeIcon}</span>
          </button>
          <button onClick={openSearch} aria-label="Buscar" style={{ background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer', padding: '0.25rem', display: 'flex' }}>
            <Icon icon="mdi:magnify" width={22} />
          </button>
          <button onClick={toggleMenu} aria-label="Menú" style={{ background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer', padding: '0.25rem', display: 'flex' }}>
            <Icon icon={menuOpen ? 'mdi:close' : 'mdi:menu'} width={28} />
          </button>
        </div>
      </nav>

      {/* ─── Search Overlay ─── */}
      <div id="searchOverlay" className={searchOpen ? 'open' : ''}>
        <div style={{ width: '100%', maxWidth: '600px', padding: '6rem 1.5rem 1.5rem', position: 'relative' }}>
          <button onClick={closeSearch} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <Icon icon="mdi:close" width={28} />
          </button>
          <div style={{ position: 'relative' }}>
            <Icon icon="mdi:magnify" width={22} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input ref={searchInputRef} type="text" placeholder="Buscar servicios, portfolio, contacto..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="dc-input" style={{ paddingLeft: '3.25rem' }} />
          </div>
          <div style={{ maxHeight: '55vh', overflowY: 'auto', marginTop: '0.5rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
            {searchResults.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No se encontraron resultados</div>
            ) : (
              searchResults.map((item, idx) => (
                <div
                  key={item.title}
                  className={`search-result-item ${activeResult === idx ? 'active' : ''}`}
                  onClick={() => {
                    closeSearch();
                    if (item.section.startsWith('/')) window.location.href = item.section;
                    else setTimeout(() => document.querySelector(item.section)?.scrollIntoView({ behavior: 'smooth' }), 100);
                  }}
                  onMouseEnter={() => setActiveResult(idx)}
                >
                  <Icon icon={item.icon} width={20} style={{ color: 'var(--accent)' }} />
                  <span style={{ color: 'var(--text-main)', fontFamily: "'Manrope', sans-serif" }}>{item.title}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ─── Mobile Menu Overlay ─── */}
      <div id="menuOverlay" ref={menuOverlayRef}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} className="menu-link" onClick={(e) => { scrollTo(e, link.href); toggleMenu(); }}>
            {link.label}
          </a>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════════ */}
      <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'var(--hero-gradient)' }}>
        {/* Background Video */}
        <video autoPlay muted loop playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.12, filter: 'grayscale(100%)', mixBlendMode: 'screen', zIndex: 0 }}>
          <source src="https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_30fps.mp4" type="video/mp4" />
        </video>

        {/* Content */}
        <div className="section-padding" style={{ position: 'relative', zIndex: 2, maxWidth: '900px', textAlign: 'center', padding: '2rem 1.5rem' }}>
          <p className="label reveal" style={{ color: 'var(--accent)', marginBottom: '1.5rem' }}>
            Estudio Digital Creativo
          </p>
          <h1 className="display-xl reveal reveal-delay-1" style={{ marginBottom: '2rem', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            Creamos / Lo Digital
          </h1>
          <p className="reveal reveal-delay-2" style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '550px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            Transformamos ideas en experiencias digitales excepcionales. Diseño, desarrollo y creatividad para marcas que buscan destacar.
          </p>
          <div className="reveal reveal-delay-3">
            <a href="#contacto" className="btn-primary" onClick={(e) => scrollTo(e, '#contacto')}>
              Empezar Proyecto <Icon icon="mdi:arrow-right" width={18} />
            </a>
          </div>
        </div>

        <div className="scroll-indicator" style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
          <Icon icon="mdi:chevron-down" width={32} style={{ color: 'var(--accent)' }} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SERVICES
      ═══════════════════════════════════════════════════════════ */}
      <section id="servicios" className="section-padding" style={{ padding: '7rem 0', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ marginBottom: '4rem', paddingLeft: 'max(1.5rem, 4vw)', paddingRight: 'max(1.5rem, 4vw)' }}>
          <p className="label reveal" style={{ color: 'var(--accent)', marginBottom: '0.75rem' }}>Lo que hacemos</p>
          <h2 className="heading-lg reveal reveal-delay-1">Nuestros Servicios</h2>
        </div>
        <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem', paddingLeft: 'max(1.5rem, 4vw)', paddingRight: 'max(1.5rem, 4vw)' }}>
          {services.map((service, idx) => (
            <div key={service.title} className={`service-card reveal reveal-delay-${Math.min(idx + 1, 5)}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div className="s-icon" style={{ width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--accent-dim)', borderRadius: '50%' }}>
                  <Icon icon={service.icon} width={28} style={{ color: 'var(--accent)' }} />
                </div>
                <Icon icon="mdi:arrow-top-right" width={22} className="s-arrow" style={{ color: 'var(--accent)' }} />
              </div>
              <h3 className="heading-md" style={{ marginBottom: '0.75rem' }}>{service.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7 }}>{service.desc}</p>
              {service.icon === 'mdi:movie-edit' && (
                <div style={{ marginTop: '1.25rem', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border)' }}>
                  <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                    <iframe
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                      src="https://www.youtube.com/embed/H4Fi76JQ4D8"
                      title="Edición de Video — DigiCraft Studio"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          STATS
      ═══════════════════════════════════════════════════════════ */}
      <section ref={statsRef} style={{ padding: '5rem 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--surface-alt)' }}>
        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', maxWidth: '1100px', margin: '0 auto', textAlign: 'center', padding: '0 max(1.5rem, 4vw)' }}>
          {stats.map((stat) => (
            <div key={stat.value} className="reveal">
              <div className="stat-number" id={`stat-${stat.value}`}>0{stat.suffix}</div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: "'Syne', sans-serif", fontWeight: 500 }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          PORTFOLIO — THE STAR SECTION
      ═══════════════════════════════════════════════════════════ */}
      <section id="portfolio" className="section-padding" style={{ padding: '7rem 0', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ marginBottom: '4rem', paddingLeft: 'max(1.5rem, 4vw)', paddingRight: 'max(1.5rem, 4vw)' }}>
          <p className="label reveal" style={{ color: 'var(--accent)', marginBottom: '0.75rem' }}>Nuestro Trabajo</p>
          <h2 className="heading-lg reveal reveal-delay-1">Portfolio</h2>
        </div>

        <div className="portfolio-grid" style={{ paddingLeft: 'max(1.5rem, 4vw)', paddingRight: 'max(1.5rem, 4vw)' }}>
          {portfolioItems.map((item, idx) => {
            const delayClass = `reveal-delay-${(idx % 5) + 1}`;

            /* ── TikTok embed card ── */
            if ('isTikTokEmbed' in item && item.isTikTokEmbed) {
              return (
                <div key={item.slug} className={`portfolio-card portfolio-card-tiktok reveal ${delayClass}`}>
                  <div className="portfolio-card-body" style={{ padding: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                      <Icon icon="ic:baseline-tiktok" width={22} style={{ color: '#00f2ea' }} />
                      <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-main)' }}>{item.title}</span>
                    </div>
                    <blockquote
                      className="tiktok-embed"
                      cite={item.tikTokCite}
                      data-video-id={item.tikTokVideoId}
                      style={{ maxWidth: '100%', minWidth: '260px' }}
                    >
                      <section />
                    </blockquote>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.75rem', lineHeight: 1.6 }}>{item.description}</p>
                  </div>
                </div>
              );
            }

            /* ── App with live embed (phone frame) ── */
            if ('liveUrl' in item && item.liveUrl && !('isTikTokEmbed' in item)) {
              const isEmbeddable = !item.liveUrl.includes('github.com/') && !item.liveUrl.includes('github.com/repos');
              return (
                <div key={item.slug} className={`portfolio-card app-showcase-card reveal ${delayClass}`}>
                  <div className="portfolio-card-body">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', alignSelf: 'flex-start' }}>
                      <Icon icon={item.icon || 'mdi:cellphone'} width={22} style={{ color: 'var(--accent)' }} />
                      <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-main)' }}>{item.title}</span>
                    </div>
                    <span style={{ alignSelf: 'flex-start', fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent)', background: 'var(--accent-dim)', padding: '0.2rem 0.6rem', borderRadius: '20px' }}>{item.category}</span>
                    {isEmbeddable ? (
                      <div className="phone-frame">
                        <div className="phone-frame-inner">
                          <div className="phone-frame-loading" id={`loader-${item.slug}`}>
                            <div className="spinner" />
                            <span>Cargando app...</span>
                          </div>
                          <iframe
                            src={item.liveUrl}
                            title={item.title}
                            loading="lazy"
                            onLoad={() => {
                              const loader = document.getElementById(`loader-${item.slug}`);
                              if (loader) loader.classList.add('loaded');
                            }}
                            sandbox="allow-scripts allow-same-origin allow-popups"
                          />
                        </div>
                      </div>
                    ) : (
                      <a href={item.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ textDecoration: 'none', marginTop: '0.5rem' }}>
                        {item.liveLabel || 'Ver en Vivo'} <Icon icon="mdi:open-in-new" width={16} />
                      </a>
                    )}
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.6, textAlign: 'center' }}>{item.description}</p>
                    {isEmbeddable && (
                      <a href={item.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-outline btn-sm" style={{ textDecoration: 'none' }}>
                        Abrir completa <Icon icon="mdi:open-in-new" width={14} />
                      </a>
                    )}
                  </div>
                </div>
              );
            }

            /* ── Normal card ── */
            const imgSrc = item.useLocalImage
              ? item.image
              : `https://picsum.photos/seed/${item.imageSeed}/600/450`;

            return (
              <div key={item.slug} className={`portfolio-card reveal ${delayClass}`}>
                {/* Image area */}
                <a href={`/digicraft/portfolio/${item.slug}`} style={{ textDecoration: 'none' }}>
                  <div className="portfolio-card-img">
                    <img src={imgSrc} alt={item.title} loading="lazy" />
                    <div className="portfolio-card-overlay">
                      <span className="cat">{item.category}</span>
                      <span className="title">{item.title}</span>
                    </div>
                  </div>
                </a>
                {/* Body */}
                <div className="portfolio-card-body">
                  <span className="card-cat">{item.category}</span>
                  <span className="card-title">{item.title}</span>
                  <div className="portfolio-card-actions">
                    <a href={`/digicraft/portfolio/${item.slug}`} className="btn-outline btn-sm">Ver Detalle</a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* TikTok embed script */}
        <script async src="https://www.tiktok.com/embed.js" />
      </section>

      {/* ═══════════════════════════════════════════════════════════
          PROCESS
      ═══════════════════════════════════════════════════════════ */}
      <section id="proceso" style={{ padding: '7rem 0', background: 'var(--surface-alt)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 max(1.5rem, 4vw)' }}>
          <div style={{ marginBottom: '4rem' }}>
            <p className="label reveal" style={{ color: 'var(--accent)', marginBottom: '0.75rem' }}>Cómo Trabajamos</p>
            <h2 className="heading-lg reveal reveal-delay-1">Nuestro Proceso</h2>
          </div>
          <div className="process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
            {processSteps.map((step, idx) => (
              <div key={step.num} className={`reveal reveal-delay-${idx + 1}`}>
                <div className="step-number" style={{ marginBottom: '1rem' }}>{step.num}</div>
                <h3 className="heading-md" style={{ marginBottom: '0.75rem', color: 'var(--accent)' }}>{step.title}</h3>
                <div style={{ width: '40px', height: '2px', background: 'var(--accent)', marginBottom: '1rem' }} />
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          PRICING
      ═══════════════════════════════════════════════════════════ */}
      <section id="precios" className="section-padding" style={{ padding: '7rem 0', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem', paddingLeft: 'max(1.5rem, 4vw)', paddingRight: 'max(1.5rem, 4vw)' }}>
          <p className="label reveal" style={{ color: 'var(--accent)', marginBottom: '0.75rem' }}>Inversión</p>
          <h2 className="heading-lg reveal reveal-delay-1">Planes y Precios</h2>
        </div>

        <div className="pricing-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', alignItems: 'start', padding: '0 max(1.5rem, 4vw)' }}>
          {/* Starter */}
          <div className="pricing-card reveal reveal-delay-1">
            <p className="label" style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Starter</p>
            <div style={{ marginBottom: '2rem' }}>
              <span className="stat-number">$49</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}> USD</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
              {['Landing page (1 página)', '1 invitación virtual', 'Edición de 5 fotos', 'Entrega en 5 días', 'Sin revisiones'].map((f) => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  <Icon icon="mdi:check" width={18} style={{ color: 'var(--accent)' }} />{f}
                </div>
              ))}
            </div>
            <a href="#contacto" className="btn-outline" style={{ width: '100%', justifyContent: 'center' }} onClick={(e) => scrollTo(e, '#contacto')}>Elegir Plan</a>
          </div>

          {/* Pro (Featured) */}
          <div className="pricing-card featured reveal reveal-delay-2">
            <div style={{ position: 'absolute', top: '-1px', left: '50%', transform: 'translateX(-50%)', background: 'var(--accent)', color: '#000', padding: '0.35rem 1.25rem', fontFamily: "'Syne', sans-serif", fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Popular</div>
            <p className="label" style={{ color: 'var(--accent)', marginBottom: '1rem' }}>Pro</p>
            <div style={{ marginBottom: '2rem' }}>
              <span className="stat-number">$99</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}> USD</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
              {['Sitio multi-página', '3 invitaciones virtuales', '15 fotos + 1 video', 'Entrega en 7 días', '3 revisiones incluidas', 'SEO básico'].map((f) => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  <Icon icon="mdi:check" width={18} style={{ color: 'var(--accent)' }} />{f}
                </div>
              ))}
            </div>
            <a href="#contacto" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={(e) => scrollTo(e, '#contacto')}>Elegir Plan</a>
          </div>

          {/* Premium */}
          <div className="pricing-card reveal reveal-delay-3">
            <p className="label" style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Premium</p>
            <div style={{ marginBottom: '2rem' }}>
              <span className="stat-number">$199</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}> USD</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
              {['App / web completa', 'Invitaciones ilimitadas', 'Paquete de fotos + video completo', 'Branding completo', 'Soporte por 30 días', 'Revisiones ilimitadas', 'Entrega prioritaria'].map((f) => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  <Icon icon="mdi:check" width={18} style={{ color: 'var(--accent)' }} />{f}
                </div>
              ))}
            </div>
            <a href="#contacto" className="btn-outline" style={{ width: '100%', justifyContent: 'center' }} onClick={(e) => scrollTo(e, '#contacto')}>Elegir Plan</a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════════════════════════ */}
      <section id="testimonios" style={{ padding: '7rem 0', background: 'var(--surface-alt)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 max(1.5rem, 4vw)' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p className="label reveal" style={{ color: 'var(--accent)', marginBottom: '0.75rem' }}>Testimonios</p>
            <h2 className="heading-lg reveal reveal-delay-1">Lo que dicen nuestros clientes</h2>
          </div>
          <div className="testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {testimonials.map((t, idx) => (
              <div key={t.name} className={`testimonial-card reveal reveal-delay-${idx + 1}`}>
                <Icon icon="mdi:format-quote-open" width={32} style={{ color: 'var(--accent)', marginBottom: '1rem', opacity: 0.6 }} />
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem', fontStyle: 'italic' }}>&ldquo;{t.quote}&rdquo;</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'var(--accent-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.8rem', color: 'var(--accent)' }}>{t.avatar}</div>
                  <div>
                    <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: '0.9rem' }}>{t.name}</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{t.service}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CONTACT
      ═══════════════════════════════════════════════════════════ */}
      <section id="contacto" className="section-padding" style={{ padding: '7rem 0', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ marginBottom: '4rem', paddingLeft: 'max(1.5rem, 4vw)', paddingRight: 'max(1.5rem, 4vw)' }}>
          <p className="label reveal" style={{ color: 'var(--accent)', marginBottom: '0.75rem' }}>Hablemos</p>
          <h2 className="heading-lg reveal reveal-delay-1">Contacto</h2>
        </div>

        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4rem', padding: '0 max(1.5rem, 4vw)' }}>
          {/* Info */}
          <div className="reveal">
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              ¿Tienes un proyecto en mente? Nos encantaría escucharte. Escríbenos y conversemos sobre cómo podemos ayudarte a hacer realidad tu idea.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                { icon: 'mdi:email', label: 'Email', value: 'hola@digicraft.studio' },
                { icon: 'mdi:whatsapp', label: 'WhatsApp', value: '+52 1 234 567 8900' },
                { icon: 'mdi:instagram', label: 'Instagram', value: '@digicraft.studio' },
              ].map((contact) => (
                <div key={contact.label} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--accent-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon icon={contact.icon} width={22} style={{ color: 'var(--accent)' }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: '0.85rem' }}>{contact.label}</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{contact.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form className="reveal reveal-delay-2" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {[
              { name: 'nombre', label: 'Nombre', type: 'text' },
              { name: 'email', label: 'Email', type: 'email' },
            ].map((field) => (
              <div key={field.name}>
                <label style={{ display: 'block', fontFamily: "'Syne', sans-serif", fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>{field.label}</label>
                <input type={field.type} name={field.name} required className="dc-input" placeholder={`Tu ${field.label.toLowerCase()}`} />
              </div>
            ))}
            <div>
              <label style={{ display: 'block', fontFamily: "'Syne', sans-serif", fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Servicio</label>
              <select name="servicio" required className="dc-input" style={{ appearance: 'none', cursor: 'pointer' }}>
                <option value="">Seleccionar servicio...</option>
                <option value="web">Desarrollo Web</option>
                <option value="mobile">Apps Móviles</option>
                <option value="invitaciones">Invitaciones Virtuales</option>
                <option value="fotos">Edición de Fotos</option>
                <option value="video">Edición de Video</option>
                <option value="branding">Diseño & Branding</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontFamily: "'Syne', sans-serif", fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Mensaje</label>
              <textarea name="mensaje" required rows={5} className="dc-input" placeholder="Cuéntanos sobre tu proyecto..." />
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Enviar Mensaje <Icon icon="mdi:send" width={18} />
            </button>
          </form>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CTA BANNER
      ═══════════════════════════════════════════════════════════ */}
      <section style={{ padding: '6rem 0', textAlign: 'center', background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="reveal" style={{ padding: '0 max(1.5rem, 4vw)' }}>
          <h2 className="heading-lg" style={{ marginBottom: '1.5rem' }}>
            ¿Listo para <span style={{ color: 'var(--accent)' }}>empezar</span>?
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '500px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
            Tu próximo proyecto digital está a un mensaje de distancia. Hablemos y hagamos magia juntos.
          </p>
          <a href="#contacto" className="btn-primary" onClick={(e) => scrollTo(e, '#contacto')}>
            Empezar Proyecto <Icon icon="mdi:arrow-right" width={18} />
          </a>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════ */}
      <footer style={{ padding: '5rem 0 2rem', borderTop: '1px solid var(--border)', background: 'var(--bg)' }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem', marginBottom: '4rem', maxWidth: '1100px', margin: '0 auto 4rem', padding: '0 max(1.5rem, 4vw)' }}>
          {/* Brand */}
          <div>
            <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1.2rem', marginBottom: '1rem' }}>
              Digi<span style={{ color: 'var(--accent)' }}>Craft</span>
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
              Estudio digital creativo que transforma ideas en experiencias digitales excepcionales. Tu visión, nuestra pasión.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="label" style={{ marginBottom: '1.25rem', color: 'var(--accent)' }}>Navegación</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={(e) => scrollTo(e, link.href)} style={{ color: 'var(--text-muted)', fontSize: '0.9rem', transition: 'color 0.3s' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="label" style={{ marginBottom: '1.25rem', color: 'var(--accent)' }}>Síguenos</p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[
                { icon: 'mdi:instagram', href: '#', label: 'Instagram' },
                { icon: 'mdi:twitter', href: '#', label: 'Twitter' },
                { icon: 'mdi:linkedin', href: '#', label: 'LinkedIn' },
                { icon: 'mdi:whatsapp', href: '#', label: 'WhatsApp' },
              ].map((social) => (
                <a key={social.label} href={social.href} aria-label={social.label} className="footer-social-icon">
                  <Icon icon={social.icon} width={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem', textAlign: 'center', maxWidth: '1100px', margin: '0 auto', padding: '2rem max(1.5rem, 4vw) 0' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>© 2025 DigiCraft Studio. Hecho con ❤ y código</p>
        </div>
      </footer>

      {/* ─── WhatsApp Floating Button ─── */}
      <a id="whatsappBtn" ref={whatsappBtnRef} href="https://wa.me/5212345678900" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        <Icon icon="mdi:whatsapp" width={28} style={{ color: '#fff' }} />
      </a>
    </>
  );
}
