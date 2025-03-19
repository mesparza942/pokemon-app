import { IPokemonRepository } from "@/domain/repositories/IPokemonRepository";
import { PokemonListPaginated, Pokemon } from "@/domain/models/Pokemon";

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
}
