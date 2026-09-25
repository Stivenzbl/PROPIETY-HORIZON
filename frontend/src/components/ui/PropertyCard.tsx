import { Property } from "@/types";
import { Button } from "@/components/ui/Button";
import clsx from "clsx";

interface PropertyCardProps {
  property: Property;
  showActions?: boolean;
  className?: string;
}

export const PropertyCard = ({ property, showActions = true, className }: PropertyCardProps) => {
  if (!property.price) return null;

  return (
    <div
      className={clsx(
        "rounded-xl overflow-hidden bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 group",
        className ?? ""
      )}
    >
      <div className="relative">
        {property.imageUrl ? (
          <img
            src={property.imageUrl}
            alt={property.name}
            className="w-full h-48 object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
            <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
        )}

        {property.isFeatured && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
            ⭐ Destacado
          </div>
        )}

        <div className="absolute bottom-3 right-3">
          <Button variant="ghost" size="icon" className="bg-white/90 hover:bg-white shadow-sm">
            <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
            </svg>
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-gray-900 line-clamp-2 min-h-[2.5rem] leading-tight">
            {property.name}
          </h3>
          <p className="text-sm text-gray-500">{property.address}</p>
        </div>

        <div className="flex items-center gap-1.5 text-gray-600">
          <span className="text-green-700 font-semibold flex items-baseline gap-1">
            {new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", minimumFractionDigits: 0 }).format(property.price)}
          </span>
          {property.pricePerSqft && (
            <span className="text-xs text-gray-400">/m²</span>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-sm">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h4m-6 0h5" />
            </svg>
            {property.bedrooms}
            <span className="text-gray-400">hab</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3m3-3v2m-6 0a1 1 0 10-2 0 1 1 0 002 0m-2 0c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2" />
            </svg>
            {property.bathrooms}
            <span className="text-gray-400">baños</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243m8.284-8.212c.011-.082.02-.163.027-.244.089-.584.302-1.175.621-1.705A4 4 0 0116.688 2h2.48a6 6 0 015.409 3m-.53 4.35A6 6 0 0017.435 6H6a8 8 0 008 8" />
            </svg>
            {new Intl.NumberFormat("es-MX").format(property.areaTotal)} m²
          </div>
        </div>

        {showActions && (
          <div className="flex gap-2 pt-3">
            <Button variant="outline" size="sm" className="flex-1">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.5 6.5a3 3 0 100 6 3 3 0 000-6z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-.89-1.89A1.424 1.424 0 0020 20.318c-.687.81-1.81.912-2.517.184l-1.281-.954a2.145 2.145 0 01-.751-2.03l.26-2.93a8.236 8.236 0 00-9.654-9.82c-3.082.095-5.53 2.69-5.718 5.821-.13 2.054 1.326 3.885 3.298 4.35a3.582 3.582 0 002.944.11l3.667-2.013a1 1 0 00.837-1.415l-.997-2.967a1 1 0 011.259-1.216l2.998.417a1 1 0 01.863 1.143l-.407 4.07a1 1 0 00.946 1.095" />
              </svg>
              Ver detalles
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
