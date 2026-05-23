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
    isVideo: false,
    height: '',
    aspect: 'aspect-[4/3]',
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

/* ─── Demo ERP Initial Data (Gestión Empresarial Integral) ─── */
type Cliente = {
  id: string; nombre: string; email: string; telefono: string; empresa: string; rubro: string; estado: 'Activo' | 'Inactivo';
};
type Producto = {
  id: string; nombre: string; categoria: string; precio: number; stock: number; stockMin: number; unidad: string; proveedor: string;
};
type PedidoLinea = { producto: string; cantidad: number; precioUnitario: number; subtotal: number };
type Pedido = {
  id: string; clienteId: string; clienteNombre: string; items: PedidoLinea[]; total: number;
  estado: 'PENDIENTE' | 'CONFIRMADO' | 'ENVIADO' | 'ENTREGADO' | 'CANCELADO'; fecha: string;
};
type OrdenCompraLinea = { producto: string; cantidad: number; precioUnitario: number; subtotal: number };
type OrdenCompra = {
  id: string; proveedor: string; items: OrdenCompraLinea[]; total: number;
  estado: 'SOLICITADA' | 'APROBADA' | 'RECIBIDA' | 'CANCELADA'; fecha: string;
};
type ActivityEntry = {
  time: string; tipo: string; detalle: string; usuario: string;
};

const INITIAL_CLIENTES: Cliente[] = [
  { id: 'CL-001', nombre: 'María González', email: 'maria@techsolutions.com', telefono: '+598 99 123 456', empresa: 'Tech Solutions S.A.', rubro: 'Tecnología', estado: 'Activo' },
  { id: 'CL-002', nombre: 'Carlos Rodríguez', email: 'carlos@distribuidora.com', telefono: '+598 99 234 567', empresa: 'Distribuidora Regional', rubro: 'Distribución', estado: 'Activo' },
  { id: 'CL-003', nombre: 'Ana Martínez', email: 'ana@importadorasur.com', telefono: '+598 99 345 678', empresa: 'Importadora del Sur', rubro: 'Importaciones', estado: 'Activo' },
  { id: 'CL-004', nombre: 'Roberto Silva', email: 'roberto@constructora.com', telefono: '+598 99 456 789', empresa: 'Constructora del Litoral', rubro: 'Construcción', estado: 'Activo' },
  { id: 'CL-005', nombre: 'Laura Benítez', email: 'laura@medicalplus.com', telefono: '+598 99 567 890', empresa: 'Medical Plus S.R.L.', rubro: 'Salud', estado: 'Activo' },
  { id: 'CL-006', nombre: 'Diego Fernández', email: 'diego@agroexport.com', telefono: '+598 99 678 901', empresa: 'Agroexport S.A.', rubro: 'Agroindustria', estado: 'Inactivo' },
  { id: 'CL-007', nombre: 'Valentina López', email: 'valentina@educamas.com', telefono: '+598 99 789 012', empresa: 'Educa Más', rubro: 'Educación', estado: 'Activo' },
  { id: 'CL-008', nombre: 'Martín Álvarez', email: 'martin@foodservice.com', telefono: '+598 99 890 123', empresa: 'Food Service Int.', rubro: 'Alimentación', estado: 'Activo' },
];

const INITIAL_PRODUCTOS: Producto[] = [
  { id: 'PRD-001', nombre: 'Monitor LED 24"', categoria: 'Pantallas', precio: 289.99, stock: 45, stockMin: 10, unidad: 'Unidad', proveedor: 'Samsung Electronics' },
  { id: 'PRD-002', nombre: 'Teclado Mecánico RGB', categoria: 'Periféricos', precio: 79.99, stock: 120, stockMin: 20, unidad: 'Unidad', proveedor: 'Logitech' },
  { id: 'PRD-003', nombre: 'Silla Ergonómica Pro', categoria: 'Mobiliario', precio: 349.99, stock: 8, stockMin: 15, unidad: 'Unidad', proveedor: 'Herman Miller' },
  { id: 'PRD-004', nombre: 'Cable HDMI 2m', categoria: 'Cables', precio: 12.99, stock: 300, stockMin: 50, unidad: 'Unidad', proveedor: 'Belkin' },
  { id: 'PRD-005', nombre: 'Mouse Inalámbrico', categoria: 'Periféricos', precio: 45.99, stock: 85, stockMin: 25, unidad: 'Unidad', proveedor: 'Logitech' },
  { id: 'PRD-006', nombre: 'Impresora Laser A4', categoria: 'Impresoras', precio: 429.99, stock: 12, stockMin: 5, unidad: 'Unidad', proveedor: 'HP Inc.' },
  { id: 'PRD-007', nombre: 'Disco SSD 1TB', categoria: 'Almacenamiento', precio: 89.99, stock: 3, stockMin: 20, unidad: 'Unidad', proveedor: 'Western Digital' },
  { id: 'PRD-008', nombre: 'Webcam HD 1080p', categoria: 'Periféricos', precio: 59.99, stock: 5, stockMin: 10, unidad: 'Unidad', proveedor: 'Microsoft' },
  { id: 'PRD-009', nombre: 'Auriculares Noise Cancel', categoria: 'Audio', precio: 199.99, stock: 32, stockMin: 10, unidad: 'Unidad', proveedor: 'Sony' },
  { id: 'PRD-010', nombre: 'Hub USB-C 7 puertos', categoria: 'Accesorios', precio: 34.99, stock: 67, stockMin: 15, unidad: 'Unidad', proveedor: 'Anker' },
];

const INITIAL_PEDIDOS: Pedido[] = [
  { id: 'V-001', clienteId: 'CL-001', clienteNombre: 'Tech Solutions S.A.', items: [{ producto: 'Monitor LED 24"', cantidad: 5, precioUnitario: 289.99, subtotal: 1449.95 }, { producto: 'Teclado Mecánico RGB', cantidad: 5, precioUnitario: 79.99, subtotal: 399.95 }], total: 1849.90, estado: 'CONFIRMADO', fecha: '2025-06-10' },
  { id: 'V-002', clienteId: 'CL-003', clienteNombre: 'Importadora del Sur', items: [{ producto: 'Impresora Laser A4', cantidad: 2, precioUnitario: 429.99, subtotal: 859.98 }], total: 859.98, estado: 'PENDIENTE', fecha: '2025-06-11' },
  { id: 'V-003', clienteId: 'CL-005', clienteNombre: 'Medical Plus S.R.L.', items: [{ producto: 'Monitor LED 24"', cantidad: 10, precioUnitario: 289.99, subtotal: 2899.90 }, { producto: 'Webcam HD 1080p', cantidad: 10, precioUnitario: 59.99, subtotal: 599.90 }], total: 3499.80, estado: 'ENVIADO', fecha: '2025-06-09' },
  { id: 'V-004', clienteId: 'CL-002', clienteNombre: 'Distribuidora Regional', items: [{ producto: 'Disco SSD 1TB', cantidad: 20, precioUnitario: 89.99, subtotal: 1799.80 }], total: 1799.80, estado: 'ENTREGADO', fecha: '2025-06-07' },
  { id: 'V-005', clienteId: 'CL-007', clienteNombre: 'Educa Más', items: [{ producto: 'Silla Ergonómica Pro', cantidad: 3, precioUnitario: 349.99, subtotal: 1049.97 }, { producto: 'Auriculares Noise Cancel', cantidad: 3, precioUnitario: 199.99, subtotal: 599.97 }], total: 1649.94, estado: 'CANCELADO', fecha: '2025-06-05' },
  { id: 'V-006', clienteId: 'CL-008', clienteNombre: 'Food Service Int.', items: [{ producto: 'Hub USB-C 7 puertos', cantidad: 15, precioUnitario: 34.99, subtotal: 524.85 }], total: 524.85, estado: 'PENDIENTE', fecha: '2025-06-12' },
];

const INITIAL_ORDENES_COMPRA: OrdenCompra[] = [
  { id: 'OC-001', proveedor: 'Samsung Electronics', items: [{ producto: 'Monitor LED 24"', cantidad: 30, precioUnitario: 220.00, subtotal: 6600.00 }], total: 6600.00, estado: 'APROBADA', fecha: '2025-06-08' },
  { id: 'OC-002', proveedor: 'Logitech', items: [{ producto: 'Teclado Mecánico RGB', cantidad: 50, precioUnitario: 55.00, subtotal: 2750.00 }, { producto: 'Mouse Inalámbrico', cantidad: 50, precioUnitario: 30.00, subtotal: 1500.00 }], total: 4250.00, estado: 'SOLICITADA', fecha: '2025-06-10' },
  { id: 'OC-003', proveedor: 'Western Digital', items: [{ producto: 'Disco SSD 1TB', cantidad: 40, precioUnitario: 65.00, subtotal: 2600.00 }], total: 2600.00, estado: 'RECIBIDA', fecha: '2025-06-05' },
  { id: 'OC-004', proveedor: 'Herman Miller', items: [{ producto: 'Silla Ergonómica Pro', cantidad: 10, precioUnitario: 260.00, subtotal: 2600.00 }], total: 2600.00, estado: 'SOLICITADA', fecha: '2025-06-11' },
  { id: 'OC-005', proveedor: 'Sony', items: [{ producto: 'Auriculares Noise Cancel', cantidad: 25, precioUnitario: 145.00, subtotal: 3625.00 }], total: 3625.00, estado: 'CANCELADA', fecha: '2025-06-03' },
];

