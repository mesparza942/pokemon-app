"use client";
import React, { useEffect, useState } from "react";
import { Pokemon } from "@/domain/models/Pokemon";
import { useFetch } from "@/presentation/hooks/useFetch";
import { Input } from "../../common";
import { usePokemonService } from "@/presentation/hooks/usePokemonService";

const PokemonSearch = ({
  searchTerm,
  onChange,
  onSearchFound,
}: {
  searchTerm: string;
  onChange: (val: string) => void;
  onSearchFound: (pokemon: Pokemon) => void;
}) => {
  const [value, setValue] = useState("");
  const [searchError, setSearchError] = useState<string | null>(null);
  const { pokemonService } = usePokemonService();

  const {
    data: pokemon,
    fetchData: getPokemonDetails,
    loading,
    error,
  } = useFetch<Pokemon, string>({
    api: pokemonService!.searchPokemonByName.bind(pokemonService),
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  useEffect(() => {
    setSearchError(null);
    if (searchTerm) {
      getPokemonDetails(searchTerm);
    }
  }, [searchTerm]);

  useEffect(() => {
    setSearchError(error);
  }, [error]);

  useEffect(() => {
    if (pokemon) {
      onSearchFound(pokemon);
    }
  }, [pokemon]);

  return (
    <div className="fixed top-12 left-32">
      <Input
        id="search-pokemon"
        type="text"
        placeholder="Search for a Pokemon"
        value={value}
        onChange={handleSearch}
        error={searchError || undefined}
        className={`bg-white text-black ${loading ? "!outline-blue-500" : ""}`}
      />
    </div>
  );
};

export default PokemonSearch;
