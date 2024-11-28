
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


/*
  The algorithm efficiency is On^2
  In order to improve the performances, we could sort the chessPlayers array by age
*/
/*export default*/ function findChampions(chessPlayers: ChessPlayer[]) : ChessPlayer[] {
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

export default function findChampionsImproved(chessPlayers: ChessPlayer[]) : ChessPlayer[] {
  const sanitizedChessPlayers = chessPlayers.filter((chessPlayer) => checkAge(chessPlayer) && checkElo(chessPlayer));
  const sortChessPlayersArray = sortChessPlayers(sanitizedChessPlayers);
  let bestCurrentElo = 0;
  let championsArray = [];

  sortChessPlayersArray.forEach((chessPlayerToCompare, indexPosition) => {
    let isChampion = true;
    for(let i = indexPosition -1; i >= 0; i--) {
      if(hasBetterPlayer(chessPlayerToCompare, sortChessPlayersArray[i])) {
        isChampion = false;
        bestCurrentElo = sortChessPlayersArray[indexPosition].elo;
      }
    }
    if(isChampion){
      championsArray = [...championsArray, chessPlayerToCompare];
    }
  });

  return championsArray;
}

function hasBetterPlayer(chessPlayerToCompare: ChessPlayer, chessPlayerCompared: ChessPlayer) : boolean {
   return (chessPlayerCompared.elo > chessPlayerToCompare.elo && chessPlayerCompared.age <= chessPlayerToCompare.age) ||
           (chessPlayerCompared.age < chessPlayerToCompare.age && chessPlayerCompared.elo >= chessPlayerToCompare.elo)
}

export function sortChessPlayers(chessPlayers: ChessPlayer[]) : ChessPlayer[] {
  const copyChessPlayers = [...chessPlayers];
  copyChessPlayers.sort((a: ChessPlayer, b: ChessPlayer) => {
    if(a.age === b.age) {
      return (b.elo - a.elo);
    }

    return a.age - b.age;
  });

  return copyChessPlayers;
}
