import PortfolioClient from './PortfolioClient';

const projects: Record<string, { slug: string }> = {
  ecommerce: { slug: 'ecommerce' },
  'fitness-app': { slug: 'fitness-app' },
  'boda-romantica': { slug: 'boda-romantica' },
  'spot-publicitario': { slug: 'spot-publicitario' },
  'cafe-artesanal': { slug: 'cafe-artesanal' },
  'fashion-editorial': { slug: 'fashion-editorial' },
  'tarjetas-virtuales': { slug: 'tarjetas-virtuales' },
  'cuidar-contigo': { slug: 'cuidar-contigo' },
  'frimaral-logistica': { slug: 'frimaral-logistica' },
  'invitacion-virtual': { slug: 'invitacion-virtual' },
};

export function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }));
}

export default function PortfolioPage({ params }: { params: Promise<{ slug: string }> }) {
  return <PortfolioClient slug={params.slug} />;
}
