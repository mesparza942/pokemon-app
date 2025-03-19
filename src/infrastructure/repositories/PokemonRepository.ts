import { IPokemonRepository } from "@/domain/repositories/IPokemonRepository";
import {
  Pokemon,
  PokemonAbility,
  PokemonMove,
  PokemonListPaginated,
} from "@/domain/models/Pokemon";
import {
  getPokemonListPaginatedApi,
  getPokemonDetailsApi,
  searchPokemonByName,
  getPokemonAbilityApi,
  getPokemonMoveApi,
} from "../api/pokemonApi";

export class PokemonApiRepository implements IPokemonRepository {
  async getPokemonListPaginated(
    pageUrl?: string
  ): Promise<PokemonListPaginated> {
    const response = await getPokemonListPaginatedApi(pageUrl);

    return {
      results: response.data.results,
      count: response.data.count,
      nextPageApi: response.data.next,
      previousPageApi: response.data.previous,
    };
  }

  async getPokemonDetails(pokemonUrl: string): Promise<Pokemon> {
    const response = await getPokemonDetailsApi(pokemonUrl);
    return {
      id: response.data.id,
      name: response.data.name,
      type: response.data.types.map((item) => item.type)[0].name,
      imageUrl: response.data.sprites.front_default,
      abilities: response.data.abilities.map((item) => item.ability),
      moves: response.data.moves.map((item) => item.move),
      stats: response.data.stats.map((item) => ({
        name: item.stat.name,
        value: item.base_stat,
      })),
    };
  }

  async searchPokemonByName(pokemonName: string): Promise<Pokemon> {
    const response = await searchPokemonByName(pokemonName);

    return {
      id: response.data.id,
      name: response.data.name,
      type: response.data.types.map((item) => item.type)[0].name,
      imageUrl: response.data.sprites.front_default,
      abilities: response.data.abilities.map((item) => item.ability),
      moves: response.data.moves.map((item) => item.move),
      stats: response.data.stats.map((item) => ({
        name: item.stat.name,
        value: item.base_stat,
      })),
    };
  }

  async getPokemonAbility(abilityUrl: string): Promise<PokemonAbility> {
    const response = await getPokemonAbilityApi(abilityUrl);

    return {
      id: response.data.id,
      name: response.data.name,
      effect:
        response.data.effect_entries.find((it) => it.language.name === "en")
          ?.effect || "",
    };
  }

  async getPokemonMove(moveUrl: string): Promise<PokemonMove> {
    const response = await getPokemonMoveApi(moveUrl);

    return {
      id: response.data.id,
      name: response.data.name,
      effect:
        response.data.effect_entries.find((it) => it.language.name === "en")
          ?.effect || "",
      effectCategory: response.data.meta.category.name,
      power: response.data.power,
    };
  }
}
