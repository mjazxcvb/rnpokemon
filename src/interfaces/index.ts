export interface User {
  email: string;
  password: string;
}

export interface AppState {
  users: User[];
  loggedInUser: User | null;
}

export interface DispatchAction {
  type: string;
  payload: any;
}

export interface Abilities {
  ability: {
    name: string;
    url: string;
  };
  slot: number;
}

export interface Types {
  type: {
    name: string;
    url: string;
  };
  slot: number;
}

export interface Sprites {
  back_default: string;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  order: number;
  weight: number;
  abilities: Abilities[];
  types: Types[];
  sprites: Sprites;
}

export interface PokemonList {
  count: number;
  next: string;
  previous: string;
  results: PokemonUrl[];
}

export interface PokemonUrl {
  url: string;
  name: string;
}
