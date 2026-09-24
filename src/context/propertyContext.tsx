import React, { createContext, useContext, useReducer, useEffect, useMemo, useCallback } from "react";
import { PaginatedList, Property } from "../types";

const PROPS_PER_PAGE = 12;

function propertyReducer(
  state: PropertyState,
  action: PropertyAction
): PropertyState {
  switch (action.type) {
    case "SET_PROPERTIES":
      return {
        ...state,
        properties: action.payload.items,
        totalPages: action.payload.totalPages,
      };
    case "TOGGLE_SIDEBAR":
      return { ...state, isSidebarOpen: action.payload };
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "SET_SELECTED_CATEGORY":
      const newCategory = action.payload;
      if (state.selectedCategory === newCategory) {
        return state;
      }
      return newCategory
        ? { ...state, selectedCategory: newCategory }
        : { ...state, selectedCategory: undefined };
    case "SET_SORT_MODE":
      return { ...state, sortMode: action.payload };
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    case "SET_IS_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

interface PropertyState {
  properties: Property[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  selectedCategory?: string;
  sortMode: 'newest' | 'oldest' | 'price_asc' | 'price_desc';
  totalPages: number;
  currentPage: number;
  isSidebarOpen: boolean;
}

interface PropertyAction {
  type: string;
  payload?: any;
}

interface PropertyFormData {
  name: string;
  address: string;
  lot: number;
  bedrooms: number;
  bathrooms: number;
  areaTotal: number;
  buildingFloors: number;
  type: PropertyType;
  category: BuildingCategory;
  status: PropertyStatus;
  condominiumFee: number;
}

const PropertyContext = createContext<PropertyState | undefined>(undefined);

export const useProperty = (): PropertyState => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error("useProperty must be used within a PropertyProvider");
  }
  return context;
};

interface PropertyApiResponse {
  items: Property[];
  total: number;
  page: number;
  totalPages: number;
}

async function fetchProperties(params: {
  page?: number;
  limit?: number;
  searchTerm?: string;
  category?: string;
  sortMode?: string;
}): Promise<PropertyApiResponse> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
  const queryParams = new URLSearchParams({
    page: (params.page || 1).toString(),
    limit: (params.limit || PROPS_PER_PAGE).toString(),
    ...(params.searchTerm && { search: params.searchTerm }),
    ...(params.category && { category: params.category }),
    ...(params.sortMode && { sort: params.sortMode }),
  });

  const response = await fetch(`${baseUrl}/api/properties?${queryParams.toString()}`);
  if (!response.ok) {
    throw new Error('Error al cargar propiedades');
  }
  return response.json();
}

async function createProperty(property: PropertyFormData) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/properties`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(property),
  });
  if (!response.ok) {
    throw new Error('Error al crear la propiedad');
  }
  return response.json();
}

async function updateProperty(id: string, updates: Partial<PropertyFormData>) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/properties/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  if (!response.ok) {
    throw new Error('Error al actualizar la propiedad');
  }
  return response.json();
}

async function deleteProperty(id: string) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/properties/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Error al eliminar la propiedad');
  }
  return true;
}

const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialState: PropertyState = {
    properties: [],
    isLoading: true,
    error: null,
    searchTerm: "",
    selectedCategory: undefined,
    sortMode: "newest",
    totalPages: 1,
    currentPage: 1,
    isSidebarOpen: true,
  };

  const [state, dispatch] = useReducer(propertyReducer, initialState);

  useEffect(() => {
    let cancelled = false;
    
    fetchProperties({})
      .then((data) => {
        if (!cancelled) {
          dispatch({
            type: "SET_PROPERTIES",
            payload: {
              items: data.items,
              totalPages: data.totalPages,
            },
          });
        }
      })
      .catch((err) => {
        if (!cancelled) {
          dispatch({ type: "SET_ERROR", payload: err.message });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const getFilteredListing = useMemo(() => {
    let result: Property[] = [...state.properties];

    if (state.selectedCategory && state.selectedCategory !== undefined) {
      result = result.filter((p) => p.category === state.selectedCategory);
    }

    if (state.searchTerm) {
      const query = state.searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.address?.toLowerCase().includes(query) ||
          p.ownerName?.toLowerCase().includes(query) ||
          p.buildingFloors.toString().includes(query)
      );
    }

    switch (state.sortMode) {
      case "newest":
        result = [...result].sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        );
        break;
      case "oldest":
        result = [...result].sort(
          (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
        );
        break;
      case "price_asc":
        result = [...result].sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price_desc":
        result = [...result].sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
    }

    return result;
  }, [state.properties, state.selectedCategory, state.searchTerm, state.sortMode]);

  const totalPages = Math.ceil(getFilteredListing.length / PROPS_PER_PAGE);

  const currentProperties = useMemo(() => {
    const start = (state.currentPage - 1) * PROPS_PER_PAGE;
    const end = state.currentPage * PROPS_PER_PAGE;
    return getFilteredListing.slice(start, end);
  }, [getFilteredListing, state.currentPage]);

  const addProperty = useCallback(
    async (property: PropertyFormData) => {
      try {
        await createProperty(property);
        dispatch({ type: "SET_IS_LOADING", payload: true });
        fetchProperties({}).then((data) => {
          dispatch({
            type: "SET_PROPERTIES",
            payload: {
              items: data.items,
              totalPages: data.totalPages,
            },
          });
        });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error instanceof Error ? error.message : 'Error desconocido' });
      }
    },
    []
  );

  const updateProperty = useCallback(
    async (id: string, updates: Partial<PropertyFormData>) => {
      try {
        await updateProperty(id, updates);
        dispatch({ type: "SET_IS_LOADING", payload: true });
        fetchProperties({}).then((data) => {
          dispatch({
            type: "SET_PROPERTIES",
            payload: {
              items: data.items,
              totalPages: data.totalPages,
            },
          });
        });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error instanceof Error ? error.message : 'Error desconocido' });
      }
    },
    []
  );

  const deleteProperty = useCallback(
    async (id: string) => {
      try {
        await deleteProperty(id);
        dispatch({ type: "SET_IS_LOADING", payload: true });
        fetchProperties({}).then((data) => {
          dispatch({
            type: "SET_PROPERTIES",
            payload: {
              items: data.items,
              totalPages: data.totalPages,
            },
          });
        });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error instanceof Error ? error.message : 'Error desconocido' });
      }
    },
    []
  );

  const setSearchTerm = useCallback(
    (term: string) => {
      dispatch({ type: "SET_SEARCH_TERM", payload: term });
    },
    []
  );

  const setSelectedCategory = useCallback(
    (category: string | undefined) => {
      dispatch({ type: "SET_SELECTED_CATEGORY", payload: category });
    },
    []
  );

  const setSortMode = useCallback(
    (mode: 'newest' | 'oldest' | 'price_asc' | 'price_desc') => {
      dispatch({ type: "SET_SORT_MODE", payload: mode });
    },
    []
  );

  const setCurrentPage = useCallback(
    (page: number) => {
      dispatch({ type: "SET_CURRENT_PAGE", payload: page });
    },
    []
  );

  const toggleSidebar = useCallback(
    (isOpen: boolean) => {
      dispatch({ type: "TOGGLE_SIDEBAR", payload: isOpen });
    },
    []
  );

  return { ...state, addProperty, updateProperty, deleteProperty, setSearchTerm, setSelectedCategory, setSortMode, setCurrentPage, toggleSidebar };
};

export { PropertyProvider, useProperty };