export interface GameMatch {
  player: Player[];
  game: DBGame[];
}

export interface Player {
  id: string | number;
  firstName: string;
  lastName: string;
  image?: string;
  title?: string;
  set?: string;
}

export interface DBGame {
  id: string;
  game: Game[];
}

export interface Game {
  id: string;
  sets: Set[];
  players: Player[];
}

export interface Set {
  player1: number;
  player2: number;
}
