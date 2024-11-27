import findChampions, { checkAge, checkElo } from '../src/champions-finder';

describe('testing findChampions function', () => {
  test('empty chess player array should return no empty array', () => {
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
    ).toEqual(chessPlayers);
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