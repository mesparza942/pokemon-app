import { IPokemonRepository } from "@/domain/repositories/IPokemonRepository";
import { Pokemon, PokemonListPaginated } from "@/domain/models/Pokemon";
import {
  getPokemonList,
  getPokemonDetail,
  searchPokemonByName,
} from "../api/pokemonApi";

export class PokemonApiRepository implements IPokemonRepository {
  async getPokemonListPaginated(
    pageUrl?: string
  ): Promise<PokemonListPaginated> {
    const response = await getPokemonList(pageUrl);

    return {
      results: response.data.results,
      count: response.data.count,
      nextPageApi: response.data.next,
      previousPageApi: response.data.previous,
    };
  }

  async getPokemonDetails(pokemonUrl: string): Promise<Pokemon> {
    const response = await getPokemonDetail(pokemonUrl);
    return {
      id: response.data.id,
      name: response.data.name,
      url: response.data.url,
      sprites: {
        front_default: response.data.sprites.front_default,
      },
    };
  }

  async searchPokemonByName(pokemonName: string): Promise<Pokemon> {
    const response = await searchPokemonByName(pokemonName);

    return {
      id: response.data.id,
      name: response.data.name,
      url: response.data.url,
      sprites: {
        front_default: response.data.sprites.front_default,
      },
    };
  }
}
