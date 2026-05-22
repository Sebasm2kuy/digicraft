'use client';

import { useEffect, useRef, useState, useCallback, FormEvent } from 'react';
import { Icon } from '@iconify/react';

/* ─── Search Data ─── */
const searchData = [
  { title: 'Desarrollo Web', section: '#servicios', icon: 'mdi:web' },
  { title: 'Aplicaciones Móviles', section: '#servicios', icon: 'mdi:cellphone' },
  { title: 'Invitaciones Virtuales', section: '#servicios', icon: 'mdi:card-account-mail' },
  { title: 'Edición de Fotos', section: '#servicios', icon: 'mdi:image-edit' },
  { title: 'Edición de Video', section: '#servicios', icon: 'mdi:movie-edit' },
  { title: 'Diseño & Branding', section: '#servicios', icon: 'mdi:palette-swatch' },
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
  { title: 'Testimonios', section: '#testimonios', icon: 'mdi:format-quote-close' },
];

/* ─── Portfolio Data ─── */
const portfolioItems = [
  {
    slug: 'tarjetas-virtuales',
    title: 'Tarjetas Virtuales Premium',
    category: 'Invitación Virtual',
    isVideo: true,
    height: 'row-span-2',
    aspect: 'aspect-[9/16]',
    imageSeed: 'digicraft-tarjetas',
  },
  {
    slug: 'ecommerce',
    title: 'E-Commerce Premium',
    category: 'Desarrollo Web',
    isVideo: false,
    height: '',
    aspect: 'aspect-[4/3]',
    imageSeed: 'digicraft-ecommerce',
  },
  {
    slug: 'fitness-app',
    title: 'Fitness Tracker Pro',
    category: 'App Móvil',
    isVideo: false,
    height: '',
    aspect: 'aspect-[4/3]',
    imageSeed: 'digicraft-fitness',
  },
  {
    slug: 'boda-romantica',
    title: 'Boda Romántica',
    category: 'Invitación Virtual',
    isVideo: false,
    height: '',
    aspect: 'aspect-[4/3]',
    imageSeed: 'digicraft-boda',
  },
  {
    slug: 'spot-publicitario',
    title: 'Spot Publicitario',
    category: 'Producción Audiovisual',
    isVideo: false,
    height: '',
    aspect: 'aspect-[4/3]',
    imageSeed: 'digicraft-spot',
  },
  {
    slug: 'cafe-artesanal',
    title: 'Café Artesanal',
    category: 'Branding',
    isVideo: false,
    height: '',
    aspect: 'aspect-[4/3]',
    imageSeed: 'digicraft-cafe',
  },
  {
    slug: 'fashion-editorial',
    title: 'Fashion Editorial',
    category: 'Edición de Fotos',
    isVideo: false,
    height: '',
    aspect: 'aspect-[4/3]',
    imageSeed: 'digicraft-fashion',
  },
  {
    slug: 'invitacion-15-anos',
    title: 'Invitación 15 Años',
    category: 'Invitación Virtual',
    isVideo: true,
    height: '',
    aspect: 'aspect-[9/16]',
    imageSeed: 'digicraft-quince',
    tiktokUrl: 'https://www.tiktok.com/@laultimaesfera/video/7641569299802508562',
  },
];

/* ─── Stats Data ─── */
const stats = [
  { value: 150, suffix: '+', label: 'Proyectos Completados' },
  { value: 120, suffix: '+', label: 'Clientes Felices' },
  { value: 5, suffix: '', label: 'Años de Experiencia' },
  { value: 12, suffix: '', label: 'Países Alcanzados' },
];

/* ─── Normalize for search ─── */
function normalize(str: string) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

