/**
 * Generate a random number of occurrences between 1 and limit
 * 
 * @param {number} limit Upper limit for generated numbers  
 * @param {number} occurrences Number of numbers to generate
 * @returns {Array<number>}
 */
const generateRandomNumbers = (limit: number, occurrences: number) => {
  const randomNumbers: Array<number> = []

  for (let i = 0; i < occurrences; i++) {
    randomNumbers.push(Math.floor(Math.random() * limit))
  }

  return randomNumbers
}

export default generateRandomNumbers