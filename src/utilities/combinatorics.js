/**
 * Returns all the permutations of the elements of an array.
 * @param list {[]} - the array the permutations are calculated from
 * @returns {Array}
 * Reference: https://gist.github.com/md2perpe/8210411
 */
export const PermutateArray = list => {
  // Empty list has one permutation
  if (list.length === 0)
    return [[]]
  
  let result = []
  
  for (let i = 0; i < list.length; i++) {
    // Clone list (kind of)
    const copy = Object.create(list)
    
    // Cut one element from list
    const head = copy.splice(i, 1)
    
    // Permute rest of list
    const rest = PermutateArray(copy)
    
    // Add head to each permutation of rest of list
    for (let j = 0; j < rest.length; j++) {
      const next = head.concat(rest[j])
      result.push(next)
    }
  }
  
  return result
}
