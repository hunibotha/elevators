import {PermutateArray} from "./combinatorics"

test("permutation", function () {
  const collection = ['a', 'b', 'c']
  const expectedResult = [
    ['a', 'b', 'c'],
    ['a', 'c', 'b'],
    ['b', 'a', 'c'],
    ['b', 'c', 'a'],
    ['c', 'a', 'b'],
    ['c', 'b', 'a']
  ]
  
  expect(PermutateArray(collection)).toEqual(expectedResult)
})
