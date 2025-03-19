import { Pokemon, PokemonListPaginated } from "../models/Pokemon";

export interface IPokemonRepository {
  getPokemonListPaginated(pageUrl?: string): Promise<PokemonListPaginated>;
  getPokemonDetails(pokemonUrl?: string): Promise<Pokemon>;
  searchPokemonByName(pokemonName?: string): Promise<Pokemon>;
}
