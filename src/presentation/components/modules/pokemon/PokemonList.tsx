"use client";
import React, { useMemo, useEffect, useState } from "react";
import { Pokemon, PokemonListPaginated } from "@/domain/models/Pokemon";
import { PokemonApiRepository } from "@/infrastructure/repositories/PokemonRepository";
import { basePath } from "@/infrastructure/api/pokemonApi";
import { PokemonService } from "@/application/usecases/PokemonService";
import { useFetch } from "@/presentation/hooks/useFetch";
import { useDebounce } from "@/presentation/hooks/useDebounce";
import PokemonCard from "./PokemonCard";
import PokemonSearch from "./PokemonSearch";
import PokemonListLoading from "./PokemonListLoading";
import { Button } from "../../common";

const PokemonList = () => {
  const [search, setSearch] = useDebounce("", 500);
  const [pokemonListPage, setPokemonListPage] =
    useState<PokemonListPaginated>();
  const pokemonService = useMemo(() => {
    const repo = new PokemonApiRepository();
    return new PokemonService(repo);
  }, []);

  const {
    data: pokemonList,
    fetchData: getPokemonList,
    loading,
    error,
  } = useFetch<PokemonListPaginated, string>({
    api: pokemonService.getPokemonList.bind(pokemonService),
  });

  useEffect(() => {
    getPokemonList();
  }, []);

  useEffect(() => {
    if (pokemonList) {
      setPokemonListPage(pokemonList);
    }
  }, [pokemonList]);

  useEffect(() => {
    if (!search) {
      getPokemonList();
    }
  }, [search]);

  const handleChangePage = (pageUrl?: string) => {
    getPokemonList(pageUrl);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const handleSearchFound = (pokemon: Pokemon) => {
    setPokemonListPage({
      results: [{ ...pokemon, url: `${basePath}/pokemon/${pokemon.id}` }],
      count: 1,
      nextPageApi: undefined,
      previousPageApi: undefined,
    });
  };

  if (error) return <div>Something went wrong!</div>;

  return (
    <div className="grid grid-cols-4 grid-rows-5 lg:grid-cols-5 lg:grid-rows-4 gap-12 justify-around">
      <PokemonSearch
        searchTerm={search}
        onChange={handleSearch}
        onSearchFound={handleSearchFound}
      />
      {pokemonListPage?.previousPageApi && (
        <Button
          className="absolute left-10 top-[50%]"
          onClick={() => handleChangePage(pokemonListPage?.previousPageApi)}
        >
          ←
        </Button>
      )}
      {loading ? (
        <PokemonListLoading />
      ) : (
        pokemonListPage?.results?.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            pokemonName={pokemon.name}
            pokemonUrl={pokemon.url}
          />
        ))
      )}
      {pokemonListPage?.nextPageApi && (
        <Button
          className="absolute right-10 top-[50%] text-2xl"
          onClick={() => handleChangePage(pokemonListPage?.nextPageApi)}
        >
          →
        </Button>
      )}
    </div>
  );
};

export default PokemonList;
