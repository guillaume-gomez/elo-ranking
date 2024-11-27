
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

// based on chess.com you cannot have an ELO score below the threshold 100
export function checkElo(chessPlayer: ChessPlayer) : boolean {
  return chessPlayer.elo >= 100;
}