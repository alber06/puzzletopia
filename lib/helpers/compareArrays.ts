/**
 * Compare the number of elements and the elements of two arrays
 * 
 * @param {Array<number>} a Number array to compare
 * @param {Array<number>} b Number array to compare
 * @returns {boolean}
 */
const compareArrays = (a: number[], b: number[]) => {
  return a.length === b.length && a.every((value) => b.includes(value));
}

export default compareArrays