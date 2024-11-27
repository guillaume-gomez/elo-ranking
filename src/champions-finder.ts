
interface ChessPlayer {
  age: number;
  elo: number;
}

export default function findChampions(chessPlayers: ChessPlayer[]) : ChessPlayer[] {
  return chessPlayers;
}

export function checkAge(chessPlayer: ChessPlayer) : boolean {
  return chessPlayer.age > 0;
}