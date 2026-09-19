/**
 * AUTH TYPES
 * Modelos para autenticación JWT + OAuth + Session Management
 */

// === USERS === //

export type AuthProvider = 'local' | 'google' | 'github' | 'mail';

export interface TokenResponse {
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
}

export interface UserToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;   // segundos
  scope: string;
}

/**
 * Interfaz base de usuario - aplicable a cualquier tipo de account
 */
export interface UserBase {
  id: string;
  email?: string;
  phoneNumber?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Usuario local (login con email/password)
 * Características completas de la plataforma
 */
export interface LocalUser extends UserBase {
  firstName: string;
  lastName: string;
  role: 'admin' | 'manager' | 'agent' | 'owner';
  permissions: string[];
  isActive?: boolean;
}

/**
 * Guest user - visitantes del sitio sin autenticación
 */
export interface GuestUser extends UserBase {
  sessionId: string;
  source: 'landing_page' | 'landing_page_breadcrumb' | 'login_fallback';
}

/**
 * Owner (Propietario de propiedades)
 */
export interface OwnerUser extends UserBase {
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  totalProperties?: number;
}

/**
 * Agente inmobiliario
 */
export interface AgentUser extends UserBase {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  licenseNumber?: string; // número de licencia inmobiliaria
  activeListings?: number;
  profileComplete?: boolean;
}

/**
 * Manager (administrador del sistema)
 */
export interface ManagerUser extends UserBase {
  email: string;
  role: 'manager';
  managedBuildings: string[]; // IDs de edificios gestionados
  permissions: string[];
}

// === AUTHENTICATION CONTEXT === //

export interface AuthContextValue {
  user: LocalUser | OwnerUser | AgentUser | GuestUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  hasPermission: (permission: string) => boolean;
  isOwner: () => boolean;
  isAgent: () => boolean;
  isLoggedIn: () => boolean;
  isLogIn: () => boolean;
  login?: (user: UserBase, provider?: AuthProvider) => Promise<void> | void;
  logout?: () => void;
}

// === TOKENS & SESSION === //

export interface JWTPayload {
  sub: string | number;
  email?: string;
  role?: 'admin' | 'manager' | 'agent' | 'owner';
  permissions?: string[];
}

export const getRemainingTokens = (tokenResponse: TokenResponse): number => {
  return Math.max(0, tokenResponse.expires_in - Math.floor((Date.now() + tokenResponse.expires_in * 1000) / 1000));
};
