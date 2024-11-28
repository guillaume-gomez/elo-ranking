import findChampions, { checkAge, checkElo, sortChessPlayers } from '../src/champions-finder';

describe('testing findChampions function', () => {
  test('empty chess player array should return empty array', () => {
    expect(
      findChampions([])
    ).toStrictEqual([]);
  });

  test('two players with the same age should return the player with the highest ELO score', () => {
    const chessPlayers = [
      {username: "John", elo: 1500, age: 18},
      {username: "Pascale", elo: 1800, age: 18}
    ];
    expect(
      findChampions(chessPlayers)
    ).toEqual([{username: "Pascale", elo: 1800, age: 18}]);
  });

  test('two players with the same age and the same score should return both', () => {
    const chessPlayers = [
      {username: "John", elo: 1800, age: 18},
      {username: "Pascale", elo: 1800, age: 18}
    ];
    expect(
      findChampions(chessPlayers)
    ).toEqual(chessPlayers);
  });

  test('two players with the same ELO score and not the same age should return both ', () => {
    const chessPlayers = [
      {username: "John", elo: 1500, age: 19},
      {username: "Pascale", elo: 1500, age: 18}
    ];
    expect(
      findChampions(chessPlayers)
    ).toEqual([{username: "Pascale", elo: 1500, age: 18}]);
  });

  test('two players should return the player with the higher score', () => {
    const chessPlayers = [
      {username: "John", elo: 1800, age: 19},
      {username: "Pascale", elo: 1500, age: 18}
    ];
    expect(
      findChampions(chessPlayers)
    ).toEqual([
      {username: "Pascale", elo: 1500, age: 18},
      {username: "John", elo: 1800, age: 19},
      ]);
  });

   test('two players with the same name', () => {
    const chessPlayers = [
      {username: "Pascale", elo: 1800, age: 19},
      {username: "Pascale", elo: 1500, age: 18},
      {username: "Robin", elo: 2000, age: 19}
    ];
    expect(
      findChampions(chessPlayers)
    ).toEqual([
      {username: "Pascale", elo: 1500, age: 18},
      {username: "Robin", elo: 2000, age: 19}
    ]);
  });

  test('test same age but not same ELO and same ELO but not the same age', () => {
    const chessPlayers = [
      {username: "Francois", elo: 1500, age: 32},
      {username: "Kevin", elo: 1501, age: 32},
      {username: "Adele", elo: 1500, age: 31}
    ];
    expect(
      findChampions(chessPlayers)
    ).toEqual([
      {username: "Adele", elo: 1500, age: 31},
      {username: "Kevin", elo: 1501, age: 32},
    ]);
  });


  test('show limit of the algorithm where same ELO and same age gives 2 champions', () => {
    const chessPlayers = [
      {username: "Francois", elo: 1500, age: 32}, // same Elo as Francois but not strictly younger than him
      {username: "Sarah", elo: 1501, age: 33}, // better ELO 
      {username: "Justine", elo: 1500, age: 32} // same Elo as Francois but not strictly younger than him
    ];
    expect(
      findChampions(chessPlayers)
    ).toEqual([
        {username: "Francois", elo: 1500, age: 32},
        {username: "Justine", elo: 1500, age: 32},
        {username: "Sarah", elo: 1501, age: 33},
      ]);
  });

  test('show limit of the algorithm where youngest player is a champion', () => {
    const chessPlayers = [
      {username: "Francois", elo: 2000, age: 16},
      {username: "Sarah", elo: 2000, age: 17}, // is not a champion because she is the oldest 
      {username: "Justine", elo: 110, age: 15} // is a champion because shes is the youngest (even though the low ELO score)
    ];
    expect(
      findChampions(chessPlayers)
    ).toEqual([
        {username: "Justine", elo: 110, age: 15},
        {username: "Francois", elo: 2000, age: 16},
    ]);
  });

  test('several players should return the champions', () => {
    const chessPlayers = [
      {username: "Pascale", elo: 1500, age: 18},
      {username: "Henri", elo: 1802, age: 22},
      {username: "Julia", elo: 2000, age: 28},
      {username: "Robin", elo: 2002, age: 42},
      {username: "Ryan", elo: 1800, age: 25},
      {username: "Sergio", elo: 2000, age: 42},
      {username: "Pedro", elo: 1501, age: 18},
      {username: "John", elo: 1800, age: 19},
    ];
    expect(
      findChampions(chessPlayers)
    ).toEqual([
      {username: "Pedro", elo: 1501, age: 18},
      {username: "John", elo: 1800, age: 19},
      {username: "Henri", elo: 1802, age: 22},
      {username: "Julia", elo: 2000, age: 28},
      {username: "Robin", elo: 2002, age: 42},
    ]);
  });

  test('several players with wrong age or Elo score', () => {
    const chessPlayers = [
      {username: "Pascale", elo: 1500, age: 18},
      {username: "Henri", elo: 1802, age: 22},
      {username: "Julia", elo: 2000, age: 28},
      {username: "Robin", elo: 2002, age: -12},
      {username: "Ryan", elo: 1800, age: 25},
      {username: "Sergio", elo: 2000, age: 42},
      {username: "Pedro", elo: 100, age: 18},
      {username: "John", elo: 85, age: 5},
    ];
    expect(
      findChampions(chessPlayers)
    ).toEqual([
       {username: "Pascale", elo: 1500, age: 18},
       {username: "Henri", elo: 1802, age: 22},
       {username: "Julia", elo: 2000, age: 28},
    ]);
  });

test('several players', () => {
    const chessPlayers = [
     {username: "John", elo: 1500, age: 33},
     {username: "Louis", elo: 1000, age: 33},
     {username: "Julia", elo: 2000, age: 42},
     {username: "Carla", elo: 2020, age: 25},
     {username: "Ellis", elo: 1880, age: 30},
     {username: "Henri", elo: 1880, age: 45},
    ];
    expect(
      findChampions(chessPlayers)
    ).toEqual([
      {username: "Carla", elo: 2020, age: 25}
    ]);
  });

});