export default function Home() {
  /* ─── Refs ─── */
  const navbarRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const toastRef = useRef<HTMLDivElement>(null);
  const whatsappBtnRef = useRef<HTMLAnchorElement>(null);
  const searchOverlayRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const statsAnimated = useRef(false);

  /* ─── Demo Logistics Data (Centro Logístico Frimaral V2) ─── */
  const demoContainers = [
    { id: 'MSCU-7843291', cliente: 'DigiCraft Corp', producto: 'Medallones Vacuno Premium', lote: 'L-2025-0891', dua: 'UY-45210', pallets: 18, kilos: 8420, cajas: 360, temp: '-18.2°C', estado: 'Almacén', esCarne: true },
    { id: 'TCLU-5519823', cliente: 'Studio Max', producto: 'Queso Gouda Export', lote: 'L-2025-0734', dua: 'BR-38921', pallets: 12, kilos: 5180, cajas: 240, temp: '4.1°C', estado: 'En Tránsito', esCarne: false },
    { id: 'HLXU-3391027', cliente: 'Pixel Labs', producto: 'Filet de Pollo Congelado', lote: 'L-2025-0912', dua: 'AR-50182', pallets: 22, kilos: 11200, cajas: 440, temp: '-20.0°C', estado: 'Almacén', esCarne: true },
    { id: 'MAEU-6674215', cliente: 'Nexa Digital', producto: 'Mantequilla Láctea', lote: 'L-2025-0655', dua: 'EU-29384', pallets: 8, kilos: 3650, cajas: 160, temp: '2.8°C', estado: 'Despachado', esCarne: false },
    { id: 'CSLU-9910583', cliente: 'Código Fuente S.A.', producto: 'Chorizo Artesanal', lote: 'L-2025-0877', dua: 'PY-61423', pallets: 15, kilos: 7200, cajas: 300, temp: '-15.5°C', estado: 'Almacén', esCarne: true },
    { id: 'BMOU-4452167', cliente: 'AppForge Inc', producto: 'Salmón Ahumado', lote: 'L-2025-0903', dua: 'CL-72819', pallets: 20, kilos: 9800, cajas: 400, temp: '3.6°C', estado: 'En Tránsito', esCarne: false },
    { id: 'OOLU-2289156', cliente: 'DigiCraft Corp', producto: 'Lomo Vetado', lote: 'L-2025-0940', dua: 'UY-45298', pallets: 14, kilos: 6300, cajas: 280, temp: '-19.8°C', estado: 'Almacén', esCarne: true },
    { id: 'TCNU-7734089', cliente: 'Studio Max', producto: 'Helado Artesanal', lote: 'L-2025-0955', dua: 'BR-39402', pallets: 10, kilos: 4200, cajas: 200, temp: '-22.1°C', estado: 'Almacén', esCarne: false },
  ];

  const demoOrders = [
    { id: 'PED-0187', cliente: 'Pixel Labs', estado: 'PENDIENTE' as const, items: 3, pallets: 8, kilos: 4200, fecha: '2025-05-19', chofer: '—', patente: '—' },
    { id: 'PED-0186', cliente: 'DigiCraft Corp', estado: 'CONFIRMADO' as const, items: 2, pallets: 12, kilos: 6100, fecha: '2025-05-19', chofer: 'Carlos Méndez', patente: 'ABC-1234' },
    { id: 'PED-0185', cliente: 'Nexa Digital', estado: 'DESPACHADO' as const, items: 1, pallets: 5, kilos: 2100, fecha: '2025-05-18', chofer: 'Roberto Gómez', patente: 'XYZ-5678' },
    { id: 'PED-0184', cliente: 'AppForge Inc', estado: 'DESPACHADO' as const, items: 4, pallets: 18, kilos: 8900, fecha: '2025-05-18', chofer: 'Marcelo Ruiz', patente: 'DEF-9012' },
    { id: 'PED-0183', cliente: 'Código Fuente S.A.', estado: 'CANCELADO' as const, items: 1, pallets: 3, kilos: 1200, fecha: '2025-05-17', chofer: '—', patente: '—' },
  ];

  const demoTemperatures = [
    { sensor: 'CAM-01', nombre: 'Cámara Fría 1', ubicacion: 'Depósito A', temp: -18.2, min: -20.1, max: -17.3, status: 'OK' },
    { sensor: 'CAM-02', nombre: 'Cámara Fría 2', ubicacion: 'Depósito A', temp: -20.5, min: -22.0, max: -19.1, status: 'OK' },
    { sensor: 'CAM-03', nombre: 'Cámara Fría 3', ubicacion: 'Depósito B', temp: -15.8, min: -17.4, max: -14.2, status: 'ALERTA' },
    { sensor: 'REF-01', nombre: 'Refrigerado 1', ubicacion: 'Depósito B', temp: 3.6, min: 1.8, max: 5.2, status: 'OK' },
    { sensor: 'REF-02', nombre: 'Refrigerado 2', ubicacion: 'Depósito C', temp: 2.1, min: 0.5, max: 4.0, status: 'OK' },
    { sensor: 'CONG-01', nombre: 'Congelador Ind.', ubicacion: 'Depósito C', temp: -24.3, min: -26.0, max: -22.1, status: 'OK' },
  ];

  const demoActivities = [
    { time: '08:15', tipo: 'INGRESO', guia: 'DC-2025-00142', placa: 'ABC-123', detalle: 'Recepción MSCU-7843291 — DigiCraft Corp', operador: 'Admin' },
    { time: '09:30', tipo: 'DESPACHO', guia: 'DC-2025-00141', placa: 'XYZ-789', detalle: 'Despacho PED-0185 a Pixel Labs — 5 pallets', operador: 'Op. López' },
    { time: '10:45', tipo: 'INGRESO', guia: 'DC-2025-00143', placa: 'DEF-456', detalle: 'Recepción TCLU-5519823 — Studio Max', operador: 'Admin' },
    { time: '11:20', tipo: 'REVISIÓN', guia: 'DC-2025-00140', placa: 'GHI-012', detalle: 'Inspección MGAP — Lote L-2025-0891', operador: 'Op. Martínez' },
    { time: '12:00', tipo: 'DESPACHO', guia: 'DC-2025-00139', placa: 'JKL-345', detalle: 'Entrega PED-0184 AppForge — Remito #R-0184', operador: 'Admin' },
    { time: '13:30', tipo: 'INGRESO', guia: 'DC-2025-00144', placa: 'MNO-678', detalle: 'Ingreso OOLU-2289156 Lomo Vetado', operador: 'Op. López' },
    { time: '14:15', tipo: 'TEMP', guia: '—', placa: '—', detalle: 'Alerta CAM-03: -15.8°C (umbral: -18°C)', operador: 'Sistema' },
  ];

  const [demoTab, setDemoTab] = useState<'dashboard' | 'inventory' | 'orders' | 'temperature' | 'activity'>('dashboard');
  const [orderFilter, setOrderFilter] = useState('Todos');

  /* ─── State ─── */
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeResult, setActiveResult] = useState(-1);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [visitCounts, setVisitCounts] = useState<{ total: number; daily: number } | null>(null);
  const [todayDate, setTodayDate] = useState('');

  /* ─── Today's Date ─── */
  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const formatted = now.toLocaleDateString('es-ES', options);
    setTodayDate(formatted.charAt(0).toUpperCase() + formatted.slice(1));
  }, []);

  /* ─── Visit Counter (localStorage - static site) ─── */
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const stored = localStorage.getItem('digicraft-visits');
    let visits = { total: 0, daily: 0, lastDate: '' };
    if (stored) {
      try { visits = JSON.parse(stored); } catch { /* ignore */ }
    }
    // Reset daily if new day
    if (visits.lastDate !== today) {
      visits.daily = 0;
    }
    // Increment
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
    if (initial === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    }
    requestAnimationFrame(() => setTheme(initial));
  }, []);

  /* ─── Load TikTok Embed Script ─── */
  useEffect(() => {
    if (document.getElementById('tiktok-embed-script')) return;
    const script = document.createElement('script');
    script.id = 'tiktok-embed-script';
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.add('theme-transition');
    if (next === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('digicraft-theme', next);
    setTheme(next);
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 500);
  }, [theme]);

  const searchResults = (() => {
    if (searchQuery.trim() === '') return searchData;
    const q = normalize(searchQuery);
    return searchData.filter((item) => normalize(item.title).includes(q));
  })();

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
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ─── Navbar scroll effect ─── */
  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        if (window.scrollY > 80) {
          navbarRef.current.classList.add('scrolled');
        } else {
          navbarRef.current.classList.remove('scrolled');
        }
      }
      // WhatsApp button
      if (whatsappBtnRef.current) {
        if (window.scrollY > 500) {
          whatsappBtnRef.current.classList.add('visible');
        } else {
          whatsappBtnRef.current.classList.remove('visible');
        }
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
              let start = 0;
              const end = stat.value;
              const duration = 2000;
              const startTime = performance.now();
              function easeOutCubic(t: number) {
                return 1 - Math.pow(1 - t, 3);
              }
              function update(currentTime: number) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const current = Math.floor(easeOutCubic(progress) * end);
                el.textContent = current + stat.suffix;
                if (progress < 1) {
                  requestAnimationFrame(update);
                }
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
    if (target.startsWith('/digicraft')) {
      window.location.href = target;
      return;
    }
    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    // Close menu if open
    setMenuOpen(false);
    if (menuOverlayRef.current) menuOverlayRef.current.classList.remove('open');
    document.body.style.overflow = '';
  }, []);

  /* ─── Mobile Menu Toggle ─── */
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

  /* ─── Search ─── */
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K to open
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openSearch();
      }
      // ESC to close
      if (e.key === 'Escape' && searchOpen) {
        closeSearch();
      }
      // Arrow keys & Enter when search is open
      if (searchOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setActiveResult((prev) =>
            prev < searchResults.length - 1 ? prev + 1 : prev
          );
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setActiveResult((prev) => (prev > 0 ? prev - 1 : prev));
        }
        if (e.key === 'Enter' && activeResult >= 0) {
          e.preventDefault();
          const item = searchResults[activeResult];
          if (item) {
            if (item.section.startsWith('/digicraft')) {
              window.location.href = item.section;
            } else {
              closeSearch();
              const el = document.querySelector(item.section);
              el?.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen, searchResults, activeResult, openSearch, closeSearch]);

  /* ─── Contact Form ─── */
  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      showToast();
      const form = e.target as HTMLFormElement;
      form.reset();
    },
    [showToast]
  );

  return (
    <>
      {/* ─── Noise Texture ─── */}
      <div className="noise" aria-hidden="true">
        <svg>
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* ─── Toast ─── */}
      <div id="toast" ref={toastRef}>
        ✓ Mensaje enviado con éxito!
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
        <a href="#hero" onClick={(e) => scrollTo(e, '#hero')} className="flex items-center gap-1 z-10" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1.3rem', letterSpacing: '-0.02em' }}>
          Digi<span style={{ color: 'var(--accent)' }}>Craft</span>
        </a>

        <div className="hidden md:flex items-center gap-8 z-10">
          {[
            { label: 'Servicios', href: '#servicios' },
            { label: 'Portfolio', href: '#portfolio' },
            { label: 'Proceso', href: '#proceso' },
            { label: 'Precios', href: '#precios' },
            { label: 'Contacto', href: '#contacto' },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.85rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', transition: 'color 0.3s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={openSearch}
            aria-label="Buscar"
            style={{ background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer', padding: '0.25rem', display: 'flex' }}
          >
            <Icon icon="mdi:magnify" width={22} />
          </button>
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            <span className="toggle-thumb">
              {theme === 'dark' ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="#F8F7F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              )}
            </span>
          </button>
        </div>

        <div className="flex items-center gap-3 z-10 md:hidden">
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            <span className="toggle-thumb">
              {theme === 'dark' ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="#F8F7F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              )}
            </span>
          </button>
          <button
            onClick={openSearch}
            aria-label="Buscar"
            style={{ background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer', padding: '0.25rem', display: 'flex' }}
          >
            <Icon icon="mdi:magnify" width={22} />
          </button>
          <button
            onClick={toggleMenu}
            aria-label="Menú"
            style={{ background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer', padding: '0.25rem', display: 'flex' }}
          >
            <Icon icon={menuOpen ? 'mdi:close' : 'mdi:menu'} width={28} />
          </button>
        </div>
      </nav>

      {/* ─── Search Overlay ─── */}
      <div id="searchOverlay" ref={searchOverlayRef} className={searchOpen ? 'open' : ''}>
        <div style={{ width: '100%', maxWidth: '600px', padding: '6rem 1.5rem 1.5rem', position: 'relative' }}>
          <button
            onClick={closeSearch}
            style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.5rem' }}
          >
            <Icon icon="mdi:close" width={28} />
          </button>
          <div style={{ position: 'relative' }}>
            <Icon icon="mdi:magnify" width={22} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Buscar servicios, portfolio, contacto..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem 1rem 1rem 3.25rem',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '4px',
                color: 'var(--text-main)',
                fontFamily: "'Manrope', sans-serif",
                fontSize: '1rem',
                outline: 'none',
              }}
            />
          </div>
          <div style={{ maxHeight: '55vh', overflowY: 'auto', marginTop: '0.5rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px' }}>
            {searchResults.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                No se encontraron resultados
              </div>
            ) : (
              searchResults.map((item, idx) => (
                <div
                  key={item.title}
                  className={`search-result-item ${activeResult === idx ? 'active' : ''}`}
                  onClick={() => {
                    closeSearch();
                    if (item.section.startsWith('/')) {
                      window.location.href = item.section;
                    } else {
                      setTimeout(() => {
                        document.querySelector(item.section)?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }
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
        {[
          { label: 'Servicios', href: '#servicios' },
          { label: 'Portfolio', href: '#portfolio' },
          { label: 'Proceso', href: '#proceso' },
          { label: 'Precios', href: '#precios' },
          { label: 'Contacto', href: '#contacto' },
        ].map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="menu-link"
            onClick={(e) => {
              scrollTo(e, link.href);
              toggleMenu();
            }}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* ════════════════════════════════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════════════════════════════════ */}
      <section
        id="hero"
        style={{
          position: 'relative',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.15,
            filter: 'grayscale(100%)',
            mixBlendMode: 'screen',
            zIndex: 0,
          }}
        >
          <source
            src="https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_30fps.mp4"
            type="video/mp4"
          />
        </video>

        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'var(--hero-gradient)',
            zIndex: 1,
          }}
        />

        {/* Content */}
        <div
          className="section-padding"
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '900px',
            textAlign: 'center',
          }}
        >
          <p className="label reveal" style={{ color: 'var(--accent)', marginBottom: '1.5rem' }}>
            Estudio Digital Creativo
          </p>
          <h1 className="display-xl filled reveal reveal-delay-1" style={{ marginBottom: '2rem' }}>
            Creamos / Lo Digital
          </h1>
          <p
            className="reveal reveal-delay-2"
            style={{
              color: 'var(--text-muted)',
              fontSize: '1.1rem',
              maxWidth: '550px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.7,
            }}
          >
            Transformamos ideas en experiencias digitales excepcionales.
            Diseño, desarrollo y creatividad para marcas que buscan destacar.
          </p>
          <div className="reveal reveal-delay-3">
            <a href="#contacto" className="btn-primary" onClick={(e) => scrollTo(e, '#contacto')}>
              Empezar Proyecto
              <Icon icon="mdi:arrow-right" width={18} />
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className="scroll-indicator"
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
          }}
        >
          <Icon icon="mdi:chevron-down" width={32} style={{ color: 'var(--accent)' }} />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          MARQUEE STRIP
      ════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          overflow: 'hidden',
          padding: '1.25rem 0',
          background: 'var(--surface-alt)',
        }}
        aria-hidden="true"
      >
        <div className="marquee-track" style={{ whiteSpace: 'nowrap' }}>
          {[0, 1].map((set) => (
            <span
              key={set}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2rem',
                paddingRight: '2rem',
                fontFamily: "'Syne', sans-serif",
                fontSize: '0.85rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--text-muted)',
              }}
            >
              {[
                'Desarrollo Web',
                'Aplicaciones Móviles',
                'Invitaciones Virtuales',
                'Edición de Fotos',
                'Edición de Videos',
                'Diseño Gráfico',
                'Branding',
              ].map((text, i) => (
                <span key={`${set}-${i}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '2rem' }}>
                  <span>{text}</span>
                  <span style={{ color: 'var(--accent)', fontSize: '0.6rem' }}>✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          SERVICES SECTION
      ════════════════════════════════════════════════════════════════ */}
      <section id="servicios" className="section-padding" style={{ padding: '7rem 4rem', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ marginBottom: '4rem' }}>
          <p className="label reveal" style={{ color: 'var(--accent)', marginBottom: '0.75rem' }}>
            Lo que hacemos
          </p>
          <h2 className="heading-lg reveal reveal-delay-1">Nuestros Servicios</h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {[
            { icon: 'mdi:web', title: 'Desarrollo Web', desc: 'Sitios web modernos, responsivos y optimizados para SEO. Desde landing pages hasta plataformas completas con la última tecnología.' },
            { icon: 'mdi:cellphone', title: 'Apps Móviles', desc: 'Aplicaciones nativas e híbridas para iOS y Android. Interfaces intuitivas con rendimiento excepcional.' },
            { icon: 'mdi:card-account-mail', title: 'Invitaciones Virtuales', desc: 'Diseños digitales elegantes e interactivos para todo tipo de eventos. Bodas, cumpleaños, quinceañeras y más.' },
            { icon: 'mdi:image-edit', title: 'Edición de Fotos', desc: 'Retoque profesional, manipulación creativa y composición digital. Resultados de alta calidad para cualquier propósito.' },
            { icon: 'mdi:movie-edit', title: 'Edición de Video', desc: 'Producción audiovisual profesional, motion graphics y color grading cinematográfico para redes sociales y más.' },
            { icon: 'mdi:palette-swatch', title: 'Diseño & Branding', desc: 'Identidad visual completa, logos, papelería y guías de marca. Creamos marcas que conectan con su audiencia.' },
          ].map((service, idx) => (
            <div key={service.title} className={`service-card reveal reveal-delay-${Math.min(idx + 1, 5)}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div className="s-icon" style={{ width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--accent-dim)', borderRadius: '50%' }}>
                  <Icon icon={service.icon} width={28} style={{ color: 'var(--accent)' }} />
                </div>
                <Icon icon="mdi:arrow-top-right" width={22} className="s-arrow" style={{ color: 'var(--accent)' }} />
              </div>
              <h3 className="heading-md" style={{ marginBottom: '0.75rem' }}>{service.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7 }}>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          STATS SECTION
      ════════════════════════════════════════════════════════════════ */}
      <section
        ref={statsRef}
        className="section-padding"
        style={{
          padding: '5rem 4rem',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          background: 'var(--surface-alt)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            maxWidth: '1100px',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          {stats.map((stat) => (
            <div key={stat.value} className="reveal">
              <div className="stat-number" id={`stat-${stat.value}`}>
                0{stat.suffix}
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: "'Syne', sans-serif", fontWeight: 500 }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          PORTFOLIO SECTION
      ════════════════════════════════════════════════════════════════ */}
      <section id="portfolio" className="section-padding" style={{ padding: '7rem 4rem', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ marginBottom: '4rem' }}>
          <p className="label reveal" style={{ color: 'var(--accent)', marginBottom: '0.75rem' }}>
            Nuestro Trabajo
          </p>
          <h2 className="heading-lg reveal reveal-delay-1">Portfolio</h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridAutoRows: '280px',
            gap: '1rem',
          }}
        >
          {portfolioItems.map((item, idx) => (
            <a
              key={item.slug}
              href={`/digicraft/portfolio/${item.slug}`}
              className={`portfolio-item reveal ${item.isVideo ? '' : ''}`}
              style={{
                aspectRatio: item.isVideo ? '9/16' : undefined,
                gridRow: item.isVideo ? 'span 2' : undefined,
              }}
            >
              <img
                src={`https://picsum.photos/seed/${item.imageSeed}/600/450`}
                alt={item.title}
                loading="lazy"
              />
              {item.isVideo && (
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(212,175,55,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                  <Icon icon="mdi:play" width={28} style={{ color: '#000' }} />
                </div>
              )}
              <div className="overlay">
                <span style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent)', marginBottom: '0.25rem' }}>
                  {item.category}
                </span>
                <span style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.15rem', fontWeight: 600 }}>
                  {item.title}
                </span>
              </div>
            </a>
          ))}
          {/* TikTok — Invitación 15 Años (dentro del grid) */}
          <div
            className="reveal"
            style={{
              gridColumn: 'span 1',
              gridRow: 'span 2',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid var(--border)',
              background: 'var(--surface-alt)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 0.75rem', borderBottom: '1px solid var(--border)' }}>
              <Icon icon="ic:baseline-tiktok" width={16} style={{ color: '#00f2ea' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)', fontFamily: "'Syne', sans-serif" }}>Invitación Virtual — 15 Años</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flex: 1, background: '#000', padding: '0', overflow: 'hidden' }}>
              <blockquote
                className="tiktok-embed"
                cite="https://www.tiktok.com/@laultimaesfera/video/7641569299802508562"
                data-video-id="7641569299802508562"
                style={{ maxWidth: '100%', minWidth: '0' }}
              >
                <section> </section>
              </blockquote>
            </div>
          </div>
        </div>

        {/* Demo Interactive Subsection - Logistics Dashboard */}
        <div className="reveal" style={{ marginTop: '5rem' }}>
          <div
            style={{
              border: '1px solid var(--border)',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <div className="demo-topbar">
              <div className="demo-dot" style={{ background: '#ff5f57' }} />
              <div className="demo-dot" style={{ background: '#febc2e' }} />
              <div className="demo-dot" style={{ background: '#28c840' }} />
              <div className="demo-url">logistica.digicraft.studio</div>
            </div>
            {/* Demo Sidebar + Content */}
            <div style={{ display: 'flex', minHeight: '520px', background: 'var(--surface)' }}>
              {/* Mini Sidebar */}
              <div style={{ width: '200px', background: 'var(--surface-alt)', borderRight: '1px solid var(--border)', padding: '1rem 0', flexShrink: 0 }}>
                <div style={{ padding: '0 1rem 1rem', borderBottom: '1px solid var(--border)', marginBottom: '0.75rem' }}>
                  <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.85rem', color: 'var(--accent)' }}>DigiCraft</p>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Centro Logístico</p>
                </div>
                {[
                  { key: 'dashboard' as const, icon: 'mdi:view-dashboard', label: 'Panel Principal' },
                  { key: 'inventory' as const, icon: 'mdi:package-variant-closed', label: 'Inventario' },
                  { key: 'orders' as const, icon: 'mdi:clipboard-text', label: 'Pedidos' },
                  { key: 'temperature' as const, icon: 'mdi:thermometer', label: 'Temperaturas' },
                  { key: 'activity' as const, icon: 'mdi:truck-delivery', label: 'Actividad' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setDemoTab(tab.key)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.6rem', width: '100%',
                      padding: '0.6rem 1rem', border: 'none', background: demoTab === tab.key ? 'rgba(212,175,55,0.1)' : 'transparent',
                      color: demoTab === tab.key ? 'var(--accent)' : 'var(--text-muted)', cursor: 'pointer',
                      fontSize: '0.8rem', fontFamily: "'Manrope', sans-serif", fontWeight: 500,
                      transition: 'all 0.2s', textAlign: 'left',
                    }}
                  >
                    <Icon icon={tab.icon} width={16} />
                    {tab.label}
                  </button>
                ))}
                <div style={{ padding: '1rem', marginTop: '1rem', borderTop: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--accent-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon icon="mdi:account" width={14} style={{ color: 'var(--accent)' }} />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-main)' }}>Admin</p>
                      <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>Operador</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Main Content */}
              <div style={{ flex: 1, padding: '1.25rem', overflow: 'auto' }}>
                {demoTab === 'dashboard' && (() => {
                  const uniqueClients = [...new Set(demoContainers.map(c => c.cliente))].length;
                  const totalKilos = demoContainers.reduce((s, c) => s + c.kilos, 0);
                  return (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <div>
                        <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>Panel Principal</h3>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Resumen del centro logístico — Frimaral V2</p>
                      </div>
                      <span style={{ fontSize: '0.7rem', padding: '0.3rem 0.6rem', background: 'rgba(212,175,55,0.1)', color: 'var(--accent)', borderRadius: '4px', fontFamily: "'Syne', sans-serif", fontWeight: 600 }}>LIVE</span>
                    </div>
                    {/* KPI Cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.25rem' }}>
                      {[
                        { label: 'Contenedores', value: demoContainers.length, icon: 'mdi:ferry', color: '#D4AF37' },
                        { label: 'Pallets', value: demoContainers.reduce((s, c) => s + c.pallets, 0), icon: 'mdi:palette', color: '#4CAF50' },
                        { label: 'Toneladas', value: (totalKilos / 1000).toFixed(1) + 'T', icon: 'mdi:weight', color: '#2196F3' },
                        { label: 'Clientes Activos', value: uniqueClients, icon: 'mdi:account-group', color: '#FF9800' },
                        { label: 'Cajas', value: demoContainers.reduce((s, c) => s + c.cajas, 0), icon: 'mdi:box', color: '#9C27B0' },
                        { label: 'Pedidos Hoy', value: demoOrders.length, icon: 'mdi:clipboard-text', color: '#E91E63' },
                      ].map((kpi) => (
                        <div key={kpi.label} style={{ padding: '0.75rem', background: 'var(--surface-alt)', borderRadius: '6px', border: '1px solid var(--border)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                            <Icon icon={kpi.icon} width={14} style={{ color: kpi.color }} />
                            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{kpi.label}</span>
                          </div>
                          <p style={{ fontSize: '1.3rem', fontWeight: 800, fontFamily: "'Syne', sans-serif", color: 'var(--text-main)' }}>{kpi.value}</p>
                        </div>
                      ))}
                    </div>
                    {/* Status bar */}
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                      {['Almacén', 'En Tránsito', 'Despachado'].map((estado) => {
                        const count = demoContainers.filter(c => c.estado === estado).length;
                        const colors: Record<string, string> = { 'Almacén': '#4CAF50', 'En Tránsito': '#FF9800', 'Despachado': '#2196F3' };
                        return (
                          <div key={estado} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 0.75rem', background: 'var(--surface-alt)', borderRadius: '4px', border: '1px solid var(--border)' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: colors[estado] }} />
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{estado}</span>
                            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', marginLeft: 'auto' }}>{count}</span>
                          </div>
                        );
                      })}
                    </div>
                    {/* Temperature monitoring */}
                    <div style={{ padding: '0.75rem', background: 'var(--surface-alt)', borderRadius: '6px', border: '1px solid var(--border)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.6rem' }}>
                        <Icon icon="mdi:thermometer" width={14} style={{ color: '#f44336' }} />
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Monitoreo de Temperatura</span>
                        <span style={{ marginLeft: 'auto', fontSize: '0.6rem', padding: '0.15rem 0.35rem', borderRadius: '3px', background: demoTemperatures.some(t => t.status === 'ALERTA') ? 'rgba(244,67,54,0.15)' : 'rgba(76,175,80,0.15)', color: demoTemperatures.some(t => t.status === 'ALERTA') ? '#f44336' : '#4CAF50', fontWeight: 600 }}>{demoTemperatures.some(t => t.status === 'ALERTA') ? '⚠ ALERTA' : '✓ OK'}</span>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                        {demoTemperatures.slice(0, 3).map((t) => {
                          const tempColor = t.temp < -15 ? '#2196F3' : t.temp < 5 ? '#4CAF50' : '#f44336';
                          return (
                            <div key={t.sensor} style={{ textAlign: 'center', padding: '0.4rem', background: 'var(--surface)', borderRadius: '4px' }}>
                              <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginBottom: '0.15rem' }}>{t.nombre}</p>
                              <p style={{ fontSize: '0.85rem', fontWeight: 700, color: tempColor, fontFamily: "'Syne', sans-serif" }}>{t.temp}°C</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  );
                })()}
                {demoTab === 'inventory' && (
                  <div>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>Inventario</h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{demoContainers.length} contenedores registrados</p>
                    <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid var(--border)' }}>
                          {['Contenedor', 'Cliente', 'Producto', 'Lote', 'DUA', 'Pallets', 'Kilos', 'Temp', 'Estado'].map((h) => (
                            <th key={h} style={{ padding: '0.5rem 0.4rem', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.55rem', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {demoContainers.map((c) => {
                          const estadoColors: Record<string, string> = { 'Almacén': '#4CAF50', 'En Tránsito': '#FF9800', 'Despachado': '#2196F3' };
                          return (
                            <tr key={c.id} style={{ borderBottom: '1px solid var(--border)' }}>
                              <td style={{ padding: '0.5rem 0.4rem', fontFamily: "'Syne', sans-serif", fontWeight: 600, color: 'var(--text-main)', fontSize: '0.65rem', whiteSpace: 'nowrap' }}>{c.id}</td>
                              <td style={{ padding: '0.5rem 0.4rem', color: 'var(--text-main)', whiteSpace: 'nowrap' }}>{c.cliente}</td>
                              <td style={{ padding: '0.5rem 0.4rem', color: 'var(--text-muted)' }}>{c.producto}</td>
                              <td style={{ padding: '0.5rem 0.4rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{c.lote}</td>
                              <td style={{ padding: '0.5rem 0.4rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{c.dua}</td>
                              <td style={{ padding: '0.5rem 0.4rem', color: 'var(--text-muted)', textAlign: 'center' }}>{c.pallets}</td>
                              <td style={{ padding: '0.5rem 0.4rem', color: 'var(--text-muted)', textAlign: 'center' }}>{c.kilos.toLocaleString()}</td>
                              <td style={{ padding: '0.5rem 0.4rem', color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>{c.temp}</td>
                              <td style={{ padding: '0.5rem 0.4rem', whiteSpace: 'nowrap' }}>
                                <span style={{ padding: '0.15rem 0.4rem', borderRadius: '3px', fontSize: '0.55rem', fontWeight: 600, color: estadoColors[c.estado], background: estadoColors[c.estado] + '15' }}>{c.estado}</span>
                                {c.esCarne && <span style={{ marginLeft: '0.25rem', padding: '0.1rem 0.3rem', borderRadius: '3px', fontSize: '0.55rem', background: 'rgba(244,67,54,0.1)', color: '#f44336' }}>🥩 Carne</span>}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    </div>
                  </div>
                )}
                {demoTab === 'orders' && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <div>
                        <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>Pedidos</h3>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{demoOrders.length} pedidos registrados</p>
                      </div>
                    </div>
                    {/* Filter Pills */}
                    <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                      {['Todos', 'PENDIENTE', 'CONFIRMADO', 'DESPACHADO', 'CANCELADO'].map((filter) => (
                        <button
                          key={filter}
                          onClick={() => setOrderFilter(filter)}
                          style={{
                            padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 600,
                            border: '1px solid', cursor: 'pointer', fontFamily: "'Manrope', sans-serif",
                            borderColor: orderFilter === filter ? 'var(--accent)' : 'var(--border)',
                            background: orderFilter === filter ? 'rgba(212,175,55,0.1)' : 'transparent',
                            color: orderFilter === filter ? 'var(--accent)' : 'var(--text-muted)',
                            transition: 'all 0.2s',
                          }}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                    {/* Orders Table */}
                    <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid var(--border)' }}>
                          {['Pedido', 'Cliente', 'Items', 'Pallets', 'Kilos', 'Fecha', 'Chofer', 'Estado'].map((h) => (
                            <th key={h} style={{ padding: '0.5rem 0.4rem', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.55rem', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {demoOrders.filter(o => orderFilter === 'Todos' || o.estado === orderFilter).map((o) => {
                          const estadoColors: Record<string, string> = { 'PENDIENTE': '#FF9800', 'CONFIRMADO': '#2196F3', 'DESPACHADO': '#4CAF50', 'CANCELADO': '#f44336' };
                          return (
                            <tr key={o.id} style={{ borderBottom: '1px solid var(--border)' }}>
                              <td style={{ padding: '0.5rem 0.4rem', fontFamily: "'Syne', sans-serif", fontWeight: 600, color: 'var(--text-main)', fontSize: '0.7rem', whiteSpace: 'nowrap' }}>{o.id}</td>
                              <td style={{ padding: '0.5rem 0.4rem', color: 'var(--text-main)' }}>{o.cliente}</td>
                              <td style={{ padding: '0.5rem 0.4rem', color: 'var(--text-muted)', textAlign: 'center' }}>{o.items}</td>
                              <td style={{ padding: '0.5rem 0.4rem', color: 'var(--text-muted)', textAlign: 'center' }}>{o.pallets}</td>
                              <td style={{ padding: '0.5rem 0.4rem', color: 'var(--text-muted)', textAlign: 'center' }}>{o.kilos.toLocaleString()}</td>
                              <td style={{ padding: '0.5rem 0.4rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{o.fecha}</td>
                              <td style={{ padding: '0.5rem 0.4rem', color: 'var(--text-muted)' }}>{o.chofer}</td>
                              <td style={{ padding: '0.5rem 0.4rem', whiteSpace: 'nowrap' }}>
                                <span style={{ padding: '0.15rem 0.4rem', borderRadius: '3px', fontSize: '0.55rem', fontWeight: 600, color: estadoColors[o.estado], background: estadoColors[o.estado] + '15' }}>{o.estado}</span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    </div>
                  </div>
                )}
                {demoTab === 'temperature' && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <div>
                        <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>Monitoreo de Temperaturas</h3>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{demoTemperatures.length} sensores activos</p>
                      </div>
                      <span style={{ fontSize: '0.65rem', padding: '0.25rem 0.5rem', background: 'rgba(244,67,54,0.15)', color: '#f44336', borderRadius: '4px', fontFamily: "'Syne', sans-serif", fontWeight: 700, letterSpacing: '0.05em', animation: 'pulse 2s infinite' }}>● LIVE</span>
                    </div>
                    {/* Sensor Cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1rem' }}>
                      {demoTemperatures.map((t) => {
                        const tempColor = t.temp < -15 ? '#2196F3' : t.temp < 5 ? '#4CAF50' : '#f44336';
                        const statusColor = t.status === 'OK' ? '#4CAF50' : '#f44336';
                        return (
                          <div key={t.sensor} style={{ padding: '0.75rem', background: 'var(--surface-alt)', borderRadius: '6px', border: `1px solid ${t.status === 'ALERTA' ? 'rgba(244,67,54,0.3)' : 'var(--border)'}` }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                              <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-main)', fontFamily: "'Syne', sans-serif" }}>{t.nombre}</span>
                              <span style={{ fontSize: '0.55rem', padding: '0.1rem 0.3rem', borderRadius: '3px', fontWeight: 600, color: statusColor, background: statusColor + '15' }}>{t.status}</span>
                            </div>
                            <p style={{ fontSize: '1.5rem', fontWeight: 800, color: tempColor, fontFamily: "'Syne', sans-serif", marginBottom: '0.25rem' }}>{t.temp}°C</p>
                            <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginBottom: '0.1rem' }}>📍 {t.ubicacion}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.55rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                              <span>Mín: {t.min}°C</span>
                              <span>Máx: {t.max}°C</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {/* Compliance Bar */}
                    <div style={{ padding: '0.75rem', background: 'var(--surface-alt)', borderRadius: '6px', border: '1px solid var(--border)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>Cumplimiento Térmico</span>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4CAF50', fontFamily: "'Syne', sans-serif" }}>92%</span>
                      </div>
                      <div style={{ height: '6px', background: 'var(--surface)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: '92%', background: 'linear-gradient(90deg, #4CAF50, #8BC34A)', borderRadius: '3px' }} />
                      </div>
                      <p style={{ fontSize: '0.55rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>5 de 6 sensores dentro del rango esperado</p>
                    </div>
                  </div>
                )}
                {demoTab === 'activity' && (
                  <div>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>Actividad Reciente</h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Últimos movimientos del día</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {demoActivities.map((a, i) => {
                        const tipoColors: Record<string, string> = { 'INGRESO': '#4CAF50', 'DESPACHO': '#2196F3', 'REVISIÓN': '#FF9800', 'TEMP': '#f44336' };
                        const tipoIcons: Record<string, string> = { 'INGRESO': 'mdi:package-down', 'DESPACHO': 'mdi:truck-delivery', 'REVISIÓN': 'mdi:clipboard-check', 'TEMP': 'mdi:thermometer-alert' };
                        return (
                          <div key={i} style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem', background: 'var(--surface-alt)', borderRadius: '6px', border: '1px solid var(--border)' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: tipoColors[a.tipo] + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <Icon icon={tipoIcons[a.tipo]} width={16} style={{ color: tipoColors[a.tipo] }} />
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)' }}>{a.detalle}</span>
                                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', flexShrink: 0, marginLeft: '0.5rem' }}>{a.time}</span>
                              </div>
                              <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.65rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                                <span>Guía: <b style={{ color: 'var(--text-main)' }}>{a.guia}</b></span>
                                <span>Placa: <b style={{ color: 'var(--text-main)' }}>{a.placa}</b></span>
                                <span>Operador: <b style={{ color: 'var(--text-main)' }}>{a.operador}</b></span>
                                <span style={{ padding: '0.1rem 0.35rem', borderRadius: '3px', fontSize: '0.55rem', fontWeight: 600, color: tipoColors[a.tipo], background: tipoColors[a.tipo] + '15' }}>{a.tipo}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          PROCESS SECTION
      ════════════════════════════════════════════════════════════════ */}
      <section id="proceso" className="section-padding" style={{ padding: '7rem 4rem', background: 'var(--surface-alt)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '4rem' }}>
            <p className="label reveal" style={{ color: 'var(--accent)', marginBottom: '0.75rem' }}>
              Cómo Trabajamos
            </p>
            <h2 className="heading-lg reveal reveal-delay-1">Nuestro Proceso</h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '3rem',
            }}
          >
            {[
              { num: '01', title: 'Descubrimos', desc: 'Escuchamos tus ideas, analizamos tu marca y definimos la visión del proyecto. Investigamos tu mercado y competencia para crear una estrategia sólida.' },
              { num: '02', title: 'Creamos', desc: 'Diseñamos y desarrollamos tu proyecto con las últimas tecnologías. Cada detalle es cuidadosamente elaborado para superar tus expectativas.' },
              { num: '03', title: 'Entregamos', desc: 'Lanzamos tu proyecto optimizado y listo para conquistar. Te acompañamos con soporte continuo para asegurar el éxito a largo plazo.' },
            ].map((step, idx) => (
              <div key={step.num} className={`reveal reveal-delay-${idx + 1}`}>
                <div className="step-number" style={{ marginBottom: '1rem' }}>
                  {step.num}
                </div>
                <h3 className="heading-md" style={{ marginBottom: '0.75rem', color: 'var(--accent)' }}>
                  {step.title}
                </h3>
                <div style={{ width: '40px', height: '2px', background: 'var(--accent)', marginBottom: '1rem' }} />
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          PRICING SECTION
      ════════════════════════════════════════════════════════════════ */}
      <section id="precios" className="section-padding" style={{ padding: '7rem 4rem', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p className="label reveal" style={{ color: 'var(--accent)', marginBottom: '0.75rem' }}>
            Inversión
          </p>
          <h2 className="heading-lg reveal reveal-delay-1">Planes y Precios</h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            alignItems: 'start',
          }}
        >
          {/* Starter */}
          <div className="pricing-card reveal reveal-delay-1">
            <p className="label" style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Starter</p>
            <div style={{ marginBottom: '2rem' }}>
              <span className="stat-number">$99</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}> USD</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
              {['Landing page (1 página)', '1 invitación virtual', 'Edición de 5 fotos', 'Entrega en 5 días', 'Sin revisiones'].map((feature) => (
                <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  <Icon icon="mdi:check" width={18} style={{ color: 'var(--accent)' }} />
                  {feature}
                </div>
              ))}
            </div>
            <a href="#contacto" className="btn-outline" style={{ width: '100%', justifyContent: 'center' }} onClick={(e) => scrollTo(e, '#contacto')}>
              Elegir Plan
            </a>
          </div>

          {/* Pro (Featured) */}
          <div className="pricing-card featured reveal reveal-delay-2">
            <div style={{ position: 'absolute', top: '-1px', left: '50%', transform: 'translateX(-50%)', background: 'var(--accent)', color: '#000', padding: '0.35rem 1.25rem', fontFamily: "'Syne', sans-serif", fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Popular
            </div>
            <p className="label" style={{ color: 'var(--accent)', marginBottom: '1rem' }}>Pro</p>
            <div style={{ marginBottom: '2rem' }}>
              <span className="stat-number">$249</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}> USD</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
              {['Sitio multi-página', '3 invitaciones virtuales', '15 fotos + 1 video', 'Entrega en 7 días', '3 revisiones incluidas', 'SEO básico'].map((feature) => (
                <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  <Icon icon="mdi:check" width={18} style={{ color: 'var(--accent)' }} />
                  {feature}
                </div>
              ))}
            </div>
            <a href="#contacto" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={(e) => scrollTo(e, '#contacto')}>
              Elegir Plan
            </a>
          </div>

          {/* Premium */}
          <div className="pricing-card reveal reveal-delay-3">
            <p className="label" style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Premium</p>
            <div style={{ marginBottom: '2rem' }}>
              <span className="stat-number">$499</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}> USD</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
              {['App / web completa', 'Invitaciones ilimitadas', 'Paquete de fotos + video completo', 'Branding completo', 'Soporte por 30 días', 'Revisiones ilimitadas', 'Entrega prioritaria'].map((feature) => (
                <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  <Icon icon="mdi:check" width={18} style={{ color: 'var(--accent)' }} />
                  {feature}
                </div>
              ))}
            </div>
            <a href="#contacto" className="btn-outline" style={{ width: '100%', justifyContent: 'center' }} onClick={(e) => scrollTo(e, '#contacto')}>
              Elegir Plan
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          TESTIMONIALS SECTION
      ════════════════════════════════════════════════════════════════ */}
      <section id="testimonios" className="section-padding" style={{ padding: '7rem 4rem', background: 'var(--surface-alt)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p className="label reveal" style={{ color: 'var(--accent)', marginBottom: '0.75rem' }}>
              Testimonios
            </p>
            <h2 className="heading-lg reveal reveal-delay-1">Lo que dicen nuestros clientes</h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {[
              {
                name: 'María González',
                service: 'Invitación Virtual',
                quote: 'DigiCraft transformó nuestra boda digital. Las invitaciones fueron exactamente lo que soñábamos. Elegantes, interactivas y nuestros invitados quedaron encantados. ¡Totalmente recomendados!',
                avatar: 'MG',
              },
              {
                name: 'Carlos Mendoza',
                service: 'App Móvil',
                quote: 'La app de fitness que desarrollaron superó todas nuestras expectativas. El diseño es intuitivo, el rendimiento impecable y nuestros usuarios la aman. Un equipo de primera.',
                avatar: 'CM',
              },
              {
                name: 'Ana Rodríguez',
                service: 'Edición de Video',
                quote: 'El spot publicitario que crearon para mi marca fue increíble. La calidad cinematográfica y los motion graphics elevaron nuestra imagen corporativa al siguiente nivel.',
                avatar: 'AR',
              },
            ].map((t, idx) => (
              <div key={t.name} className={`testimonial-card reveal reveal-delay-${idx + 1}`}>
                <Icon icon="mdi:format-quote-open" width={32} style={{ color: 'var(--accent)', marginBottom: '1rem', opacity: 0.6 }} />
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem', fontStyle: 'italic' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'var(--accent-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.8rem', color: 'var(--accent)' }}>
                    {t.avatar}
                  </div>
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

      {/* ════════════════════════════════════════════════════════════════
          CONTACT SECTION
      ════════════════════════════════════════════════════════════════ */}
      <section id="contacto" className="section-padding" style={{ padding: '7rem 4rem', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ marginBottom: '4rem' }}>
          <p className="label reveal" style={{ color: 'var(--accent)', marginBottom: '0.75rem' }}>
            Hablemos
          </p>
          <h2 className="heading-lg reveal reveal-delay-1">Contacto</h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '4rem',
          }}
        >
          {/* Contact Info */}
          <div className="reveal">
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              ¿Tienes un proyecto en mente? Nos encantaría escucharte. Escríbenos y conversemos sobre cómo podemos ayudarte a hacer realidad tu idea.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--accent-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon icon="mdi:email" width={22} style={{ color: 'var(--accent)' }} />
                </div>
                <div>
                  <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: '0.85rem' }}>Email</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>hola@digicraft.studio</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--accent-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon icon="mdi:whatsapp" width={22} style={{ color: 'var(--accent)' }} />
                </div>
                <div>
                  <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: '0.85rem' }}>WhatsApp</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>+52 1 234 567 8900</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--accent-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon icon="mdi:instagram" width={22} style={{ color: 'var(--accent)' }} />
                </div>
                <div>
                  <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: '0.85rem' }}>Instagram</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>@digicraft.studio</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="reveal reveal-delay-2" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontFamily: "'Syne', sans-serif", fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                required
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  color: 'var(--text-main)',
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border-color 0.3s',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontFamily: "'Syne', sans-serif", fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  color: 'var(--text-main)',
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border-color 0.3s',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontFamily: "'Syne', sans-serif", fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                Servicio
              </label>
              <select
                name="servicio"
                required
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  color: 'var(--text-muted)',
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border-color 0.3s',
                  appearance: 'none',
                  cursor: 'pointer',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
              >
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
              <label style={{ display: 'block', fontFamily: "'Syne', sans-serif", fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                Mensaje
              </label>
              <textarea
                name="mensaje"
                required
                rows={5}
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  color: 'var(--text-main)',
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '0.95rem',
                  outline: 'none',
                  resize: 'vertical',
                  transition: 'border-color 0.3s',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Enviar Mensaje
              <Icon icon="mdi:send" width={18} />
            </button>
          </form>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          CTA FINAL BANNER
      ════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: '6rem 4rem',
          textAlign: 'center',
          background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="reveal">
          <h2 className="heading-lg" style={{ marginBottom: '1.5rem' }}>
            ¿Listo para <span style={{ color: 'var(--accent)' }}>empezar</span>?
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '500px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
            Tu próximo proyecto digital está a un mensaje de distancia. Hablemos y hagamos magia juntos.
          </p>
          <a href="#contacto" className="btn-primary" onClick={(e) => scrollTo(e, '#contacto')}>
            Empezar Proyecto
            <Icon icon="mdi:arrow-right" width={18} />
          </a>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════════════════════════ */}
      <footer
        className="section-padding"
        style={{
          padding: '5rem 4rem 2rem',
          borderTop: '1px solid var(--border)',
          background: 'var(--bg)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem',
            maxWidth: '1100px',
            margin: '0 auto 4rem',
          }}
        >
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
            <p className="label" style={{ marginBottom: '1.25rem', color: 'var(--accent)' }}>
              Navegación
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { label: 'Servicios', href: '#servicios' },
                { label: 'Portfolio', href: '#portfolio' },
                { label: 'Proceso', href: '#proceso' },
                { label: 'Precios', href: '#precios' },
                { label: 'Contacto', href: '#contacto' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  style={{ color: 'var(--text-muted)', fontSize: '0.9rem', transition: 'color 0.3s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="label" style={{ marginBottom: '1.25rem', color: 'var(--accent)' }}>
              Síguenos
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[
                { icon: 'mdi:instagram', href: '#', label: 'Instagram' },
                { icon: 'mdi:twitter', href: '#', label: 'Twitter' },
                { icon: 'mdi:linkedin', href: '#', label: 'LinkedIn' },
                { icon: 'mdi:whatsapp', href: '#', label: 'WhatsApp' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="footer-social-icon"
                >
                  <Icon icon={social.icon} width={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '2rem',
            textAlign: 'center',
            maxWidth: '1100px',
            margin: '0 auto',
          }}
        >
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            © 2025 DigiCraft Studio. Hecho con ❤ y código
          </p>
        </div>
      </footer>

      {/* ─── WhatsApp Floating Button ─── */}
      <a
        id="whatsappBtn"
        ref={whatsappBtnRef}
        href="https://wa.me/5212345678900"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
      >
        <Icon icon="mdi:whatsapp" width={28} style={{ color: '#fff' }} />
      </a>
    </>
  );
}
