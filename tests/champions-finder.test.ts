import findChampions, { checkAge, checkElo } from '../src/champions-finder';

describe('testing findChampions function', () => {
  test('empty chess player array should return no empty array', () => {
    expect(
      findChampions([])
    ).toStrictEqual([]);
  });
});

describe('testing check age function', () => {
  test('a valid age should return true', () => {
    expect(
      checkAge({elo: 12, age: 33})
    ).toBe(true);
  });

  test('a negative age should return false', () => {
    expect(
      checkAge({elo: 12, age: -15})
    ).toBe(false);
  });


  test('an age equal to 0 should return false', () => {
    expect(
      checkAge({elo: 12, age: 0})
    ).toBe(false);
  });
});

describe('testing check ELO function', () => {
  test('a valid ELO score should return true', () => {
    expect(
      checkElo({elo: 1500, age: 33})
    ).toBe(true);
  });

  test('an ELO score below the threshold should return false', () => {
    expect(
      checkElo({elo: 99, age: 33})
    ).toBe(false);
  });

   test('a negative ELO score should return false', () => {
    expect(
      checkElo({elo: -150, age: 33})
    ).toBe(false);
  });


  test('an ELO score equal to 100 should return true', () => {
    expect(
      checkElo({elo: 100, age: 33})
    ).toBe(true);
  });
});