describe('testing check age function', () => {
  test('a valid age should return true', () => {
    expect(
      checkAge({username: "John", elo: 12, age: 33})
    ).toBe(true);
  });

  test('a negative age should return false', () => {
    expect(
      checkAge({username: "John", elo: 12, age: -15})
    ).toBe(false);
  });


  test('an age equal to 0 should return false', () => {
    expect(
      checkAge({username: "John", elo: 12, age: 0})
    ).toBe(false);
  });
});

describe('testing check ELO function', () => {
  test('a valid ELO score should return true', () => {
    expect(
      checkElo({username: "John", elo: 1500, age: 33})
    ).toBe(true);
  });

  test('an ELO score below the threshold should return false', () => {
    expect(
      checkElo({username: "John", elo: 99, age: 33})
    ).toBe(false);
  });

   test('a negative ELO score should return false', () => {
    expect(
      checkElo({username: "John", elo: -150, age: 33})
    ).toBe(false);
  });


  test('an ELO score equal to 100 should return true', () => {
    expect(
      checkElo({username: "John", elo: 100, age: 33})
    ).toBe(true);
  });
});

describe('testing sort function', () => {
  test('an empty array should return an empty array', () => {
    expect(
      sortChessPlayers([])
    ).toEqual([]);
  });

  test('one chessPlayer should return himself', () => {
    expect(
      sortChessPlayers([{username: "John", elo: 99, age: 33}])
    ).toEqual([{username: "John", elo: 99, age: 33}]);
  });

   test('two players with the same ELO score but not the same age', () => {
    const chessPlayers = [
     {username: "John", elo: 1000, age: 45},
     {username: "Louis", elo: 1000, age: 33},
    ]
    expect(
      sortChessPlayers(chessPlayers)
    ).toEqual([
      {username: "Louis", elo: 1000, age: 33},
      {username: "John", elo: 1000, age: 45},
     ]);
  });

  test('two players with the same age but not the same ELO score', () => {
    const chessPlayers = [
     {username: "Louis", elo: 1000, age: 33},
     {username: "John", elo: 1500, age: 33},
    ]
    expect(
      sortChessPlayers(chessPlayers)
    ).toEqual([
      {username: "John", elo: 1500, age: 33},
      {username: "Louis", elo: 1000, age: 33},
    ]);
  });


  test('two players with the same age but not the same ELO score', () => {
    const chessPlayers = [
     {username: "John", elo: 1500, age: 33},
     {username: "Louis", elo: 1000, age: 33},
     {username: "Julia", elo: 2000, age: 42},
     {username: "Carla", elo: 2020, age: 25},
     {username: "Ellis", elo: 1880, age: 30},
     {username: "Henri", elo: 1880, age: 45},
    ]
    expect(
      sortChessPlayers(chessPlayers.slice())
    ).toEqual(
      [
      { username: 'Carla', elo: 2020, age: 25 },
      { username: 'Ellis', elo: 1880, age: 30 },
      { username: 'John', elo: 1500, age: 33 },
      { username: 'Louis', elo: 1000, age: 33 },
      { username: 'Julia', elo: 2000, age: 42 },
      { username: 'Henri', elo: 1880, age: 45 }

    ]);
  });

});