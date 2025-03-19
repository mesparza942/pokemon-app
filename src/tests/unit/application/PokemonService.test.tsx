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
          { id: 1, name: "Pikachu", type: "Electric", url: "" },
          { id: 2, name: "Raichu", type: "Electric", url: "" },
        ],
      };
    }
    return {
      count: 1,
      nextPageApi: undefined,
      previousPageApi: undefined,
      results: [{ id: 1, name: "Pikachu", type: "Electric", url: "" }],
    };
  },
  getPokemonDetails: async (pokemonUrl?: string) => {
    console.log("fetching pokemon details: ", pokemonUrl);
    return {
      id: 1,
      name: "Pikachu",
      type: "Electric",
      url: "",
      imageUrl: "",
      abilities: [],
      stats: [],
      moves: [],
    };
  },
  searchPokemonByName: async (pokemonName?: string) => {
    if (pokemonName === "test") {
      throw new Error("Pokemon not found.");
    }
    return {
      id: 1,
      name: "Pikachu",
      type: "Electric",
      url: "",
      imageUrl: "",
      abilities: [],
      stats: [],
      moves: [],
    };
  },
  getPokemonAbility: async (abilityUrl?: string) => {
    if (abilityUrl === "test") {
      throw new Error("Pokemon Ability not found.");
    }
    return {
      id: 1,
      name: "test ability",
      effect: "the best ability",
    };
  },
  getPokemonMove: async (moveUrl?: string) => {
    if (moveUrl === "test") {
      throw new Error("Pokemon Move not found.");
    }
    return {
      id: 1,
      name: "test move",
      effect: "the best move",
      effectCategory: "move category",
      power: 80,
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

  it("should return a pokemon ability given an abilityUrl", async () => {
    const pokemonAbility = await pokemonService.getPokemonAbility(
      "https://pokeapi.co/api/v2/ability/51/"
    );
    expect(pokemonAbility.name).toBe("test ability");
  });

  it("should throw an error for api 'getPokemonAbility' call without argument", async () => {
    await expect(pokemonService.getPokemonAbility()).rejects.toThrow(
      "Invalid Request"
    );
  });

  it("should throw an error for api 'getPokemonAbility' call with inexistent ability", async () => {
    await expect(pokemonService.getPokemonAbility("test")).rejects.toThrow(
      "Pokemon Ability not found."
    );
  });

  it("should return a pokemon move given an moveUrl", async () => {
    const pokemonMove = await pokemonService.getPokemonMove(
      "https://pokeapi.co/api/v2/move/51/"
    );
    expect(pokemonMove.name).toBe("test move");
  });

  it("should throw an error for api 'getPokemonMove' call without argument", async () => {
    await expect(pokemonService.getPokemonMove()).rejects.toThrow(
      "Invalid Request"
    );
  });

  it("should throw an error for api 'getPokemonMove' call with inexistent move", async () => {
    await expect(pokemonService.getPokemonMove("test")).rejects.toThrow(
      "Pokemon Move not found."
    );
  });
});
