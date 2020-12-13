import {
  converge, filter, pipe, add, times, identity, defaultTo
} from 'ramda';

/**
 * Author: Samuel Wang
 * Original Author: dephraiim
 * License: GPL-3.0 or later
 *
 * More on Factors:
 *      https://www.mathsisfun.com/definitions/factor.html
 *
 */

const factorsOfANumber = (n) => {
  return converge(
    (a, b) => filter((n) => b % n === 0)(a),
    [
      pipe(
        defaultTo(0),
        add(1),
        times(identity)
      ),
      identity
    ]
  )(n);
}

export { factorsOfANumber }
