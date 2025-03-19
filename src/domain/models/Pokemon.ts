export interface Pokemon {
  id: number;
  name: string;
  url: string;
  sprites?: {
    front_default: string;
  };
}

export interface PokemonAbility {
  name: string;
  effect: string;
}

export interface PokemonForm {
  name: string;
  imageUrl: string;
}

export interface PokemonMove {
  name: string;
  effect: string;
  effectType: string;
}

export interface PokemonListPaginated {
  results: Pokemon[];
  count: number;
  nextPageApi?: string;
  previousPageApi?: string;
}
