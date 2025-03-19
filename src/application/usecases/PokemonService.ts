import { IPokemonRepository } from "@/domain/repositories/IPokemonRepository";
import {
  PokemonListPaginated,
  Pokemon,
  PokemonAbility,
  PokemonForm,
  PokemonMove,
} from "@/domain/models/Pokemon";

export class PokemonService {
  constructor(private pokemonRepository: IPokemonRepository) {}

  async getPokemonList(pageUrl?: string): Promise<PokemonListPaginated> {
    const pokemonListData =
      await this.pokemonRepository.getPokemonListPaginated(pageUrl);

    return pokemonListData;
  }

  async getPokemonDetails(pokemonUrl?: string): Promise<Pokemon> {
    if (!pokemonUrl) {
      throw new Error("Invalid Request");
    }
    const pokemonData = await this.pokemonRepository.getPokemonDetails(
      pokemonUrl
    );

    return pokemonData;
  }

  async searchPokemonByName(pokemonName?: string): Promise<Pokemon> {
    if (!pokemonName) {
      throw new Error("Invalid Request");
    }
    try {
      const pokemonData = await this.pokemonRepository.searchPokemonByName(
        pokemonName
      );

      return pokemonData;
    } catch {
      throw new Error("Pokemon not found");
    }
  }

  async getPokemonAbility(abilityUrl?: string): Promise<PokemonAbility> {
    if (!abilityUrl) {
      throw new Error("Invalid Request");
    }
    try {
      const pokemonAbility = await this.pokemonRepository.getPokemonAbility(
        abilityUrl
      );

      return pokemonAbility;
    } catch {
      throw new Error("Pokemon Ability not found.");
    }
  }

  async getPokemonMove(moveUrl?: string): Promise<PokemonMove> {
    if (!moveUrl) {
      throw new Error("Invalid Request");
    }
    try {
      const pokemonMove = this.pokemonRepository.getPokemonMove(moveUrl);

      return pokemonMove;
    } catch {
      throw new Error("Pokemon Move not found.");
    }
  }

  async getPokemonForm(formUrl?: string): Promise<PokemonForm> {
    if (!formUrl) {
      throw new Error("Invalid Request");
    }
    try {
      const pokemonForm = this.pokemonRepository.getPokemonForm(formUrl);

      return pokemonForm;
    } catch {
      throw new Error("Pokemon Form not found.");
    }
  }
}
