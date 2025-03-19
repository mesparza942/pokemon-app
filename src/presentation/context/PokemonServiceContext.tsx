import React, { createContext, useMemo, ReactNode } from "react";
import { PokemonApiRepository } from "@/infrastructure/repositories/PokemonRepository";
import { PokemonService } from "@/application/usecases/PokemonService";

export interface PokemonServiceContextType {
  pokemonService: PokemonService | null;
}

export const PokemonServiceContext =
  createContext<PokemonServiceContextType | null>(null);

interface PokemonServiceProviderProps {
  children: ReactNode;
}

export const PokemonServiceProvider: React.FC<PokemonServiceProviderProps> = ({
  children,
}) => {
  const pokemonService = useMemo(() => {
    const repo = new PokemonApiRepository();
    return new PokemonService(repo);
  }, []);

  return (
    <PokemonServiceContext.Provider value={{ pokemonService }}>
      {children}
    </PokemonServiceContext.Provider>
  );
};
