import findChampions from '../src/champions-finder';

describe('testing findChampions file', () => {
  test('empty chess player array should return no empty array', () => {
    expect(findChampions([])).toBe([]);
  });
});