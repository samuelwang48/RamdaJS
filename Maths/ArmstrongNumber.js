import {
  __, T, converge, useWith, toString, split, map, identity,
  add, cond, pipe, type, equals, not, lt, length
} from 'ramda';

/**
 * Author: Samuel Wang
 * Original Author: dephraiim
 * License: GPL-3.0 or later
 *
 * An Armstrong number is equal to the sum of the cubes of its digits.
 * For example, 370 is an Armstrong number because 3*3*3 + 7*7*7 + 0*0*0 = 370.
 * An Armstrong number is often called Narcissistic number.
 *
 */

const armstrongNumber = (n) => pipe(
  cond([
    [pipe(type, equals('Number'), not), () => false],
    [lt(__, 0), () => false],
    [T, converge(
      equals,
      [
        useWith(
          (a) => a.reduce((acc, current, index, array) => add(acc, Math.pow(current, length(array))), 0),
          [
            pipe(
              toString,
              split(''),
              map(parseInt)
            )
          ]
        ),
        identity
      ]
    )]
  ])
)(n);

export { armstrongNumber }
