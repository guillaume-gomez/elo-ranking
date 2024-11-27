import findChampions, { checkAge } from '../src/champions-finder';

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