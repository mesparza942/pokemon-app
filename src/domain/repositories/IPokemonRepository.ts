import {
  Pokemon,
  PokemonListPaginated,
  PokemonAbility,
  PokemonForm,
  PokemonMove,
} from "../models/Pokemon";

export interface IPokemonRepository {
  getPokemonListPaginated(pageUrl?: string): Promise<PokemonListPaginated>;
  getPokemonDetails(pokemonUrl?: string): Promise<Pokemon>;
  searchPokemonByName(pokemonName?: string): Promise<Pokemon>;
  getPokemonAbility(abilityUrl?: string): Promise<PokemonAbility>;
  getPokemonMove(moveUrl?: string): Promise<PokemonMove>;
  getPokemonForm(formUrl?: string): Promise<PokemonForm>;
}
