import { PropertyCard } from '@/components/ui/PropertyCard';
import { useProperty } from '@/context/PropertyContext';
import { LoadingOverlay } from '@/components/ui/LoadingOverlay';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { STATUS_COLORS } from '@/types';

export default function Dashboard() {
  const { properties, isLoading, error, refetch } = useProperty();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading && refreshing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingOverlay message="Actualizando datos..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Error</h2>
        <p className="text-gray-600">{error}</p>
        <Button onClick={() => refetch()} className="mt-4">
          Reintentar
        </Button>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            🏠 Panel de Control
          </h1>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => refetch()}
          >
            Actualizar
          </Button>
        </div>

        {properties.length === 0 ? (
          <div className="empty-state">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h4a2 2 0 002-2v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6zM3 3h6l1-1h-4l-1 1H3v4l1 1h4zm2 6l-4 4l4 4" />
            </svg>
            <h2 className="text-xl font-medium text-gray-500 mb-2">No hay propiedades</h2>
            <p className="text-gray-400">Aún no hay propiedades registradas. Haz clic en el botón de agregar para comenzar.</p>
            <Button onClick={() => refetch()} className="mt-4">
              Cargar propiedades
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                showActions
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}