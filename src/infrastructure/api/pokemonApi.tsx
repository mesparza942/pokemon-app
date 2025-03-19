import axios from "axios";

export const basePath = process.env.NEXT_PUBLIC_API_POKEMON_URL;

export const getPokemonList = (pageUrl?: string) =>
  axios(!pageUrl ? `${basePath}/pokemon` : pageUrl);

export const getPokemonDetail = (pokemonUrl: string) => axios(pokemonUrl);

export const searchPokemonByName = (pokemonName: string) =>
  axios(`${basePath}/pokemon/${pokemonName}`);
