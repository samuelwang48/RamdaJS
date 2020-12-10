import {
  useWith, until, equals, pipe, when, modulo, not, gt, __,
  identity, defaultTo
} from 'ramda';

/**
 * Author: Samuel Wang
 * Original Author: https://github.com/rahul1995
 * License: GPL-3.0 or later
 *
 * To calculate x^n i.e. exponent(x, n) in O(log n) time in iterative way
 * n is an integer and n >= 0
 *
 * Explanation: https://en.wikipedia.org/wiki/Exponentiation_by_squaring
 *
 * Examples:
 * 2^3 = 8
 * 5^0 = 1
 *
 * Uses the fact that
 * exponent(x, n)
 *          = exponent(x*x, floor(n/2))   ; if n is odd
 *          = x*exponent(x*x, floor(n/2)) ; if n is even
 */

const exponent = (x, n) => {
  return useWith(
    (x, n, r) => {
      until(
        equals(0),
        (n) => {
          return pipe(
            when( pipe(modulo(__, 2), equals(0), not), (n) => {r *= x; return n;} ),
            (n) => Math.floor(n / 2),
            when( gt(__, 0), (n) => {x *= x; return n;} )
          )(n)
        }
      )(n);
      return r;
    },
    [
      identity,
      identity,
      identity,
    ]
  )(x, n, 1);
}

export { exponent }
