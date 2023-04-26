const getNthBiggestNumber = (puzzleNumbers: number[], position: number) => {
  const sortedPuzzleNumbers = puzzleNumbers.sort((a: number, b: number)=> b - a)

  return sortedPuzzleNumbers[position - 1]
}

export default getNthBiggestNumber