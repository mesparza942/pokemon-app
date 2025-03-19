export interface Pokemon {
  id: number;
  name: string;
  type: string;
  url?: string;
  imageUrl?: string;
  abilities?: Partial<PokemonAbility>[];
  stats?: Partial<PokemonStats>[];
  moves?: Partial<PokemonMove>[];
}

export interface PokemonAbility {
  id: number;
  name: string;
  effect: string;
  url?: string;
}

export interface PokemonStats {
  id: number;
  name: string;
  value: number;
}

export interface PokemonMove {
  id: number;
  name: string;
  effect: string;
  effectCategory: string;
  power: number;
  url?: string;
}

export interface PokemonListPaginated {
  results: Pokemon[];
  count: number;
  nextPageApi?: string;
  previousPageApi?: string;
}
