import axios from "axios";

export const basePath = process.env.NEXT_PUBLIC_API_POKEMON_URL;

export const getPokemonListPaginatedApi = (pageUrl?: string) =>
  axios(!pageUrl ? `${basePath}/pokemon` : pageUrl);

interface PokemonDetailsResponse {
  id: number;
  name: string;
  sprites: { front_default: string };
  abilities: Array<{ ability: { name: string; url: string } }>;
  stats: Array<{ base_stat: number; stat: { name: string } }>;
  moves: Array<{ move: { name: string; url: string } }>;
  types: Array<{ type: { name: string } }>;
}
export const getPokemonDetailsApi = (pokemonUrl: string) =>
  axios<PokemonDetailsResponse>(pokemonUrl);

export const searchPokemonByName = (pokemonName: string) =>
  axios<PokemonDetailsResponse>(`${basePath}/pokemon/${pokemonName}`);

interface PokemonAbilityResponse {
  id: number;
  name: string;
  effect_entries: Array<{ effect: string; language: { name: string } }>;
}
export const getPokemonAbilityApi = (abilityUrl: string) =>
  axios<PokemonAbilityResponse>(abilityUrl);

interface PokemonFormResponse {
  id: number;
  name: string;
  sprites: { front_default: string };
}
export const getPokemonFormApi = (formUrl: string) =>
  axios<PokemonFormResponse>(formUrl);

interface PokemonMoveResponse {
  id: number;
  name: string;
  effect_entries: Array<{ effect: string; language: { name: string } }>;
  meta: { category: { name: string } };
  power: number;
}
export const getPokemonMoveApi = (moveUrl: string) =>
  axios<PokemonMoveResponse>(moveUrl);
