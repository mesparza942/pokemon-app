"use client";
import React, { useEffect, useState } from "react";
import { Pokemon, PokemonListPaginated } from "@/domain/models/Pokemon";
import { basePath } from "@/infrastructure/api/pokemonApi";
import { useFetch } from "@/presentation/hooks/useFetch";
import { useDebounce } from "@/presentation/hooks/useDebounce";
import PokemonCard from "./PokemonCard";
import PokemonSearch from "./PokemonSearch";
import PokemonListLoading from "./PokemonListLoading";
import { Button } from "../../common";
import { usePokemonService } from "@/presentation/hooks/usePokemonService";

const PokemonList = () => {
  const [search, setSearch] = useDebounce("", 500);
  const [pokemonListPage, setPokemonListPage] =
    useState<PokemonListPaginated>();
  const { pokemonService } = usePokemonService();

  const {
    data: pokemonList,
    fetchData: getPokemonList,
    loading,
    error,
  } = useFetch<PokemonListPaginated, string>({
    api: pokemonService!.getPokemonList.bind(pokemonService),
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
    if (!search && pokemonListPage && pokemonListPage.count > 0) {
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
            pokemonUrl={pokemon.url!}
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
