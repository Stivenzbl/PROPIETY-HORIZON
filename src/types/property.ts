/**
 * PROPRIETY-HORIZON - Tipos Core
 * Modelos de datos para la plataforma de propiedad horizontal
 * Arquetecto: Pattern Domain-Driven Design (DDD)
 */

// === ENUMS === //

export type PropertyStatus = 'occupied' | 'vacant' | 'maintenance' | 'renovated' | 'sold';
export type PropertyType = 'residential' | 'commercial' | 'mixed';
export type BuildingCategory = 'apartment' | 'condo' | 'townhouse' | 'penthouse' | 'office' | 'land';

// === ENTIDADES PRINCIPALES === //

export interface Property {
  id: string;
  name: string;
  address: string;
  lot: number;
  unit?: number;
  price?: number;
  pricePerSqft?: number;
  bedrooms: number;
  bathrooms: number;
  areaTotal: number;       // m²
  areaConstruida: number;  // m² construida
  constructionYear: number | null;
  buildingFloors: number;
  condominiumFee: number;   // mensual
  type: PropertyType;
  category: BuildingCategory;
  features?: string[];
  amenities?: string[];
  status: PropertyStatus;
  imageUrl?: string;
  gallery?: string[];
  ownerName?: string;
  contactPhone?: string;
  contactEmail?: string;
  isFeatured?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Building {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  totalFloors: number;
  unitsAvailable?: number;
  facilities: BuildingFacility[];
  securityFeatures: string[];
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BuildingFacility {
  name: string;
  type: 'community' | 'commercial' | 'recreational';
}

// === FORMS === //

export type PropertyFormData = Omit<Property, 'id' | 'createdAt' | 'updatedAt'>;

// === CONTEXT TYPES === //

export interface PropertyContextValue {
  properties: Property[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  selectedCategory?: string;
  sortMode: 'newest' | 'oldest' | 'price_asc' | 'price_desc';
  totalPages: number;
  currentPage: number;
  addProperty: (property: Property) => void;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  searchProperties: (query?: string) => void;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export interface BuildingContextValue {
  buildings: Building[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  sortMode: 'newest' | 'oldest';
  addBuilding: (building: Building) => void;
  updateBuilding: (id: string, updates: Partial<Building>) => void;
  deleteBuilding: (id: string) => void;
  searchBuildings: (query?: string) => void;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export interface ToastContextValue {
  addToast: (message: string, type?: 'success' | 'error' | 'warning' | 'info') => void;
  toast: { message?: string; type?: 'success' | 'error' | 'warning' | 'info'; autoDismiss?: number } | null;
}

export interface ModalContextValue {
  showModal: (config: ModalConfig) => void;
  closeModal: (id?: string) => void;
  modal: ModalConfig | null;
}

// === UTILITIES === //

export const generateId = (): string => Math.random().toString(36).substring(2, 9);

export const formatDate = (date: Date | null): string => {
  if (!date) return '-';
  return date.toLocaleDateString('es-MX', { year: 'numeric', month: 'short', day: '2-digit' });
};

export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(value);

export const getRelativeAge = (date: Date | null): string => {
  if (!date) return 'Desconocido';
  const now = new Date();
  const daysDiff = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
  const dateObj = date as Date;
  if (daysDiff < 1) return 'Hoy';
  if (daysDiff < 7) return `${Math.floor(daysDiff)} días atrás`;
  if (daysDiff < 30) return `${Math.floor(daysDiff / 7)} semanas atrás`;
  if (daysDiff < 365) return `${Math.floor(daysDiff / 30)} meses atrás`;
  return dateObj.toLocaleDateString('es-MX', { year: 'numeric' });
};

export const getStatusBadge = (status: PropertyStatus): { emoji: string; label: string } => {
  const badges: Record<PropertyStatus, { emoji: string; label: string }> = {
    occupied: { emoji: '🏠', label: 'Ocupado' },
    vacant: { emoji: '🔑', label: 'Disponible' },
    maintenance: { emoji: '🛠️', label: 'Mantenimiento' },
    renovated: { emoji: '✨', label: 'Renovado' },
    sold: { emoji: '💰', label: 'Vendido' },
  };
  return badges[status];
};

export const STATUS_COLORS = {
  occupied: '#10b981',
  vacant: '#3b82f6',
  maintenance: '#f59e0b',
  renovated: '#8b5cf6',
  sold: '#ef4444',
};

// === PAGINATION === //

export interface PaginatedList<T> {
  items: T[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
}

// === VALIDATION SCHEMA === //

export const propertySchema = {
  required: ['name', 'address', 'lot', 'bedrooms', 'bathrooms', 'areaTotal', 'buildingFloors'],
  validation: {
    areaTotal: (value: number) => value > 10 || 'Área mínima de 10m²',
    condominiumFee: (value: number) => value > 0 || 'La cuota debe ser mayor a 0',
  },
};
