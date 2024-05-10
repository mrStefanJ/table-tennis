export interface Player {
  id: string | number;
  firstName: string;
  lastName: string;
  image?: string;
  title?: string;
  set?: string;
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

export interface Match {
  id: string;
  lost: number;
  name: string;
  played: number;
  pointsLost: number;
  pointsWon: number;
  won: number;
}
