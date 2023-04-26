import generateRandomNumbers from './generateRandomNumbers'

describe('generateRandomNumbers', () => {
  it('should return an array of random numbers between 1 and limit', () => {
    const limit = 10
    const occurrences = 3
    const randomNumbers = generateRandomNumbers(limit, occurrences)

    expect(randomNumbers.length).toBe(occurrences)
    expect(randomNumbers.every(number => number <= limit && number >= 1)).toBe(true)
    
  })
})