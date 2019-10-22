/**
 * Returns a unique string.
 * Reference: https://gist.github.com/gordonbrander/2230317
 * @returns {string}
 */
export const generateUniqueString = () => {
  return Math.random().toString(36).substr(2, 9)
}

/**
 * Get all indexes of the occurrences of a value inside an array.
 * @param arr
 * @param val
 * @returns {[]}
 * Reference: https://stackoverflow.com/questions/20798477/how-to-find-index-of-all-occurrences-of-element-in-array/20798567
 */
export const getAllIndexes = (arr, val) => {
  let indexes = [], i
  for(i = 0; i < arr.length; i++)
    if (arr[i] === val)
      indexes.push(i)
  return indexes
}

export const arrayUnique = array => [...new Set(array)]
