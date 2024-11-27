
interface ChessPlayer {
  age: number;
  elo: number;
  // check username is uniq
  username: string;
}

/*
TODO
-- make sure username is uniq
-- make sure chessPlayers is sanitized
*/

export default function findChampions(chessPlayers: ChessPlayer[]) : ChessPlayer[] {
  //const sanitizedChessPlayers = chessPlayers.filter((chessPlayer) => checkAge(chessPlayer) && checkElo(chessPlayer));

  const champions = chessPlayers.filter(chessPlayer => isChampion(chessPlayer, chessPlayers));
  return champions;
}

export function checkAge(chessPlayer: ChessPlayer) : boolean {
  return chessPlayer.age > 0;
}

// based on chess.com you cannot have an ELO score below the threshold 100
export function checkElo(chessPlayer: ChessPlayer) : boolean {
  return chessPlayer.elo >= 100;
}

export function isChampion(chessPlayerToCompare: ChessPlayer, chessPlayers: ChessPlayer[]): boolean {
  const foundBetterPlayer = chessPlayers.find((chessPlayerCompared) => {
    return ((chessPlayerCompared.elo > chessPlayerToCompare.elo && chessPlayerCompared.age <= chessPlayerToCompare.age) ||
           (chessPlayerCompared.age < chessPlayerToCompare.age && chessPlayerCompared.elo >= chessPlayerToCompare.elo) ) &&
           chessPlayerToCompare.username !== chessPlayerCompared.username
  });
  return !foundBetterPlayer;
}
