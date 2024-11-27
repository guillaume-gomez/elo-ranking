
interface ChessPlayer {
  age: number;
  /* age is a number here.
    A datetime type could have been interesting to compute the age in days and not in years.
    However the algorithm would work as well with a datetime
  */
  elo: number;
  username: string;
  /* Username is used to identify the champions easier.
  */
}

export default function findChampions(chessPlayers: ChessPlayer[]) : ChessPlayer[] {
  const sanitizedChessPlayers = chessPlayers.filter((chessPlayer) => checkAge(chessPlayer) && checkElo(chessPlayer));

  const champions = sanitizedChessPlayers.filter((chessPlayer, index) => {
    let chessPlayersWithoutCurrentChessPlayer = sanitizedChessPlayers.slice()
    chessPlayersWithoutCurrentChessPlayer.splice(index, 1);
    return isChampion(chessPlayer, chessPlayersWithoutCurrentChessPlayer);
  });
  return champions;
}

export function isChampion(chessPlayerToCompare: ChessPlayer, chessPlayers: ChessPlayer[]): boolean {
  const foundBetterPlayer = chessPlayers.find((chessPlayerCompared) => {
    return (chessPlayerCompared.elo > chessPlayerToCompare.elo && chessPlayerCompared.age <= chessPlayerToCompare.age) ||
           (chessPlayerCompared.age < chessPlayerToCompare.age && chessPlayerCompared.elo >= chessPlayerToCompare.elo)
  });

  return !foundBetterPlayer;
}

export function checkAge(chessPlayer: ChessPlayer) : boolean {
  return chessPlayer.age > 0;
}

// based on chess.com you cannot have an ELO score below the threshold 100
export function checkElo(chessPlayer: ChessPlayer) : boolean {
  return chessPlayer.elo >= 100;
}
