import * as R from 'ramda';

/**
 * Author: Samuel Wang
 * Original Author: https://github.com/arwysyah
 * License: GPL-3.0 or later
 */

const BinaryConvert = (n) => R.pipe(
  R.converge(
    (a, b) => R.times(
      (x) => parseInt( R.divide(b, 2 ** x ))  % 2, a
    ),
    [
      R.pipe(
        Math.log2,
        parseInt,
        R.inc
      ),
      R.identity
    ]
  ),
  R.reverse,
  R.join(''),
  Number
)(n);


//console.log(BinaryConvert(8))
//console.log(BinaryConvert(12))
//console.log(BinaryConvert(817621))

export { BinaryConvert }
