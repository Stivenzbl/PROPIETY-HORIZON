import { useProperty } from '@/context/PropertyContext';
import { LoadingOverlay } from '@/components/ui/LoadingOverlay';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';

export default function Condominios() {
  const { properties, isLoading, error, refetch } = useProperty();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading && !showModal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingOverlay message="Cargando condominios..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Error</h2>
        <p className="text-gray-600">{error}</p>
        <Button onClick={() => refetch()} className="mt-4">Reintentar</Button>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">🏢 Condominios</h1>
          <Button variant="primary" size="sm" onClick={() => setShowModal(true)}>+ Nueva</Button>
        </div>

        {properties.length === 0 ? (
          <div className="empty-state text-center">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h4a2 2 0 002-2v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6zM3 3h6l1-1h-4l-1 1H3v4l1 1h4zm2 6l-4 4l4 4" />
            </svg>
            <h2 className="text-xl font-medium text-gray-500 mb-2">No hay condominios</h2>
            <p className="text-gray-400">Aún no hay condominios registrados.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} showActions />
            ))}
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-500/50 backdrop-blur-sm">
            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 transform overflow-hidden animate-modal-in">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Nueva propiedad</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                  <input
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Ej. Departamento 101"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Precio</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Área (m²)</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
                  <select
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="residential">Residencial</option>
                    <option value="commercial">Comercial</option>
                    <option value="mixed">Mixta</option>
                  </select>
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-600 dark:hover:bg-gray-200 dark:text-gray-300 hover:bg-gray-100 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button className="w-full py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
                    Crear
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}