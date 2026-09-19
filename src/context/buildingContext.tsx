import React, { createContext, useContext, useReducer } from "react";
import { Building, PaginatedList, BuildingFacility } from "../types";

const BUILDINGS_PER_PAGE = 8;

function buildingReducer(
  state: BuildingState,
  action: BuildingAction
): BuildingState {
  switch (action.type) {
    case "SET_BUILIDNGS":
      return { ...state, buildings: action.payload.items };
    case "TOGGLE_SIDEBAR":
      return { ...state, isSidebarOpen: action.payload };
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    default:
      return state;
  }
}

type BuildingAction =
  | { type: "SET_BUILIDNGS"; payload: PaginatedList<Building> }
  | { type: "TOGGLE_SIDEBAR"; payload: boolean }
  | { type: "SET_SEARCH_TERM"; payload: string };

interface BuildingState {
  buildings: Building[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  totalPages: number;
  currentPage: number;
  isSidebarOpen: boolean;
}

const BuildingContext = createContext<BuildingState | undefined>(undefined);

export const useBuilding = () => {
  const context = useContext(BuildingContext);
  if (!context) {
    throw new Error("useBuilding must be used within a BuildingProvider");
  }
  return context;
};

const BuildingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialState: BuildingState = {
    buildings: [],
    isLoading: false,
    error: null,
    searchTerm: "",
    totalPages: 1,
    currentPage: 1,
    isSidebarOpen: true,
  };

  const [state, dispatch] = useReducer(buildingReducer, initialState);

  const getFilteredListing = (query?: string): Building[] => {
    let result = [...state.buildings];

    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.address?.toLowerCase().includes(q) ||
          b.city?.toLowerCase().includes(q)
      );
    }

    return result;
  };

  const searchBuildings = (query?: string) => {
    if (query !== undefined) {
      dispatch({ type: "SET_SEARCH_TERM", payload: query });
    } else if (!state.searchTerm) {
      dispatch({ type: "SET_SEARCH_TERM", payload: "" });
      dispatch({ type: "TOGGLE_SIDEBAR", payload: false });
    }
  };

  const setSearchTerm = (term: string) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: term });
  };

  return {
    buildings: state.buildings,
    isLoading: state.isLoading,
    error: state.error,
    searchTerm: state.searchTerm,
    totalPages: state.totalPages,
    currentPage: state.currentPage,
    isSidebarOpen: state.isSidebarOpen,
    setIsSidebarOpen: (open: boolean) => dispatch({ type: "TOGGLE_SIDEBAR", payload: open }),
    setSearchTerm,
    searchBuildings,
  };
};

export { useBuilding, BuildingContext };
