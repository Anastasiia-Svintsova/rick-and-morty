export interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
  type: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
  episode: {
    episode: string;
  }[];
}

export interface CharactersQuery {
  info: {
    count: number;
    pages: number;
  };
  results: Character[];
}

export enum CharacterStatus {
  ALIVE = 'Alive',
  DEAD = 'Dead',
  UNKNOWN = 'unknown',
}
