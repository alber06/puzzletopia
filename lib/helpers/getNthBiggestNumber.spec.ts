import getNthBiggestNumber from './getNthBiggestNumber'

describe('getNthBiggestNumber', () => {
  it('should return the 300th largest number from the array', () => {
    const puzzleNumbers = Array.from({ length: 500 }, (value, index) => index)
    const result = getNthBiggestNumber(puzzleNumbers, 300)

    expect(result).toBe(200)
  })
})