const INITIAL_ACTIVITY: ActivityEntry[] = [
  { time: '08:15', tipo: 'VENTA', detalle: 'Pedido V-001 creado — Tech Solutions S.A.', usuario: 'Admin' },
  { time: '09:30', tipo: 'COMPRA', detalle: 'Orden OC-002 solicitada — Logitech', usuario: 'Op. López' },
  { time: '10:45', tipo: 'CLIENTE', detalle: 'Nuevo cliente registrado — Food Service Int.', usuario: 'Admin' },
  { time: '11:20', tipo: 'PRODUCTO', detalle: 'Stock actualizado — Disco SSD 1TB (50→3 unidades)', usuario: 'Op. Martínez' },
  { time: '12:00', tipo: 'VENTA', detalle: 'Pedido V-003 enviado — Medical Plus S.R.L.', usuario: 'Admin' },
  { time: '13:30', tipo: 'COMPRA', detalle: 'Orden OC-003 recibida — Western Digital', usuario: 'Op. López' },
  { time: '14:15', tipo: 'EDICIÓN', detalle: 'Cliente CL-006 actualizado — Agroexport S.A.', usuario: 'Admin' },
];

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

  /* ─── Demo ERP State (Gestión Empresarial Integral) ─── */
  const [clientes, setClientes] = useState<Cliente[]>(INITIAL_CLIENTES);
  const [productos, setProductos] = useState<Producto[]>(INITIAL_PRODUCTOS);
  const [pedidos, setPedidos] = useState<Pedido[]>(INITIAL_PEDIDOS);
  const [ordenesCompra, setOrdenesCompra] = useState<OrdenCompra[]>(INITIAL_ORDENES_COMPRA);
  const [activityLog, setActivityLog] = useState<ActivityEntry[]>(INITIAL_ACTIVITY);
  const [demoExpanded, setDemoExpanded] = useState(false);
  const [demoTab, setDemoTab] = useState<'dashboard' | 'clientes' | 'productos' | 'ventas' | 'compras' | 'actividad'>('dashboard');
  
  /* Scroll to demo section when expanded */
  useEffect(() => {
    if (demoExpanded) {
      setTimeout(() => {
        document.getElementById('erp-demo-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [demoExpanded]);
  const [showModal, setShowModal] = useState<string | null>(null);
  const [demoToast, setDemoToast] = useState('');
  const [clienteSearch, setClienteSearch] = useState('');
  const [productoSearch, setProductoSearch] = useState('');
  const [ventaFilter, setVentaFilter] = useState('Todos');
  const [compraFilter, setCompraFilter] = useState('Todos');
  const [activityFilter, setActivityFilter] = useState('Todos');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);
  const [editingProducto, setEditingProducto] = useState<Producto | null>(null);
  const [clienteForm, setClienteForm] = useState({ nombre: '', email: '', telefono: '', empresa: '', rubro: '', estado: 'Activo' as const });
  const [productoForm, setProductoForm] = useState({ nombre: '', categoria: '', precio: 0, stock: 0, stockMin: 0, unidad: 'Unidad', proveedor: '' });
  const [ventaForm, setVentaForm] = useState({ clienteId: '', items: [{ productoId: '', cantidad: 1, precioUnitario: 0 }] as Array<{ productoId: string; cantidad: number; precioUnitario: number }> });
  const [compraForm, setCompraForm] = useState({ proveedor: '', items: [{ productoId: '', cantidad: 1, precioUnitario: 0 }] as Array<{ productoId: string; cantidad: number; precioUnitario: number }> });

  /* ─── Demo Helper Functions ─── */
  const generateId = useCallback((prefix: string, arr: { id: string }[]) => {
    const maxNum = arr.reduce((max, item) => {
      const num = parseInt(item.id.replace(prefix + '-', ''));
      return isNaN(num) ? max : Math.max(max, num);
    }, 0);
    return `${prefix}-${String(maxNum + 1).padStart(3, '0')}`;
  }, []);

  const addActivity = useCallback((tipo: string, detalle: string, usuario: string = 'Demo User') => {
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setActivityLog(prev => [{ time, tipo, detalle, usuario }, ...prev]);
  }, []);

  const showDemoToast = useCallback((msg: string) => {
    setDemoToast(msg);
    setTimeout(() => setDemoToast(''), 3000);
  }, []);

  const recalcKPIs = useCallback(() => {
    const totalClientes = clientes.filter(c => c.estado === 'Activo').length;
    const totalProductos = productos.length;
    const productosBajoStock = productos.filter(p => p.stock < p.stockMin).length;
    const ventasPendientes = pedidos.filter(p => p.estado === 'PENDIENTE' || p.estado === 'CONFIRMADO').length;
    const ventasMes = pedidos.filter(p => p.estado !== 'CANCELADO').reduce((s, p) => s + p.total, 0);
    const comprasPendientes = ordenesCompra.filter(o => o.estado === 'SOLICITADA' || o.estado === 'APROBADA').length;
    const valorInventario = productos.reduce((s, p) => s + (p.precio * p.stock), 0);
    return { totalClientes, totalProductos, productosBajoStock, ventasPendientes, ventasMes, comprasPendientes, valorInventario };
  }, [clientes, productos, pedidos, ordenesCompra]);

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
                borderRadius: 'var(--radius-xs)',
                color: 'var(--text-main)',
                fontFamily: "'Manrope', sans-serif",
                fontSize: '1rem',
                outline: 'none',
              }}
            />
          </div>
          <div style={{ maxHeight: '55vh', overflowY: 'auto', marginTop: '0.5rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xs)' }}>
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
            opacity: 0.08,
            filter: 'grayscale(100%) brightness(0.6)',
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
      <section id="servicios" className="section-padding" style={{ padding: '6rem 0', maxWidth: '1280px', margin: '0 auto' }}>
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
            <div key={service.title} className={`service-card reveal reveal-delay-${Math.min(idx + 1, 5)}`} style={{ boxShadow: 'var(--card-shadow)', borderRadius: 'var(--radius)' }}>
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
          padding: '5rem 0',
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
      <section id="portfolio" className="section-padding" style={{ padding: '6rem 0', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ marginBottom: '4rem' }}>
          <p className="label reveal" style={{ color: 'var(--accent)', marginBottom: '0.75rem' }}>
            Nuestro Trabajo
          </p>
          <h2 className="heading-lg reveal reveal-delay-1">Portfolio</h2>
        </div>

        <div className="portfolio-grid">
          {/* TikTok — Invitación 15 Años (dentro del grid) */}
          <div
            className="reveal"
            style={{
              gridColumn: 'span 1',
              gridRow: 'span 2',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 'var(--radius-sm)',
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
          {/* ── ERP Mini Card (Portfolio) ── */}
          <div
            className="reveal erp-card"
            onClick={() => setDemoExpanded(true)}
          style={{
            gridColumn: 'span 2',
            gridRow: 'span 2',
            borderRadius: 'var(--radius)',
            overflow: 'hidden',
            border: '1px solid var(--border)',
            background: 'var(--surface-alt)',
            cursor: 'pointer',
            position: 'relative',
            transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--card-shadow-hover)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--card-shadow)'; }}
        >
          {/* Mini preview */}
          <div style={{ flex: 1, background: 'var(--surface-elevated)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', minHeight: '320px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 14px', background: 'var(--surface-alt)', borderBottom: '1px solid var(--border)' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#febc2e' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840' }} />
              <span style={{ marginLeft: '10px', fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: "'Manrope', sans-serif" }}>erp.digicraft.studio</span>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px', padding: '2px 8px', background: 'rgba(212,175,55,0.1)', borderRadius: 'var(--radius-xs)' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D4AF37', animation: 'pulse-border 2s infinite' }} />
                <span style={{ fontSize: '0.6rem', color: 'var(--accent)', fontWeight: 600, fontFamily: "'Syne', sans-serif" }}>LIVE</span>
              </div>
            </div>
            <div style={{ flex: 1, display: 'flex', padding: '12px 14px', gap: '10px' }}>
              {/* Fake sidebar */}
              <div style={{ width: '70px', background: 'var(--surface-alt)', borderRadius: 'var(--radius-xs)', padding: '8px 6px', display: 'flex', flexDirection: 'column', gap: '6px', borderRight: '1px solid var(--border)' }}>
                <div style={{ height: '5px', width: '80%', borderRadius: '2px', background: 'var(--accent)', opacity: 0.8, margin: '0 auto' }} />
                {[0,1,2,3].map(i => (
                  <div key={i} style={{ height: '5px', borderRadius: '2px', background: 'var(--border)', opacity: 0.6, width: '70%', margin: '0 auto' }} />
                ))}
                <div style={{ marginTop: 'auto', height: '14px', width: '28px', borderRadius: '50%', background: 'var(--accent-dim)', margin: 'auto auto 0 auto' }} />
              </div>
              {/* Fake KPI grid + content */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                  {[0,1,2].map(i => (
                    <div key={i} style={{ background: 'var(--surface-alt)', borderRadius: 'var(--radius-xs)', padding: '10px 8px', border: '1px solid var(--border)' }}>
                      <div style={{ height: '4px', width: '50%', borderRadius: '2px', background: 'var(--border)', marginBottom: '8px' }} />
                      <div style={{ height: '12px', width: '70%', borderRadius: '2px', background: 'var(--accent)', opacity: 0.5 }} />
                    </div>
                  ))}
                </div>
                {/* Fake table rows */}
                {[0,1,2,3].map(i => (
                  <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <div style={{ height: '4px', flex: 3, borderRadius: '2px', background: i % 2 === 0 ? 'var(--border)' : 'rgba(255,255,255,0.03)', opacity: 0.5 }} />
                    <div style={{ height: '4px', width: '50px', borderRadius: '2px', background: 'var(--border)', opacity: 0.4 }} />
                    <div style={{ height: '18px', width: '50px', borderRadius: 'var(--radius-xs)', background: i === 0 ? 'rgba(76,175,80,0.1)' : i === 1 ? 'rgba(255,152,0,0.1)' : 'rgba(33,150,243,0.1)' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Info */}
          <div style={{ padding: '1.1rem 1rem', borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent)' }}>Software a Medida</span>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.25rem', marginBottom: '0.4rem' }}>Sistema de Gestión ERP</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>Plataforma 100% personalizable con Next.js, Firebase y PWA. CRUD completo, roles, exportación y más.</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem', color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 600, flexShrink: 0, marginLeft: '1rem' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'var(--accent-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon icon="mdi:play" width={20} style={{ color: 'var(--accent)' }} />
                </div>
                <span style={{ fontSize: '0.65rem' }}>Demo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>

      {/* ── DEMO EXPANDED (Full Interactive ERP) — Inline Section ── */}
      <section id="erp-demo-section" style={{ display: demoExpanded ? 'block' : 'none', animation: 'fadeIn 0.4s ease', background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Top Navigation Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 2rem', background: 'var(--surface-alt)', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
              <button onClick={() => { setDemoExpanded(false); setTimeout(() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }), 100); }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: '1px solid var(--border)', borderRadius: 'var(--radius-xs)', color: 'var(--text-main)', cursor: 'pointer', padding: '0.6rem 1.2rem', fontSize: '0.9rem', fontFamily: "'Manrope', sans-serif", fontWeight: 500, transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-main)'; }}>
                <Icon icon="mdi:arrow-left" width={20} /> Volver al Portfolio
              </button>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1.3rem', color: 'var(--text-main)' }}>Sistema de Gestión ERP</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Demo Interactiva — Explorá, creá, gestioná</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.8rem', background: 'rgba(212,175,55,0.1)', borderRadius: 'var(--radius-xs)' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#D4AF37' }} />
                <span style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600, fontFamily: "'Syne', sans-serif" }}>LIVE</span>
              </div>
            </div>
            <div style={{ display: 'flex', background: 'var(--surface-elevated)', position: 'relative', minHeight: '600px' }}>
              {/* Mini Sidebar */}
              <div style={{ width: '260px', background: 'var(--surface-alt)', borderRight: '1px solid var(--border)', padding: '1rem 0', flexShrink: 0, boxShadow: 'var(--card-shadow)' }}>
                <div style={{ padding: '0 1rem 1rem', borderBottom: '1px solid var(--border)', marginBottom: '0.75rem' }}>
                  <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1rem', color: 'var(--accent)' }}>DigiCraft</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Gestión Empresarial</p>
                </div>
                {[
                  { key: 'dashboard' as const, icon: 'mdi:view-dashboard', label: 'Panel Principal' },
                  { key: 'clientes' as const, icon: 'mdi:account-group', label: 'Clientes' },
                  { key: 'productos' as const, icon: 'mdi:package-variant-closed', label: 'Productos' },
                  { key: 'ventas' as const, icon: 'mdi:cart', label: 'Ventas' },
                  { key: 'compras' as const, icon: 'mdi:cart-arrow-down', label: 'Compras' },
                  { key: 'actividad' as const, icon: 'mdi:history', label: 'Actividad' },
                ].map((tab) => (
                  <button key={tab.key} onClick={() => setDemoTab(tab.key)} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', width: '100%', padding: '0.75rem 1.25rem', border: 'none', background: demoTab === tab.key ? 'rgba(212,175,55,0.1)' : 'transparent', color: demoTab === tab.key ? 'var(--accent)' : 'var(--text-muted)', cursor: 'pointer', fontSize: '0.95rem', fontFamily: "'Manrope', sans-serif", fontWeight: 500, transition: 'all 0.2s', textAlign: 'left' }}>
                    <Icon icon={tab.icon} width={20} />
                    {tab.label}
                  </button>
                ))}
                <div style={{ padding: '1rem', marginTop: '1rem', borderTop: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--accent-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon icon="mdi:account" width={14} style={{ color: 'var(--accent)' }} />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>Demo User</p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Administrador</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Main Content */}
              <div style={{ flex: 1, padding: '2rem', minWidth: 0 }}>
                {/* ── DASHBOARD TAB ── */}
                {demoTab === 'dashboard' && (() => {
                  const kpis = recalcKPIs();
                  const lowStock = productos.filter(p => p.stock < p.stockMin);
                  return (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <div>
                        <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)' }}>Panel Principal</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Resumen general del negocio</p>
                      </div>
                      <span style={{ fontSize: '0.8rem', padding: '0.3rem 0.6rem', background: 'rgba(212,175,55,0.1)', color: 'var(--accent)', borderRadius: 'var(--radius-xs)', fontFamily: "'Syne', sans-serif", fontWeight: 600 }}>LIVE</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.25rem' }}>
                      {[
                        { label: 'Clientes Activos', value: kpis.totalClientes, icon: 'mdi:account-group', color: '#D4AF37' },
                        { label: 'Productos', value: kpis.totalProductos, icon: 'mdi:package-variant-closed', color: '#4CAF50' },
                        { label: 'Bajo Stock', value: kpis.productosBajoStock, icon: 'mdi:alert-circle', color: '#f44336' },
                        { label: 'Ventas Pend.', value: kpis.ventasPendientes, icon: 'mdi:cart', color: '#FF9800' },
                        { label: 'Compras Pend.', value: kpis.comprasPendientes, icon: 'mdi:cart-arrow-down', color: '#2196F3' },
                        { label: 'Valor Inventario', value: '$' + kpis.valorInventario.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ','), icon: 'mdi:cash', color: '#9C27B0' },
                      ].map((kpi) => (
                        <div key={kpi.label} style={{ padding: '1rem', background: 'var(--surface-alt)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                            <Icon icon={kpi.icon} width={14} style={{ color: kpi.color }} />
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{kpi.label}</span>
                          </div>
                          <p style={{ fontSize: '1.6rem', fontWeight: 800, fontFamily: "'Syne', sans-serif", color: 'var(--text-main)' }}>{kpi.value}</p>
                        </div>
                      ))}
                    </div>
                    {lowStock.length > 0 && (
                      <div style={{ padding: '1rem', background: 'var(--surface-alt)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border)', marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.6rem' }}>
                          <Icon icon="mdi:alert-circle" width={14} style={{ color: '#f44336' }} />
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Alertas de Stock</span>
                          <span style={{ marginLeft: 'auto', fontSize: '0.75rem', padding: '0.15rem 0.35rem', borderRadius: 'var(--radius-xs)', background: 'rgba(244,67,54,0.15)', color: '#f44336', fontWeight: 600 }}>{lowStock.length} productos</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                          {lowStock.map((p) => (
                            <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.3rem 0.4rem', borderRadius: 'var(--radius-xs)', background: 'var(--surface)' }}>
                              <span style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>{p.nombre}</span>
                              <span style={{ fontSize: '0.75rem', color: '#f44336', fontWeight: 600 }}>{p.stock}/{p.stockMin}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div style={{ padding: '1rem', background: 'var(--surface-alt)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.6rem' }}>
                        <Icon icon="mdi:clock-outline" width={14} style={{ color: 'var(--accent)' }} />
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Actividad Reciente</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                        {activityLog.slice(0, 5).map((a, i) => {
                          const tipoColors: Record<string, string> = { 'CLIENTE': '#4CAF50', 'PRODUCTO': '#2196F3', 'VENTA': '#D4AF37', 'COMPRA': '#9C27B0', 'EDICIÓN': '#FF9800', 'ELIMINACIÓN': '#f44336' };
                          return (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.4rem 0.5rem', borderRadius: 'var(--radius-xs)', background: 'var(--surface)' }}>
                              <span style={{ fontSize: '0.88rem', color: 'var(--text-main)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.detalle}</span>
                              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '0.5rem', flexShrink: 0 }}>{a.time}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  );
                })()}
                {/* ── CLIENTES TAB ── */}
                {demoTab === 'clientes' && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <div>
                        <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)' }}>Clientes</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{clientes.length} clientes registrados</p>
                      </div>
                      <button onClick={() => { setClienteForm({ nombre: '', email: '', telefono: '', empresa: '', rubro: '', estado: 'Activo' }); setEditingCliente(null); setShowModal('addCliente'); }} style={{ padding: '0.4rem 0.75rem', background: 'var(--accent)', color: '#000', border: 'none', borderRadius: 'var(--radius-xs)', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', fontFamily: "'Manrope', sans-serif", display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Icon icon="mdi:plus" width={14} /> Agregar Cliente
                      </button>
                    </div>
                    <div style={{ position: 'relative', marginBottom: '1rem' }}>
                      <Icon icon="mdi:magnify" width={14} style={{ position: 'absolute', left: '0.6rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input type="text" placeholder="Buscar por nombre, email, empresa..." value={clienteSearch} onChange={(e) => setClienteSearch(e.target.value)} style={{ width: '100%', padding: '0.45rem 0.6rem 0.45rem 1.8rem', background: 'var(--surface-alt)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xs)', color: 'var(--text-main)', fontSize: '0.9rem', fontFamily: "'Manrope', sans-serif", outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid var(--border)' }}>
                            {['ID', 'Nombre', 'Email', 'Teléfono', 'Empresa', 'Rubro', 'Estado', 'Acc.'].map((h) => (
                              <th key={h} style={{ padding: '0.65rem 0.6rem', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {clientes.filter(c => {
                            if (!clienteSearch) return true;
                            const q = clienteSearch.toLowerCase();
                            return c.nombre.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.empresa.toLowerCase().includes(q) || c.id.toLowerCase().includes(q);
                          }).map((c) => {
                            const estadoColors: Record<string, string> = { 'Activo': '#4CAF50', 'Inactivo': '#9E9E9E' };
                            return (
                              <tr key={c.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '0.55rem 0.5rem', fontFamily: "'Syne', sans-serif", fontWeight: 600, color: 'var(--text-main)', fontSize: '0.88rem', whiteSpace: 'nowrap' }}>{c.id}</td>
                                <td style={{ padding: '0.55rem 0.5rem', color: 'var(--text-main)', whiteSpace: 'nowrap', fontSize: '0.85rem' }}>{c.nombre}</td>
                                <td style={{ padding: '0.55rem 0.5rem', color: 'var(--text-muted)', fontSize: '0.88rem' }}>{c.email}</td>
                                <td style={{ padding: '0.55rem 0.5rem', color: 'var(--text-muted)', fontSize: '0.88rem', whiteSpace: 'nowrap' }}>{c.telefono}</td>
                                <td style={{ padding: '0.55rem 0.5rem', color: 'var(--text-main)', fontSize: '0.85rem' }}>{c.empresa}</td>
                                <td style={{ padding: '0.55rem 0.5rem', color: 'var(--text-muted)', fontSize: '0.88rem' }}>{c.rubro}</td>
                                <td style={{ padding: '0.55rem 0.5rem', whiteSpace: 'nowrap' }}>
                                  <span style={{ padding: '0.1rem 0.35rem', borderRadius: 'var(--radius-xs)', fontSize: '0.8rem', fontWeight: 600, color: estadoColors[c.estado], background: estadoColors[c.estado] + '15' }}>{c.estado}</span>
                                </td>
                                <td style={{ padding: '0.55rem 0.5rem', whiteSpace: 'nowrap' }}>
                                  {deleteConfirmId === c.id ? (
                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.75rem' }}>
                                      <span style={{ color: 'var(--text-muted)' }}>¿Eliminar?</span>
                                      <button onClick={() => { setClientes(prev => prev.filter(x => x.id !== c.id)); addActivity('ELIMINACIÓN', `Cliente ${c.empresa} eliminado`); showDemoToast(`${c.empresa} eliminado`); setDeleteConfirmId(null); }} style={{ padding: '0.1rem 0.3rem', background: 'rgba(244,67,54,0.15)', color: '#f44336', border: 'none', borderRadius: 'var(--radius-xs)', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}>Sí</button>
                                      <button onClick={() => setDeleteConfirmId(null)} style={{ padding: '0.1rem 0.3rem', background: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xs)', cursor: 'pointer', fontSize: '0.75rem' }}>No</button>
                                    </span>
                                  ) : (
                                    <span style={{ display: 'inline-flex', gap: '0.25rem' }}>
                                      <button onClick={() => { setEditingCliente(c); setClienteForm({ nombre: c.nombre, email: c.email, telefono: c.telefono, empresa: c.empresa, rubro: c.rubro, estado: c.estado as 'Activo' }); setShowModal('editCliente'); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '2px', display: 'flex', borderRadius: 'var(--radius-xs)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}><Icon icon="mdi:pencil" width={15} /></button>
                                      <button onClick={() => setDeleteConfirmId(c.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '2px', display: 'flex', borderRadius: 'var(--radius-xs)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#f44336'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}><Icon icon="mdi:trash-can" width={15} /></button>
                                    </span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {/* ── PRODUCTOS TAB ── */}
                {demoTab === 'productos' && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <div>
                        <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)' }}>Productos</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{productos.length} productos registrados</p>
                      </div>
                      <button onClick={() => { setProductoForm({ nombre: '', categoria: '', precio: 0, stock: 0, stockMin: 0, unidad: 'Unidad', proveedor: '' }); setEditingProducto(null); setShowModal('addProducto'); }} style={{ padding: '0.4rem 0.75rem', background: 'var(--accent)', color: '#000', border: 'none', borderRadius: 'var(--radius-xs)', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', fontFamily: "'Manrope', sans-serif", display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Icon icon="mdi:plus" width={14} /> Agregar Producto
                      </button>
                    </div>
                    <div style={{ position: 'relative', marginBottom: '1rem' }}>
                      <Icon icon="mdi:magnify" width={14} style={{ position: 'absolute', left: '0.6rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input type="text" placeholder="Buscar por nombre, categoría, proveedor..." value={productoSearch} onChange={(e) => setProductoSearch(e.target.value)} style={{ width: '100%', padding: '0.45rem 0.6rem 0.45rem 1.8rem', background: 'var(--surface-alt)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xs)', color: 'var(--text-main)', fontSize: '0.9rem', fontFamily: "'Manrope', sans-serif", outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid var(--border)' }}>
                            {['ID', 'Nombre', 'Categoría', 'Precio', 'Stock', 'Mín.', 'Unidad', 'Proveedor', 'Acc.'].map((h) => (
                              <th key={h} style={{ padding: '0.65rem 0.6rem', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {productos.filter(p => {
                            if (!productoSearch) return true;
                            const q = productoSearch.toLowerCase();
                            return p.nombre.toLowerCase().includes(q) || p.categoria.toLowerCase().includes(q) || p.proveedor.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
                          }).map((p) => (
                            <tr key={p.id} style={{ borderBottom: '1px solid var(--border)', background: p.stock < p.stockMin ? 'rgba(244,67,54,0.03)' : 'transparent' }}>
                              <td style={{ padding: '0.55rem 0.5rem', fontFamily: "'Syne', sans-serif", fontWeight: 600, color: 'var(--text-main)', fontSize: '0.88rem', whiteSpace: 'nowrap' }}>{p.id}</td>
                              <td style={{ padding: '0.55rem 0.5rem', color: 'var(--text-main)', fontSize: '0.85rem' }}>{p.nombre}</td>
                              <td style={{ padding: '0.55rem 0.5rem', color: 'var(--text-muted)', fontSize: '0.88rem' }}>{p.categoria}</td>
                              <td style={{ padding: '0.55rem 0.5rem', color: 'var(--text-main)', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>${p.precio.toFixed(2)}</td>
                              <td style={{ padding: '0.55rem 0.5rem', color: p.stock < p.stockMin ? '#f44336' : 'var(--text-muted)', textAlign: 'center', fontWeight: p.stock < p.stockMin ? 700 : 400 }}>{p.stock}</td>
                              <td style={{ padding: '0.55rem 0.5rem', color: 'var(--text-muted)', textAlign: 'center' }}>{p.stockMin}</td>
                              <td style={{ padding: '0.55rem 0.5rem', color: 'var(--text-muted)', fontSize: '0.88rem' }}>{p.unidad}</td>
                              <td style={{ padding: '0.55rem 0.5rem', color: 'var(--text-muted)', fontSize: '0.88rem' }}>{p.proveedor}</td>
                              <td style={{ padding: '0.55rem 0.5rem', whiteSpace: 'nowrap' }}>
                                {deleteConfirmId === p.id ? (
                                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.75rem' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>¿Eliminar?</span>
                                    <button onClick={() => { setProductos(prev => prev.filter(x => x.id !== p.id)); addActivity('ELIMINACIÓN', `Producto ${p.nombre} eliminado`); showDemoToast(`${p.nombre} eliminado`); setDeleteConfirmId(null); }} style={{ padding: '0.1rem 0.3rem', background: 'rgba(244,67,54,0.15)', color: '#f44336', border: 'none', borderRadius: 'var(--radius-xs)', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}>Sí</button>
                                    <button onClick={() => setDeleteConfirmId(null)} style={{ padding: '0.1rem 0.3rem', background: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xs)', cursor: 'pointer', fontSize: '0.75rem' }}>No</button>
                                  </span>
                                ) : (
                                  <span style={{ display: 'inline-flex', gap: '0.25rem' }}>
                                    <button onClick={() => { setEditingProducto(p); setProductoForm({ nombre: p.nombre, categoria: p.categoria, precio: p.precio, stock: p.stock, stockMin: p.stockMin, unidad: p.unidad, proveedor: p.proveedor }); setShowModal('editProducto'); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '2px', display: 'flex', borderRadius: 'var(--radius-xs)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}><Icon icon="mdi:pencil" width={15} /></button>
                                    <button onClick={() => setDeleteConfirmId(p.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '2px', display: 'flex', borderRadius: 'var(--radius-xs)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#f44336'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}><Icon icon="mdi:trash-can" width={15} /></button>
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {/* ── VENTAS TAB ── */}
                {demoTab === 'ventas' && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <div>
                        <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)' }}>Ventas</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{pedidos.length} pedidos registrados</p>
                      </div>
                      <button onClick={() => { setVentaForm({ clienteId: '', items: [{ productoId: '', cantidad: 1, precioUnitario: 0 }] }); setShowModal('addVenta'); }} style={{ padding: '0.4rem 0.75rem', background: 'var(--accent)', color: '#000', border: 'none', borderRadius: 'var(--radius-xs)', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', fontFamily: "'Manrope', sans-serif", display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Icon icon="mdi:plus" width={14} /> Nueva Venta
                      </button>
                    </div>
                    <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                      {['Todos', 'PENDIENTE', 'CONFIRMADO', 'ENVIADO', 'ENTREGADO', 'CANCELADO'].map((filter) => (
                        <button key={filter} onClick={() => setVentaFilter(filter)} style={{ padding: '0.3rem 0.6rem', borderRadius: 'var(--radius-xs)', fontSize: '0.85rem', fontWeight: 600, border: '1px solid', cursor: 'pointer', fontFamily: "'Manrope', sans-serif", borderColor: ventaFilter === filter ? 'var(--accent)' : 'var(--border)', background: ventaFilter === filter ? 'rgba(212,175,55,0.1)' : 'transparent', color: ventaFilter === filter ? 'var(--accent)' : 'var(--text-muted)', transition: 'all 0.2s' }}>{filter}</button>
                      ))}
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid var(--border)' }}>
                            {['Pedido', 'Cliente', 'Items', 'Total', 'Fecha', 'Estado', 'Acc.'].map((h) => (
                              <th key={h} style={{ padding: '0.65rem 0.6rem', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {pedidos.filter(o => ventaFilter === 'Todos' || o.estado === ventaFilter).map((o) => {
                            const estadoColors: Record<string, string> = { 'PENDIENTE': '#FF9800', 'CONFIRMADO': '#2196F3', 'ENVIADO': '#9C27B0', 'ENTREGADO': '#4CAF50', 'CANCELADO': '#f44336' };
                            return (
                              <tr key={o.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '0.55rem 0.5rem', fontFamily: "'Syne', sans-serif", fontWeight: 600, color: 'var(--text-main)', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>{o.id}</td>
                                <td style={{ padding: '0.55rem 0.5rem', color: 'var(--text-main)', fontSize: '0.85rem' }}>{o.clienteNombre}</td>
                                <td style={{ padding: '0.55rem 0.5rem', color: 'var(--text-muted)', textAlign: 'center' }}>{o.items.length}</td>
                                <td style={{ padding: '0.55rem 0.5rem', color: 'var(--text-main)', fontWeight: 600, whiteSpace: 'nowrap' }}>${o.total.toFixed(2)}</td>
                                <td style={{ padding: '0.55rem 0.5rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', fontSize: '0.88rem' }}>{o.fecha}</td>
                                <td style={{ padding: '0.55rem 0.5rem', whiteSpace: 'nowrap' }}>
                                  <span style={{ padding: '0.1rem 0.35rem', borderRadius: 'var(--radius-xs)', fontSize: '0.8rem', fontWeight: 600, color: estadoColors[o.estado], background: estadoColors[o.estado] + '15' }}>{o.estado}</span>
                                </td>
                                <td style={{ padding: '0.55rem 0.5rem', whiteSpace: 'nowrap' }}>
                                  {o.estado === 'PENDIENTE' && (
                                    <span style={{ display: 'inline-flex', gap: '0.2rem' }}>
                                      <button onClick={() => { setPedidos(prev => prev.map(x => x.id === o.id ? { ...x, estado: 'CONFIRMADO' as const } : x)); addActivity('VENTA', `Pedido ${o.id} confirmado — ${o.clienteNombre}`); showDemoToast(`${o.id} confirmado`); }} title="Confirmar" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2196F3', padding: '2px', display: 'flex', borderRadius: 'var(--radius-xs)' }}><Icon icon="mdi:check-circle" width={16} /></button>
                                      <button onClick={() => { setPedidos(prev => prev.map(x => x.id === o.id ? { ...x, estado: 'CANCELADO' as const } : x)); addActivity('VENTA', `Pedido ${o.id} cancelado — ${o.clienteNombre}`); showDemoToast(`${o.id} cancelado`); }} title="Cancelar" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f44336', padding: '2px', display: 'flex', borderRadius: 'var(--radius-xs)' }}><Icon icon="mdi:close-circle" width={16} /></button>
                                    </span>
                                  )}
                                  {o.estado === 'CONFIRMADO' && (
                                    <span style={{ display: 'inline-flex', gap: '0.2rem' }}>
                                      <button onClick={() => { setPedidos(prev => prev.map(x => x.id === o.id ? { ...x, estado: 'ENVIADO' as const } : x)); addActivity('VENTA', `Pedido ${o.id} enviado — ${o.clienteNombre}`); showDemoToast(`${o.id} enviado`); }} title="Enviar" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9C27B0', padding: '2px', display: 'flex', borderRadius: 'var(--radius-xs)' }}><Icon icon="mdi:truck-fast" width={16} /></button>
                                      <button onClick={() => { setPedidos(prev => prev.map(x => x.id === o.id ? { ...x, estado: 'CANCELADO' as const } : x)); addActivity('VENTA', `Pedido ${o.id} cancelado — ${o.clienteNombre}`); showDemoToast(`${o.id} cancelado`); }} title="Cancelar" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f44336', padding: '2px', display: 'flex', borderRadius: 'var(--radius-xs)' }}><Icon icon="mdi:close-circle" width={16} /></button>
                                    </span>
                                  )}
                                  {o.estado === 'ENVIADO' && (
                                    <span style={{ display: 'inline-flex', gap: '0.2rem' }}>
                                      <button onClick={() => { setPedidos(prev => prev.map(x => x.id === o.id ? { ...x, estado: 'ENTREGADO' as const } : x)); addActivity('VENTA', `Pedido ${o.id} entregado — ${o.clienteNombre}`); showDemoToast(`${o.id} entregado`); }} title="Entregado" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4CAF50', padding: '2px', display: 'flex', borderRadius: 'var(--radius-xs)' }}><Icon icon="mdi:check-all" width={16} /></button>
                                      <button onClick={() => { setPedidos(prev => prev.map(x => x.id === o.id ? { ...x, estado: 'CANCELADO' as const } : x)); addActivity('VENTA', `Pedido ${o.id} cancelado — ${o.clienteNombre}`); showDemoToast(`${o.id} cancelado`); }} title="Cancelar" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f44336', padding: '2px', display: 'flex', borderRadius: 'var(--radius-xs)' }}><Icon icon="mdi:close-circle" width={16} /></button>
                                    </span>
                                  )}
                                  {(o.estado === 'ENTREGADO' || o.estado === 'CANCELADO') && <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>—</span>}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {/* ── COMPRAS TAB ── */}
                {demoTab === 'compras' && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <div>
                        <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)' }}>Compras</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{ordenesCompra.length} órdenes de compra</p>
                      </div>
                      <button onClick={() => { setCompraForm({ proveedor: '', items: [{ productoId: '', cantidad: 1, precioUnitario: 0 }] }); setShowModal('addCompra'); }} style={{ padding: '0.4rem 0.75rem', background: 'var(--accent)', color: '#000', border: 'none', borderRadius: 'var(--radius-xs)', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', fontFamily: "'Manrope', sans-serif", display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Icon icon="mdi:plus" width={14} /> Nueva Orden
                      </button>
                    </div>
                    <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                      {['Todos', 'SOLICITADA', 'APROBADA', 'RECIBIDA', 'CANCELADA'].map((filter) => (
                        <button key={filter} onClick={() => setCompraFilter(filter)} style={{ padding: '0.3rem 0.6rem', borderRadius: 'var(--radius-xs)', fontSize: '0.85rem', fontWeight: 600, border: '1px solid', cursor: 'pointer', fontFamily: "'Manrope', sans-serif", borderColor: compraFilter === filter ? 'var(--accent)' : 'var(--border)', background: compraFilter === filter ? 'rgba(212,175,55,0.1)' : 'transparent', color: compraFilter === filter ? 'var(--accent)' : 'var(--text-muted)', transition: 'all 0.2s' }}>{filter}</button>
                      ))}
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid var(--border)' }}>
                            {['OC#', 'Proveedor', 'Items', 'Total', 'Fecha', 'Estado', 'Acc.'].map((h) => (
                              <th key={h} style={{ padding: '0.65rem 0.6rem', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {ordenesCompra.filter(o => compraFilter === 'Todos' || o.estado === compraFilter).map((o) => {
                            const estadoColors: Record<string, string> = { 'SOLICITADA': '#FF9800', 'APROBADA': '#2196F3', 'RECIBIDA': '#4CAF50', 'CANCELADA': '#f44336' };
                            return (
                              <tr key={o.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '0.55rem 0.5rem', fontFamily: "'Syne', sans-serif", fontWeight: 600, color: 'var(--text-main)', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>{o.id}</td>
                                <td style={{ padding: '0.55rem 0.5rem', color: 'var(--text-main)', fontSize: '0.85rem' }}>{o.proveedor}</td>
                                <td style={{ padding: '0.55rem 0.5rem', color: 'var(--text-muted)', textAlign: 'center' }}>{o.items.length}</td>
                                <td style={{ padding: '0.55rem 0.5rem', color: 'var(--text-main)', fontWeight: 600, whiteSpace: 'nowrap' }}>${o.total.toFixed(2)}</td>
                                <td style={{ padding: '0.55rem 0.5rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', fontSize: '0.88rem' }}>{o.fecha}</td>
                                <td style={{ padding: '0.55rem 0.5rem', whiteSpace: 'nowrap' }}>
                                  <span style={{ padding: '0.1rem 0.35rem', borderRadius: 'var(--radius-xs)', fontSize: '0.8rem', fontWeight: 600, color: estadoColors[o.estado], background: estadoColors[o.estado] + '15' }}>{o.estado}</span>
                                </td>
                                <td style={{ padding: '0.55rem 0.5rem', whiteSpace: 'nowrap' }}>
                                  {o.estado === 'SOLICITADA' && (
                                    <span style={{ display: 'inline-flex', gap: '0.2rem' }}>
                                      <button onClick={() => { setOrdenesCompra(prev => prev.map(x => x.id === o.id ? { ...x, estado: 'APROBADA' as const } : x)); addActivity('COMPRA', `OC ${o.id} aprobada — ${o.proveedor}`); showDemoToast(`${o.id} aprobada`); }} title="Aprobar" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2196F3', padding: '2px', display: 'flex', borderRadius: 'var(--radius-xs)' }}><Icon icon="mdi:check-circle" width={16} /></button>
                                      <button onClick={() => { setOrdenesCompra(prev => prev.map(x => x.id === o.id ? { ...x, estado: 'CANCELADA' as const } : x)); addActivity('COMPRA', `OC ${o.id} cancelada — ${o.proveedor}`); showDemoToast(`${o.id} cancelada`); }} title="Cancelar" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f44336', padding: '2px', display: 'flex', borderRadius: 'var(--radius-xs)' }}><Icon icon="mdi:close-circle" width={16} /></button>
                                    </span>
                                  )}
                                  {o.estado === 'APROBADA' && (
                                    <span style={{ display: 'inline-flex', gap: '0.2rem' }}>
                                      <button onClick={() => { setOrdenesCompra(prev => prev.map(x => x.id === o.id ? { ...x, estado: 'RECIBIDA' as const } : x)); addActivity('COMPRA', `OC ${o.id} recibida — ${o.proveedor}`); showDemoToast(`${o.id} recibida`); }} title="Recibir" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4CAF50', padding: '2px', display: 'flex', borderRadius: 'var(--radius-xs)' }}><Icon icon="mdi:package-variant-closed-check" width={16} /></button>
                                      <button onClick={() => { setOrdenesCompra(prev => prev.map(x => x.id === o.id ? { ...x, estado: 'CANCELADA' as const } : x)); addActivity('COMPRA', `OC ${o.id} cancelada — ${o.proveedor}`); showDemoToast(`${o.id} cancelada`); }} title="Cancelar" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f44336', padding: '2px', display: 'flex', borderRadius: 'var(--radius-xs)' }}><Icon icon="mdi:close-circle" width={16} /></button>
                                    </span>
                                  )}
                                  {(o.estado === 'RECIBIDA' || o.estado === 'CANCELADA') && <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>—</span>}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {/* ── ACTIVIDAD TAB ── */}
                {demoTab === 'actividad' && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <div>
                        <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)' }}>Registro de Actividad</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{activityLog.length} registros</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                      {['Todos', 'CLIENTE', 'PRODUCTO', 'VENTA', 'COMPRA', 'EDICIÓN', 'ELIMINACIÓN'].map((f) => (
                        <button key={f} onClick={() => setActivityFilter(f)} style={{ padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-xs)', fontSize: '0.8rem', fontWeight: 600, border: '1px solid', cursor: 'pointer', fontFamily: "'Manrope', sans-serif", borderColor: activityFilter === f ? 'var(--accent)' : 'var(--border)', background: activityFilter === f ? 'rgba(212,175,55,0.1)' : 'transparent', color: activityFilter === f ? 'var(--accent)' : 'var(--text-muted)', transition: 'all 0.2s' }}>{f}</button>
                      ))}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxHeight: '400px', overflowY: 'auto' }}>
                      {activityLog.filter(a => activityFilter === 'Todos' || a.tipo === activityFilter).map((a, i) => {
                        const tipoColors: Record<string, string> = { 'CLIENTE': '#4CAF50', 'PRODUCTO': '#2196F3', 'VENTA': '#D4AF37', 'COMPRA': '#9C27B0', 'EDICIÓN': '#FF9800', 'ELIMINACIÓN': '#f44336' };
                        const tipoIcons: Record<string, string> = { 'CLIENTE': 'mdi:account-plus', 'PRODUCTO': 'mdi:package-variant-closed', 'VENTA': 'mdi:cart-check', 'COMPRA': 'mdi:cart-arrow-down', 'EDICIÓN': 'mdi:pencil', 'ELIMINACIÓN': 'mdi:trash-can' };
                        const color = tipoColors[a.tipo] || '#9E9E9E';
                        const icon = tipoIcons[a.tipo] || 'mdi:information';
                        return (
                          <div key={i} style={{ display: 'flex', gap: '0.75rem', padding: '0.6rem', background: 'var(--surface-alt)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border)' }}>
                            <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <Icon icon={icon} width={15} style={{ color }} />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.15rem' }}>
                                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.detalle}</span>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', flexShrink: 0, marginLeft: '0.5rem' }}>{a.time}</span>
                              </div>
                              <div style={{ display: 'flex', gap: '0.6rem', fontSize: '0.8rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                                <span>Op: <b style={{ color: 'var(--text-main)' }}>{a.usuario}</b></span>
                                <span style={{ padding: '0.05rem 0.3rem', borderRadius: 'var(--radius-xs)', fontSize: '0.8rem', fontWeight: 600, color, background: color + '15' }}>{a.tipo}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              {/* ── MODALS ── */}
              {showModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }} onClick={() => setShowModal(null)}>
                  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', width: '90%', maxWidth: '420px', maxHeight: '85%', overflowY: 'auto', padding: '1.25rem' }} onClick={(e) => e.stopPropagation()}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                        {showModal === 'addCliente' ? 'Agregar Cliente' : showModal === 'editCliente' ? 'Editar Cliente' : showModal === 'addProducto' ? 'Agregar Producto' : showModal === 'editProducto' ? 'Editar Producto' : showModal === 'addVenta' ? 'Nueva Venta' : 'Nueva Orden de Compra'}
                      </h3>
                      <button onClick={() => setShowModal(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '2px', display: 'flex' }}><Icon icon="mdi:close" width={20} /></button>
                    </div>
                    {/* CLIENT MODAL */}
                    {(showModal === 'addCliente' || showModal === 'editCliente') && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        {[{ label: 'Nombre', field: 'nombre' as const }, { label: 'Email', field: 'email' as const }, { label: 'Teléfono', field: 'telefono' as const }, { label: 'Empresa', field: 'empresa' as const }, { label: 'Rubro', field: 'rubro' as const }].map(f => (
                          <div key={f.field}>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>{f.label}</label>
                            <input type="text" value={clienteForm[f.field]} onChange={(e) => setClienteForm(p => ({ ...p, [f.field]: e.target.value }))} style={{ width: '100%', padding: '0.65rem 1rem', background: 'var(--surface-alt)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xs)', color: 'var(--text-main)', fontSize: '0.95rem', fontFamily: "'Manrope', sans-serif", outline: 'none', boxSizing: 'border-box' }} />
                          </div>
                        ))}
                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Estado</label>
                          <select value={clienteForm.estado} onChange={(e) => setClienteForm(p => ({ ...p, estado: e.target.value as 'Activo' | 'Inactivo' }))} style={{ width: '100%', padding: '0.65rem 1rem', background: 'var(--surface-alt)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xs)', color: 'var(--text-main)', fontSize: '0.95rem', fontFamily: "'Manrope', sans-serif", outline: 'none', boxSizing: 'border-box' }}>
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                          </select>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                          <button onClick={() => setShowModal(null)} style={{ flex: 1, padding: '0.5rem', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-main)', borderRadius: 'var(--radius-xs)', fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer', fontFamily: "'Manrope', sans-serif" }}>Cancelar</button>
                          <button onClick={() => {
                            if (showModal === 'addCliente') {
                              const newId = generateId('CL', clientes);
                              const newCliente: Cliente = { id: newId, ...clienteForm };
                              setClientes(prev => [newCliente, ...prev]);
                              addActivity('CLIENTE', `Nuevo cliente: ${clienteForm.empresa} — ${clienteForm.nombre}`);
                              showDemoToast(`${clienteForm.empresa} registrado`);
                            } else if (showModal === 'editCliente' && editingCliente) {
                              setClientes(prev => prev.map(c => c.id === editingCliente.id ? { ...c, ...clienteForm } : c));
                              addActivity('EDICIÓN', `Cliente ${editingCliente.empresa} actualizado`);
                              showDemoToast(`${editingCliente.empresa} actualizado`);
                            }
                            setShowModal(null);
                          }} style={{ flex: 1, padding: '0.5rem', background: 'var(--accent)', color: '#000', border: 'none', borderRadius: 'var(--radius-xs)', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', fontFamily: "'Manrope', sans-serif" }}>Guardar</button>
                        </div>
                      </div>
                    )}
                    {/* PRODUCT MODAL */}
                    {(showModal === 'addProducto' || showModal === 'editProducto') && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        {[{ label: 'Nombre', field: 'nombre' as const, type: 'text' }, { label: 'Categoría', field: 'categoria' as const, type: 'text' }, { label: 'Unidad', field: 'unidad' as const, type: 'text' }, { label: 'Proveedor', field: 'proveedor' as const, type: 'text' }].map(f => (
                          <div key={f.field}>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>{f.label}</label>
                            <input type={f.type} value={productoForm[f.field]} onChange={(e) => setProductoForm(p => ({ ...p, [f.field]: e.target.value }))} style={{ width: '100%', padding: '0.65rem 1rem', background: 'var(--surface-alt)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xs)', color: 'var(--text-main)', fontSize: '0.95rem', fontFamily: "'Manrope', sans-serif", outline: 'none', boxSizing: 'border-box' }} />
                          </div>
                        ))}
                        {[{ label: 'Precio', field: 'precio' as const }, { label: 'Stock', field: 'stock' as const }, { label: 'Stock Mínimo', field: 'stockMin' as const }].map(f => (
                          <div key={f.field}>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>{f.label}</label>
                            <input type="number" value={productoForm[f.field]} onChange={(e) => setProductoForm(p => ({ ...p, [f.field]: Number(e.target.value) }))} style={{ width: '100%', padding: '0.65rem 1rem', background: 'var(--surface-alt)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xs)', color: 'var(--text-main)', fontSize: '0.95rem', fontFamily: "'Manrope', sans-serif", outline: 'none', boxSizing: 'border-box' }} />
                          </div>
                        ))}
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                          <button onClick={() => setShowModal(null)} style={{ flex: 1, padding: '0.5rem', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-main)', borderRadius: 'var(--radius-xs)', fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer', fontFamily: "'Manrope', sans-serif" }}>Cancelar</button>
                          <button onClick={() => {
                            if (showModal === 'addProducto') {
                              const newId = generateId('PRD', productos);
                              const newProducto: Producto = { id: newId, ...productoForm };
                              setProductos(prev => [newProducto, ...prev]);
                              addActivity('PRODUCTO', `Nuevo producto: ${productoForm.nombre}`);
                              showDemoToast(`${productoForm.nombre} agregado`);
                            } else if (showModal === 'editProducto' && editingProducto) {
                              setProductos(prev => prev.map(p => p.id === editingProducto.id ? { ...p, ...productoForm } : p));
                              addActivity('EDICIÓN', `Producto ${editingProducto.nombre} actualizado`);
                              showDemoToast(`${editingProducto.nombre} actualizado`);
                            }
                            setShowModal(null);
                          }} style={{ flex: 1, padding: '0.5rem', background: 'var(--accent)', color: '#000', border: 'none', borderRadius: 'var(--radius-xs)', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', fontFamily: "'Manrope', sans-serif" }}>Guardar</button>
                        </div>
                      </div>
                    )}
                    {/* NEW SALE MODAL */}
                    {showModal === 'addVenta' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Cliente</label>
                          <select value={ventaForm.clienteId} onChange={(e) => setVentaForm(p => ({ ...p, clienteId: e.target.value }))} style={{ width: '100%', padding: '0.65rem 1rem', background: 'var(--surface-alt)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xs)', color: 'var(--text-main)', fontSize: '0.95rem', fontFamily: "'Manrope', sans-serif", outline: 'none', boxSizing: 'border-box' }}>
                            <option value="">Seleccionar cliente...</option>
                            {clientes.filter(c => c.estado === 'Activo').map(c => <option key={c.id} value={c.id}>{c.empresa}</option>)}
                          </select>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Líneas de Venta</label>
                          {ventaForm.items.map((li, idx) => (
                            <div key={idx} style={{ display: 'flex', gap: '0.3rem', marginBottom: '0.3rem', alignItems: 'center' }}>
                              <select value={li.productoId} onChange={(e) => { const updated = [...ventaForm.items]; const prod = productos.find(p => p.id === e.target.value); updated[idx] = { ...updated[idx], productoId: e.target.value, precioUnitario: prod ? prod.precio : 0 }; setVentaForm(p => ({ ...p, items: updated })); }} style={{ flex: 2, padding: '0.4rem 0.5rem', background: 'var(--surface-alt)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xs)', color: 'var(--text-main)', fontSize: '0.85rem', fontFamily: "'Manrope', sans-serif", outline: 'none' }}>
                                <option value="">Producto...</option>
                                {productos.map(p => <option key={p.id} value={p.id}>{p.nombre} (${p.precio})</option>)}
                              </select>
                              <input type="number" placeholder="Cant" min={1} value={li.cantidad || ''} onChange={(e) => { const updated = [...ventaForm.items]; updated[idx] = { ...updated[idx], cantidad: Math.max(1, Number(e.target.value)) }; setVentaForm(p => ({ ...p, items: updated })); }} style={{ width: '55px', padding: '0.4rem', background: 'var(--surface-alt)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xs)', color: 'var(--text-main)', fontSize: '0.85rem', fontFamily: "'Manrope', sans-serif", outline: 'none', textAlign: 'center' }} />
                              <input type="number" placeholder="$" value={li.precioUnitario || ''} onChange={(e) => { const updated = [...ventaForm.items]; updated[idx] = { ...updated[idx], precioUnitario: Number(e.target.value) }; setVentaForm(p => ({ ...p, items: updated })); }} style={{ width: '65px', padding: '0.4rem', background: 'var(--surface-alt)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xs)', color: 'var(--text-main)', fontSize: '0.85rem', fontFamily: "'Manrope', sans-serif", outline: 'none', textAlign: 'center' }} />
                              {ventaForm.items.length > 1 && <button onClick={() => { const updated = ventaForm.items.filter((_, i) => i !== idx); setVentaForm(p => ({ ...p, items: updated })); }} style={{ background: 'none', border: 'none', color: '#f44336', cursor: 'pointer', padding: '2px', display: 'flex' }}><Icon icon="mdi:close" width={14} /></button>}
                            </div>
                          ))}
                          <button onClick={() => setVentaForm(p => ({ ...p, items: [...p.items, { productoId: '', cantidad: 1, precioUnitario: 0 }] }))} style={{ padding: '0.25rem 0.5rem', background: 'transparent', border: '1px dashed var(--border)', color: 'var(--text-muted)', borderRadius: 'var(--radius-xs)', fontSize: '0.85rem', cursor: 'pointer', fontFamily: "'Manrope', sans-serif", display: 'flex', alignItems: 'center', gap: '0.2rem' }}><Icon icon="mdi:plus" width={12} /> Agregar línea</button>
                        </div>
                        <div style={{ padding: '0.5rem', background: 'var(--surface-alt)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border)', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                          Total: <b style={{ color: 'var(--text-main)' }}>${ventaForm.items.reduce((s, l) => s + (l.cantidad * l.precioUnitario), 0).toFixed(2)}</b> — {ventaForm.items.filter(l => l.productoId).length} items
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                          <button onClick={() => setShowModal(null)} style={{ flex: 1, padding: '0.5rem', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-main)', borderRadius: 'var(--radius-xs)', fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer', fontFamily: "'Manrope', sans-serif" }}>Cancelar</button>
                          <button onClick={() => {
                            if (!ventaForm.clienteId || !ventaForm.items.some(l => l.productoId)) return;
                            const cl = clientes.find(c => c.id === ventaForm.clienteId);
                            const validItems = ventaForm.items.filter(l => l.productoId).map(l => {
                              const prod = productos.find(p => p.id === l.productoId);
                              return { producto: prod ? prod.nombre : '', cantidad: l.cantidad, precioUnitario: l.precioUnitario, subtotal: l.cantidad * l.precioUnitario };
                            });
                            const total = validItems.reduce((s, l) => s + l.subtotal, 0);
                            const newId = generateId('V', pedidos);
                            const today = new Date().toISOString().split('T')[0];
                            const newPedido: Pedido = { id: newId, clienteId: ventaForm.clienteId, clienteNombre: cl ? cl.empresa : '', items: validItems, total, estado: 'PENDIENTE', fecha: today };
                            setPedidos(prev => [newPedido, ...prev]);
                            addActivity('VENTA', `Venta ${newId} creada — ${cl?.empresa} ($${total.toFixed(2)})`);
                            showDemoToast(`Venta ${newId} creada`);
                            setShowModal(null);
                          }} style={{ flex: 1, padding: '0.5rem', background: 'var(--accent)', color: '#000', border: 'none', borderRadius: 'var(--radius-xs)', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', fontFamily: "'Manrope', sans-serif" }}>Crear Venta</button>
                        </div>
                      </div>
                    )}
                    {/* NEW PURCHASE ORDER MODAL */}
                    {showModal === 'addCompra' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Proveedor</label>
                          <select value={compraForm.proveedor} onChange={(e) => setCompraForm(p => ({ ...p, proveedor: e.target.value }))} style={{ width: '100%', padding: '0.65rem 1rem', background: 'var(--surface-alt)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xs)', color: 'var(--text-main)', fontSize: '0.95rem', fontFamily: "'Manrope', sans-serif", outline: 'none', boxSizing: 'border-box' }}>
                            <option value="">Seleccionar proveedor...</option>
                            {[...new Set(productos.map(p => p.proveedor))].map(pr => <option key={pr} value={pr}>{pr}</option>)}
                          </select>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Líneas de Compra</label>
                          {compraForm.items.map((li, idx) => (
                            <div key={idx} style={{ display: 'flex', gap: '0.3rem', marginBottom: '0.3rem', alignItems: 'center' }}>
                              <select value={li.productoId} onChange={(e) => { const updated = [...compraForm.items]; updated[idx] = { ...updated[idx], productoId: e.target.value }; setCompraForm(p => ({ ...p, items: updated })); }} style={{ flex: 2, padding: '0.4rem 0.5rem', background: 'var(--surface-alt)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xs)', color: 'var(--text-main)', fontSize: '0.85rem', fontFamily: "'Manrope', sans-serif", outline: 'none' }}>
                                <option value="">Producto...</option>
                                {productos.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
                              </select>
                              <input type="number" placeholder="Cant" min={1} value={li.cantidad || ''} onChange={(e) => { const updated = [...compraForm.items]; updated[idx] = { ...updated[idx], cantidad: Math.max(1, Number(e.target.value)) }; setCompraForm(p => ({ ...p, items: updated })); }} style={{ width: '55px', padding: '0.4rem', background: 'var(--surface-alt)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xs)', color: 'var(--text-main)', fontSize: '0.85rem', fontFamily: "'Manrope', sans-serif", outline: 'none', textAlign: 'center' }} />
                              <input type="number" placeholder="$" value={li.precioUnitario || ''} onChange={(e) => { const updated = [...compraForm.items]; updated[idx] = { ...updated[idx], precioUnitario: Number(e.target.value) }; setCompraForm(p => ({ ...p, items: updated })); }} style={{ width: '65px', padding: '0.4rem', background: 'var(--surface-alt)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xs)', color: 'var(--text-main)', fontSize: '0.85rem', fontFamily: "'Manrope', sans-serif", outline: 'none', textAlign: 'center' }} />
                              {compraForm.items.length > 1 && <button onClick={() => { const updated = compraForm.items.filter((_, i) => i !== idx); setCompraForm(p => ({ ...p, items: updated })); }} style={{ background: 'none', border: 'none', color: '#f44336', cursor: 'pointer', padding: '2px', display: 'flex' }}><Icon icon="mdi:close" width={14} /></button>}
                            </div>
                          ))}
                          <button onClick={() => setCompraForm(p => ({ ...p, items: [...p.items, { productoId: '', cantidad: 1, precioUnitario: 0 }] }))} style={{ padding: '0.25rem 0.5rem', background: 'transparent', border: '1px dashed var(--border)', color: 'var(--text-muted)', borderRadius: 'var(--radius-xs)', fontSize: '0.85rem', cursor: 'pointer', fontFamily: "'Manrope', sans-serif", display: 'flex', alignItems: 'center', gap: '0.2rem' }}><Icon icon="mdi:plus" width={12} /> Agregar línea</button>
                        </div>
                        <div style={{ padding: '0.5rem', background: 'var(--surface-alt)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border)', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                          Total: <b style={{ color: 'var(--text-main)' }}>${compraForm.items.reduce((s, l) => s + (l.cantidad * l.precioUnitario), 0).toFixed(2)}</b> — {compraForm.items.filter(l => l.productoId).length} items
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                          <button onClick={() => setShowModal(null)} style={{ flex: 1, padding: '0.5rem', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-main)', borderRadius: 'var(--radius-xs)', fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer', fontFamily: "'Manrope', sans-serif" }}>Cancelar</button>
                          <button onClick={() => {
                            if (!compraForm.proveedor || !compraForm.items.some(l => l.productoId)) return;
                            const validItems = compraForm.items.filter(l => l.productoId).map(l => {
                              const prod = productos.find(p => p.id === l.productoId);
                              return { producto: prod ? prod.nombre : '', cantidad: l.cantidad, precioUnitario: l.precioUnitario, subtotal: l.cantidad * l.precioUnitario };
                            });
                            const total = validItems.reduce((s, l) => s + l.subtotal, 0);
                            const newId = generateId('OC', ordenesCompra);
                            const today = new Date().toISOString().split('T')[0];
                            const newOC: OrdenCompra = { id: newId, proveedor: compraForm.proveedor, items: validItems, total, estado: 'SOLICITADA', fecha: today };
                            setOrdenesCompra(prev => [newOC, ...prev]);
                            addActivity('COMPRA', `OC ${newId} creada — ${compraForm.proveedor} ($${total.toFixed(2)})`);
                            showDemoToast(`OC ${newId} creada`);
                            setShowModal(null);
                          }} style={{ flex: 1, padding: '0.5rem', background: 'var(--accent)', color: '#000', border: 'none', borderRadius: 'var(--radius-xs)', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', fontFamily: "'Manrope', sans-serif" }}>Crear OC</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {/* ── DEMO TOAST ── */}
              {demoToast && (
                <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', background: 'var(--accent)', color: '#000', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-xs)', fontSize: '0.9rem', fontWeight: 600, fontFamily: "'Manrope', sans-serif", boxShadow: '0 4px 12px rgba(0,0,0,0.3)', zIndex: 10001, display: 'flex', alignItems: 'center', gap: '0.4rem', animation: 'fadeIn 0.3s ease' }}>
                  <Icon icon="mdi:check-circle" width={16} />
                  {demoToast}
                </div>
              )}
          </div>

          {/* ── Description below the demo (natural page flow, no scroll) ── */}
          <div style={{ padding: '4rem 2rem', borderTop: '1px solid var(--border)' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              {/* Intro */}
              <div style={{ marginBottom: '2.5rem' }}>
                <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Software a Medida</p>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>Sistema de Gestión Empresarial Integral</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.8 }}>Plataforma 100% personalizable, diseñada en Next.js con React 19, que se adapta a la operativa de cualquier empresa. Desde inventario y clientes hasta pedidos y órdenes de compra, todo funciona en tiempo real, desde cualquier dispositivo.</p>
              </div>
              {/* Caso de Éxito */}
              <div style={{ padding: '1.5rem', background: 'var(--surface-alt)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                  <Icon icon="mdi:checkbox-marked-circle" width={20} style={{ color: 'var(--accent)' }} />
                  <div>
                    <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: '1rem', color: 'var(--text-main)' }}>Caso de Éxito: Centro Logístico Frimaral V2</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Plataforma productiva en uso real — <a href="https://planilladecarga.github.io/centrologisticofrimaralV2/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>Ver demo en vivo →</a></p>
                  </div>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '0.5rem' }}>Sistema completo de gestión logística con inventario por contenedores, escáner de barras, pedidos con reserva de stock, despachos con lectura de PDFs, monitoreo de temperatura, auth por roles, exportación Excel y PWA offline. La misma arquitectura se adapta a cualquier rubro: distribuidoras, tiendas, talleres, etc.</p>
              </div>
              {/* Personalización */}
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Icon icon="mdi:tune-vertical" width={18} style={{ color: 'var(--accent)' }} /> ¿Qué se puede personalizar?
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                  {[
                    { icon: 'mdi:domain', title: 'Identidad de Marca', desc: 'Logo, colores, tipografía y nombre del sistema adaptados a tu empresa.' },
                    { icon: 'mdi:shape', title: 'Módulos a Medida', desc: 'Inventario, ventas, compras, producción, finanzas, RRHH, logística, facturación, etc.' },
                    { icon: 'mdi:tag-multiple', title: 'Catálogo de Productos', desc: 'Categorías, unidades, campos personalizados y jerarquías según tu negocio.' },
                    { icon: 'mdi:account-supervisor', title: 'Roles y Permisos', desc: 'Admin, Operador, Ventas, Solo Lectura — cada usuario ve solo lo suyo.' },
                    { icon: 'mdi:file-chart', title: 'Reportes y Exportación', desc: 'Excel y PDF con estilo corporativo. Dashboards con KPIs en tiempo real.' },
                    { icon: 'mdi:barcode-scan', title: 'Escáner y Captura', desc: 'Códigos de barras/QR por cámara, lectura de PDFs, fotos y documentos adjuntos.' },
                    { icon: 'mdi:bell-ring', title: 'Alertas y Notificaciones', desc: 'Stock bajo, pedidos vencidos, tareas pendientes. Configurables por email o push.' },
                    { icon: 'mdi:swap-horizontal', title: 'Flujos de Trabajo', desc: 'Circuitos de estados personalizables: pedidos, despachos, presupuestos, etc.' },
                  ].map((item) => (
                    <div key={item.title} style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem', background: 'var(--surface-alt)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                      <Icon icon={item.icon} width={16} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <p style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.15rem' }}>{item.title}</p>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Stack */}
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Icon icon="mdi:layers-triple" width={18} style={{ color: 'var(--accent)' }} /> Stack Tecnológico
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                  {[
                    { icon: 'simple-icons:nextdotjs', label: 'Next.js 15' },
                    { icon: 'simple-icons:react', label: 'React 19' },
                    { icon: 'simple-icons:typescript', label: 'TypeScript' },
                    { icon: 'simple-icons:tailwindcss', label: 'Tailwind CSS 4' },
                    { icon: 'simple-icons:firebase', label: 'Firebase' },
                    { icon: 'simple-icons:githubactions', label: 'GitHub Actions' },
                    { icon: 'simple-icons:motion', label: 'Framer Motion' },
                    { icon: 'mdi:cellphone-check', label: 'PWA Ready' },
                  ].map((tech) => (
                    <div key={tech.label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 0.6rem', background: 'var(--surface-alt)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border)' }}>
                      <Icon icon={tech.icon} width={16} style={{ color: 'var(--accent)' }} />
                      <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)' }}>{tech.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Valor */}
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Icon icon="mdi:rocket-launch" width={18} style={{ color: 'var(--accent)' }} /> ¿Qué valor genera?
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                  {[
                    { icon: 'mdi:clock-fast', title: 'Ahorro de Tiempo', desc: 'Automatizá procesos manuales. Lo que tomaba 30 minutos ahora toma 30 segundos.' },
                    { icon: 'mdi:shield-check', title: 'Cero Errores', desc: 'Validaciones automáticas y flujos controlados evitan errores costosos.' },
                    { icon: 'mdi:chart-timeline-variant-shimmer', title: 'Datos en Vivo', desc: 'Dashboards, reportes exportables y métricas clave al instante.' },
                    { icon: 'mdi:devices', title: 'Multi-Device', desc: 'PC, tablet y celular. Sin instalar nada, funciona desde cualquier lugar.' },
                    { icon: 'mdi:puzzle', title: 'Escalable', desc: 'Empezá con lo que necesitás hoy y agregá módulos sin rewrits.' },
                    { icon: 'mdi:cash-multiple', title: 'ROI Inmediato', desc: 'Costo único, sin licencias mensuales. Se justifica en el primer mes.' },
                  ].map((item) => (
                    <div key={item.title} style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem', background: 'var(--surface)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                      <Icon icon={item.icon} width={16} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.15rem' }}>{item.title}</p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* CTA */}
              <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--surface-alt)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>¿Tu empresa necesita un sistema así?</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>Contanos tu operación y te diseñamos una propuesta a medida. Software real que funciona desde el día uno.</p>
                <a href="#contacto" className="btn-primary" onClick={(e) => { e.preventDefault(); setDemoExpanded(false); setTimeout(() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' }), 200); }} style={{ display: 'inline-flex', fontSize: '0.95rem', padding: '0.75rem 1.5rem' }}>
                  Solicitar Propuesta <Icon icon="mdi:arrow-right" width={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          PROCESS SECTION
      ════════════════════════════════════════════════════════════════ */}
      <section id="proceso" className="section-padding" style={{ padding: '6rem 0', background: 'var(--surface-alt)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
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
      <section id="precios" className="section-padding" style={{ padding: '6rem 0', maxWidth: '1280px', margin: '0 auto' }}>
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
          <div className="pricing-card reveal reveal-delay-1" style={{ boxShadow: 'var(--card-shadow)', borderRadius: 'var(--radius)' }}>
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
          <div className="pricing-card featured reveal reveal-delay-2" style={{ boxShadow: 'var(--card-shadow)', borderRadius: 'var(--radius)' }}>
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
          <div className="pricing-card reveal reveal-delay-3" style={{ boxShadow: 'var(--card-shadow)', borderRadius: 'var(--radius)' }}>
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
      <section id="testimonios" className="section-padding" style={{ padding: '6rem 0', background: 'var(--surface-alt)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
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
              <div key={t.name} className={`testimonial-card reveal reveal-delay-${idx + 1}`} style={{ boxShadow: 'var(--card-shadow)', borderRadius: 'var(--radius)' }}>
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
      <section id="contacto" className="section-padding" style={{ padding: '6rem 0', maxWidth: '1280px', margin: '0 auto' }}>
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
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-main)',
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border-color 0.3s',
                }}
                onFocus={(e) => { e.currentTarget.style.boxShadow = '0 0 0 3px var(--accent-dim)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
                onBlur={(e) => { e.currentTarget.style.boxShadow = 'transparent'; e.currentTarget.style.borderColor = 'var(--border)'; }}
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
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-main)',
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border-color 0.3s',
                }}
                onFocus={(e) => { e.currentTarget.style.boxShadow = '0 0 0 3px var(--accent-dim)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
                onBlur={(e) => { e.currentTarget.style.boxShadow = 'transparent'; e.currentTarget.style.borderColor = 'var(--border)'; }}
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
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-muted)',
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border-color 0.3s',
                  appearance: 'none',
                  cursor: 'pointer',
                }}
                onFocus={(e) => { e.currentTarget.style.boxShadow = '0 0 0 3px var(--accent-dim)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
                onBlur={(e) => { e.currentTarget.style.boxShadow = 'transparent'; e.currentTarget.style.borderColor = 'var(--border)'; }}
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
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-main)',
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '0.95rem',
                  outline: 'none',
                  resize: 'vertical',
                  transition: 'border-color 0.3s',
                }}
                onFocus={(e) => { e.currentTarget.style.boxShadow = '0 0 0 3px var(--accent-dim)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
                onBlur={(e) => { e.currentTarget.style.boxShadow = 'transparent'; e.currentTarget.style.borderColor = 'var(--border)'; }}
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
          padding: '6rem 0',
          textAlign: 'center',
          background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
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
          padding: '5rem 0 2rem',
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
