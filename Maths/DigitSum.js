import {
  converge, until, equals, identity, always
} from 'ramda';

/**
 * Author: Samuel Wang
 * Original Author: https://github.com/dephraiim
 * License: GPL-3.0 or later
 *
 * program to find sum of digits of a number
 *
 * function which would calculate sum and return it
 */


const digitSum = (n) => {
  return converge(
    (n, r) => {
      until(
        equals(0),
        (n) => {
          r += n % 10;
          return parseInt(n / 10)
        }
      )(n);
      return r;
    },
    [
      identity,
      always(0)
    ]
  )(n);
}

export { digitSum }
