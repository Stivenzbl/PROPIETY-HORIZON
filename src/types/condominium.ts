import { z } from "zod";

/**
 * Tipos y validaciones para la entidad CONDOMINIO
 * Define toda la estructura de datos del sistema de propiedad horizontal.
 */

// === ENUMERACIONES ===

const CondominiumTypeEnum = z.enum([
  "Residencial",
  "Mixto",
  "Oficinas",
  "Comercial",
  "Industria",
  "Hotelero",
]);

export type CondominiumType = z.infer<typeof CondominiumTypeEnum>;

const UnitTypeEnum = z.enum(["Común", "Exclusivo"]);

export type UnitType = z.infer<typeof UnitTypeEnum>;

const PropertyTypeEnum = z.enum([
  "Residencial",
  "Negocio (Comercial)",
  "Oficinas",
]);

export type PropertyType = z.infer<typeof PropertyTypeEnum>;

const PaymentStatusEnum = z.enum(["Pendiente", "Pagado", "En curso"]);

export type PaymentStatus = z.infer<typeof PaymentStatusEnum>;

// === INTERFACES TIPOSCRIP ===

interface ICondominiumBase {
  id: string;
  name: string;
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    canton?: string;
    state?: string;
    country: string;
    zipCode: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  propertyTypeName: PropertyTypeEnum;
  unitType: UnitType;
  building?: string;
  created_at: Date;
  updated_at: Date;
}

interface IUnit {
  id: string;
  condominiumId: string;
  unitNumber: string;
  unitType: UnitType;
  areaTotal: number; // en m²
  areaConstructed: number; // en m²
  roomCount?: number;
  bathroomCount?: number;
  propertyTypeName?: PropertyTypeEnum;
  isAssigned?: boolean; // ¿Tiene asignado un vecino?
  status?: "Vacante" | "Ocupada" | "Venta" | "Prestada";
  created_at: Date;
}

interface INeighbor {
  id: string;
  name: string;
  dni: string;
  phone: string;
  email: string;
  unitId: string;
  unitType: UnitType; // si la unidad es exclusiva se registra aquí el vecino
  created_at: Date;
}

interface ICobranza {
  id: string;
  condominiumId: string;
  neighborId: string;
  propertyTypeName: PropertyTypeEnum;
  unitId: string | null; // null si unidad común, tiene referencia a unidad exclusiva si NO es unidad común
  unitNumber: string;
  period: string; // ej: "enero-2025" or year/month, ej, "2025"
  amount: number;
  status: PaymentStatus;
  dueDate: Date;
  paid_at?: Date;
  created_at: Date;
}

interface ITarifa {
  id: string;
  condominiumId: string;
  name: string; // ej: "Tarifa Mantenimiento Común", "Tarifa Seguridad", etc.
  ratePerArea: number; // en CUC /m² (tasa del m²)
  amountBase?: number; // monto base independiente del área (ej: tarifa por unidad común)
  description?: string;
  isActive: boolean;
}

interface IMantenimiento {
  id: string;
  condominiumId: string;
  unitId: string | null; // null si es unidad común, tiene referencia a unidad exclusiva si NO es unidad común
  name: string;
  description: string;
  amountTotal: number;
  isAssigned: boolean; // ¿Tiene asignado un vecino?
  status?: "Pendiente" | "En curso" | "Finalizado";
  created_at: Date;
}

interface IFinancialRecord {
  id: string;
  condominiumId: string;
  description: string;
  amount: number;
  type: "Ingreso" | "Egreso" | "Transferencia" | "Pago";
  reference?: string; // número de referencia del documento de ingreso/egreso
  date: Date;
}

interface IAdministrativeExpense {
  id: string;
  condominiumId: string;
  description: string;
  amount: number;
  category: "Seguridad" | "Limpieza" | "Patio" | "Jardín" | "Servicios Públicos";
  periodStart: Date;
  periodEnd?: Date;
  paidAt?: Date;
}

// === TYPESCRIP EXPORTS ===

export const condominiumBaseSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es requerido")
    .max(100, "El nombre debe tener como máximo 100 caracteres"),

  address: z.object({
    street: z.string().min(1, "La calle es requerida"),
    number: z.string().min(1, "El número es requerido"),

    neighborhood: z.string().min(1, "El barrio es requerido"),
    city: z.string().min(1, "La ciudad es requerida"),
    state: z.string().nullable(),
    canton: z.string().nullable(),
    country: z.string().default("Venezuela").min(1),

    zipCode: z.string().min(1, "El código postal es requerido"),
    coordinates: z.object({
      latitude: z.number().default(0),
      longitude: z.number().default(0),
    }),
  }),

  propertyTypeName: PropertyTypeEnum,
  unitType: UnitTypeEnum,
  building: z.string().nullable(),
});

export type TCondominium = z.infer<typeof condominiumBaseSchema>;
