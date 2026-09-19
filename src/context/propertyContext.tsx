import React, { createContext, useContext, useReducer } from "react";
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
    default:
      return state;
  }
}

const PropertyContext = createContext<PropertyState | undefined>(undefined);

export const useProperty = (): PropertyState => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error("useProperty must be used within a PropertyProvider");
  }
  return context;
};

const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialState: PropertyState = {
    properties: [],
    isLoading: false,
    error: null,
    searchTerm: "",
    selectedCategory: undefined,
    sortMode: "newest",
    totalPages: 1,
    currentPage: 1,
    isSidebarOpen: true,
  };

  const [state, dispatch] = useReducer(propertyReducer, initialState);

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
    (property: Property) => {
      dispatch({
        type: "SET_PROPERTIES",
        payload: { ...getFilteredListing, items: [property, ...getFilteredListing] as unknown as PaginatedList<Property>, totalItems: state.properties.length + 1 },
      });
    },
    []
  );

  const updateProperty = useCallback(
    (id: string, updates: Partial<Property>) => {
      const updatedItem = { ...getFilteredListing[0], ...updates, updatedAt: new Date() };
      dispatch({
        type: "SET_PROPERTIES",
        payload: { ...getFilteredListing, items: [updatedItem, ...getFilteredListing.slice(1)], totalItems: state.properties.length },
      });
    },
    []
  );

  const deleteProperty = useCallback(
    (id: string) => {
      const filtered = getFilteredListing.filter((p) => p.id !== id);
      dispatch({
        type: "SET_PROPERTIES",
        payload: { ...getFilteredListing, items: filtered as unknown as Property[], totalItems: state.properties.length - 1 },
      });
    },
    []
  );

  return { ...state, addProperty, updateProperty, deleteProperty };
};
