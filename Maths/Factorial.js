import {
  cond, lt, __, isNil, equals, T, pipe, replace, reduce, times
} from 'ramda';

/*
 *  Author: Samuel Wang
 *  Original Author: PatOnTheBack
 *  License: GPL-3.0 or later
 *
 *  Modified from:
 *      https://github.com/TheAlgorithms/Python/blob/master/maths/factorial_python.py
 *
 *  This script will find the factorial of a number provided by the user.
 *
 *  More about factorials:
 *      https://en.wikipedia.org/wiki/factorial
 */

const calcFactorial = (n) => {
  return cond([
    [lt(__, 0), () => 'Sorry, factorial does not exist for negative numbers.'],
    [isNil, () => 'Sorry, factorial does not exist for null or undefined numbers.'],
    [equals(0), () => 'The factorial of 0 is 1.'],
    [T, (n) => pipe(
      replace('${num}', n),
      replace('${factorial}', reduce((a, c) => a * c, 1)(times((i) => i + 1)(n)))
    )('The factorial of ${num} is ${factorial}')]
  ])(n)
}

export { calcFactorial }
