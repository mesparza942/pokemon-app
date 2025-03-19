"use client";
import React, { useEffect } from "react";
import { Pokemon } from "@/domain/models/Pokemon";
import { useFetch } from "@/presentation/hooks/useFetch";
import Image from "next/image";
import { capitalize } from "@/utils/capitalize";
import { usePokemonService } from "@/presentation/hooks/usePokemonService";

const PokemonCard = ({
  pokemonUrl,
  pokemonName,
}: {
  pokemonUrl: string;
  pokemonName: string;
}) => {
  const { pokemonService } = usePokemonService();

  const {
    data: pokemonDetail,
    fetchData: getPokemonDetails,
    loading,
    error,
  } = useFetch<Pokemon, string>({
    api: pokemonService!.getPokemonDetails.bind(pokemonService),
  });

  useEffect(() => {
    getPokemonDetails(pokemonUrl);
  }, []);

  if (error) return <div>Something went wrong!</div>;

  return (
    <div className="max-w-[200px] rounded-xl flex flex-col items-center justify-center bg-amber-200 hover:bg-amber-300 shadow-amber-500 shadow-2xl p-3 text-black hover:cursor-pointer">
      <p className="font-bold">{capitalize(pokemonName)}</p>
      {loading || !pokemonDetail ? (
        <div className="w-[100px] h-[100px] bg-amber-300" />
      ) : (
        <Image
          src={pokemonDetail.imageUrl!}
          width={100}
          height={100}
          alt={pokemonName}
        />
      )}
    </div>
  );
};

export default PokemonCard;
