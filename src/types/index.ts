export interface Cluster {
  id: string;
  name: string;
  type: 'new' | 'completed';
  bhk: string;
  status: 'Ongoing' | 'Ready to Move' | 'Delivered';
  rera: string;
  reraUrl: string | null;
  qrImage?: string;
  price: string;
  area: string;
  possession: string;
  floors: string;
  units: string;
  description: string;
  highlights: string[];
  image: string;
  heroImage: string;
  faqs?: { question: string; answer: string }[];
  searchKeywords?: string[];
  coordinates?: { lat: number; lng: number };
}

export interface BlogPost {
  slug: string;
  category: string;
  project: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  coverImage: string;
  content: string;
  relatedCluster?: string;
}

export interface BlogCategory {
  id: string;
  name: string;
}

export interface NavItem {
  name: string;
  href: string;
}
