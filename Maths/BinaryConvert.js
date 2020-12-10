import {
  pipe, converge, times, divide, inc, identity, reverse, join
} from 'ramda';

/**
 * Author: Samuel Wang
 * Original Author: https://github.com/arwysyah
 * License: GPL-3.0 or later
 */

const BinaryConvert = (n) => pipe(
  converge(
    (a, b) => times(
      (x) => parseInt( divide(b, 2 ** x ))  % 2, a
    ),
    [
      pipe(
        Math.log2,
        parseInt,
        inc
      ),
      identity
    ]
  ),
  reverse,
  join(''),
  Number
)(n);

export { BinaryConvert }
