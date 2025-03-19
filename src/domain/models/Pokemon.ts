export interface Pokemon {
  id: number;
  name: string;
  url: string;
  sprites?: {
    front_default: string;
  };
}

export interface PokemonListPaginated {
  results: Pokemon[];
  count: number;
  nextPageApi?: string;
  previousPageApi?: string;
}
