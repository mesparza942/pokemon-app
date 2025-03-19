import { PokemonService } from "@/application/usecases/PokemonService";
import { IPokemonRepository } from "@/domain/repositories/IPokemonRepository";

const dummyPokemonRepository: IPokemonRepository = {
  getPokemonListPaginated: async (pageUrl?: string) => {
    if (pageUrl) {
      return {
        count: 300,
        nextPageApi: "https://pokeapi.co/api/v2/valid-next-page",
        previousPageApi: "https://pokeapi.co/api/v2/valid-prev-page",
        results: [
          { id: 1, name: "Pikachu", url: "" },
          { id: 2, name: "Raichu", url: "" },
        ],
      };
    }
    return {
      count: 1,
      nextPageApi: undefined,
      previousPageApi: undefined,
      results: [{ id: 1, name: "Pikachu", url: "" }],
    };
  },
  getPokemonDetails: async (pokemonUrl?: string) => {
    console.log("fetching pokemon details: ", pokemonUrl);
    return {
      id: 1,
      name: "Pikachu",
      url: "",
    };
  },
  searchPokemonByName: async (pokemonName?: string) => {
    if (pokemonName === "test") {
      throw new Error("Pokemon not found.");
    }
    return {
      id: 1,
      name: "Pikachu",
      url: "",
    };
  },
};

describe("PokemonService", () => {
  const pokemonService = new PokemonService(dummyPokemonRepository);

  it("should return a list of one pokemon", async () => {
    const pokemonList = await pokemonService.getPokemonList();
    expect(pokemonList.count).toBe(1);
    expect(pokemonList.nextPageApi).toBe(undefined);
    expect(pokemonList.previousPageApi).toBe(undefined);
    expect(pokemonList.results[0].name).toBe("Pikachu");
  });

  it("should return a paginated list of 2 pokemons", async () => {
    const pokemonPaginatedList = await pokemonService.getPokemonList(
      "https://pokeapi.co/api/v2/valid-next-page"
    );
    expect(pokemonPaginatedList.count).toBe(300);
    expect(pokemonPaginatedList.nextPageApi).toBe(
      "https://pokeapi.co/api/v2/valid-next-page"
    );
    expect(pokemonPaginatedList.previousPageApi).toBe(
      "https://pokeapi.co/api/v2/valid-prev-page"
    );
    expect(pokemonPaginatedList.results[1].name).toBe("Raichu");
  });

  it("should return a pokemon given a pokemonUrl", async () => {
    const pokemon = await pokemonService.getPokemonDetails(
      "https://pokeapi.co/api/v2/pokemon/pikachu"
    );
    expect(pokemon.name).toBe("Pikachu");
  });

  it("should throw an error for api 'getPokemonDetails' call without argument", async () => {
    await expect(pokemonService.getPokemonDetails()).rejects.toThrow(
      "Invalid Request"
    );
  });

  it("should return a pokemon given a pokemonName", async () => {
    const pokemon = await pokemonService.searchPokemonByName("pikachu");
    expect(pokemon.name).toBe("Pikachu");
  });

  it("should throw an error for api 'searchPokemonByName' call without argument", async () => {
    await expect(pokemonService.searchPokemonByName()).rejects.toThrow(
      "Invalid Request"
    );
  });

  it("should throw an error for api 'searchPokemonByName' call with inexistent pokemon name", async () => {
    await expect(pokemonService.searchPokemonByName("test")).rejects.toThrow(
      "Pokemon not found"
    );
  });
});
