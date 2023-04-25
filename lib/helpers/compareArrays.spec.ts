import compareArrays from './compareArrays'

describe('compareArrays', () => {
  it('should return true if arrays contain same numbers', () => {
    const a = [1, 2, 3]
    const b = [3, 1, 2]
    const areEqual = compareArrays(a, b)

    expect(areEqual).toBe(true)
  })
})