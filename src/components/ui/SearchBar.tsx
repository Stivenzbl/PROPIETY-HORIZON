import { useProperty } from "../../context/propertyContext";
import { Input, SearchButton } from "./SearchInput";

export const SearchBar = () => {
  const { searchTerm, searchProperties, isSidebarOpen, setIsSidebarOpen } = useProperty();

  return (
    <div className="relative">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          searchProperties(searchTerm);
        }}
        className="flex items-center w-full md:w-2/3 lg:w-1/2"
      >
        <Input
          value={searchTerm}
          onChange={(value) => searchProperties(value)}
          placeholder="🔍 Buscar propiedades, edificios, propietarios..."
          className="min-w-[240px] w-full sm:w-full md:w-auto pr-10"
        />

        <SearchButton
          onClick={() => searchProperties(searchTerm)}
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>}
        />

        <button
          type="button"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`ml-auto p-2 rounded-lg transition-all ${
            isSidebarOpen ? "bg-primary/10 text-primary hover:bg-primary/20" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          }`}
          aria-label="Toggle sidebar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isSidebarOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9H6" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </form>

      {/* Mobile expand icon */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label={isSidebarOpen ? "Ocultar filtros" : "Mostrar filtros"}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isSidebarOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9H6m0 6h12m-3.75-3h5.25M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18" />
          )}
        </svg>
      </button>
    </div>
  );
};
