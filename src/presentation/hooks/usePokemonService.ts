import {
  PokemonServiceContextType,
  PokemonServiceContext,
} from "@/presentation/context/PokemonServiceContext";
import { useContext } from "react";

export const usePokemonService = (): PokemonServiceContextType => {
  const context = useContext(PokemonServiceContext);
  if (!context) {
    throw new Error("usePokemonService must be used within a Provider");
  }
  return context;
};
