import {
  Pokemon,
  PokemonListPaginated,
  PokemonAbility,
  PokemonMove,
} from "../models/Pokemon";

export interface IPokemonRepository {
  getPokemonListPaginated(pageUrl?: string): Promise<PokemonListPaginated>;
  getPokemonDetails(pokemonUrl?: string): Promise<Pokemon>;
  searchPokemonByName(pokemonName?: string): Promise<Pokemon>;
  getPokemonAbility(abilityUrl?: string): Promise<PokemonAbility>;
  getPokemonMove(moveUrl?: string): Promise<PokemonMove>;
}
