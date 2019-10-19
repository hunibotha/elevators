/**
 * Returns a unique string.
 * Reference: https://gist.github.com/gordonbrander/2230317
 * @returns {string}
 */
export const generateUniqueString = () => {
  return Math.random().toString(36).substr(2, 9)
}
