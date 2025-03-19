"use client";
import PokemonListPage from "@/presentation/pages/PokemonListPage";
import { PokemonServiceProvider } from "@/presentation/context/PokemonServiceContext";

export default function Pokemon() {
  return (
    <PokemonServiceProvider>
      <PokemonListPage />
    </PokemonServiceProvider>
  );
}
