/*
 Informations:
  this file contains two method to compute the champions.
  First, findChampionsNaive trying to implement the algorithm in a functionnal way without taking in account the performances.
  Then, findChampionsImproved trying to focus on the performances and not the readibility of the code.

  To extend, it could have been interesting to use a database and indexes (age and eloscore) to take profit of database optimizations.
*/


interface ChessPlayer {
  age: number;
  /* age is a number here.
    A datetime type could have been interesting to compute the age in days and not in years.
    However the algorithm would work as well with a datetime type
  */
  elo: number;
  username: string;
  /* Username is used to identify the champions easier.
  */
}

export function checkAge(chessPlayer: ChessPlayer) : boolean {
  return chessPlayer.age > 0;
}

// based on chess.com you cannot have an ELO score below the threshold 100
export function checkElo(chessPlayer: ChessPlayer) : boolean {
  return chessPlayer.elo >= 100;
}

/*
  The algorithm efficiency is On^2
  see findChampionsImproved for a more efficiant version
*/
/*export default*/ function findChampionsNaive(chessPlayers: ChessPlayer[]) : ChessPlayer[] {
  const sanitizedChessPlayers = chessPlayers.filter((chessPlayer) => checkAge(chessPlayer) && checkElo(chessPlayer));

  const champions = sanitizedChessPlayers.filter((chessPlayer, index) => {
    // remove chessPlayer to be compared in the sanitizedChessPlayers
    let chessPlayersWithoutCurrentChessPlayer = sanitizedChessPlayers.slice();
    chessPlayersWithoutCurrentChessPlayer.splice(index, 1);
    return isChampion(chessPlayer, chessPlayersWithoutCurrentChessPlayer);
  });
  return champions;
}

export function isChampion(chessPlayerToCompare: ChessPlayer, chessPlayers: ChessPlayer[]): boolean {
  const foundBetterPlayer = chessPlayers.find((chessPlayerCompared) => {
    return (chessPlayerCompared.elo > chessPlayerToCompare.elo && chessPlayerCompared.age <= chessPlayerToCompare.age) ||
           (chessPlayerCompared.elo >= chessPlayerToCompare.elo && chessPlayerCompared.age < chessPlayerToCompare.age)
  });

  return !foundBetterPlayer;
}

/*
  The algorithm efficiency is n*log(n)
*/
export default function findChampionsImproved(chessPlayers: ChessPlayer[]) : ChessPlayer[] {
  const sanitizedChessPlayers = chessPlayers.filter((chessPlayer) => checkAge(chessPlayer) && checkElo(chessPlayer));
  const sortChessPlayersArray = sortChessPlayers(sanitizedChessPlayers);
  let bestYougerElo = 0;
  let championsArray = [];

  sortChessPlayersArray.forEach((chessPlayerToCompare, indexPosition) => {
    let isChampion = true;
    for(let i = indexPosition -1; i >= 0; i--) {
      if(
        bestYougerElo > chessPlayerToCompare.elo || 
        hasBetterPlayer(chessPlayerToCompare, sortChessPlayersArray[i])
      ) {
        isChampion = false;
        if(sortChessPlayersArray[indexPosition].elo > bestYougerElo) {
          bestYougerElo = sortChessPlayersArray[indexPosition].elo;
        }
        break;

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
          (chessPlayerCompared.elo >= chessPlayerToCompare.elo && chessPlayerCompared.age < chessPlayerToCompare.age)
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

