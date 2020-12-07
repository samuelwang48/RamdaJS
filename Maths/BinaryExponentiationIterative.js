import * as R from 'ramda';

// To calculate x^n i.e. exponent(x, n) in O(log n) time in iterative way
// n is an integer and n >= 0

// Explanation: https://en.wikipedia.org/wiki/Exponentiation_by_squaring

// Examples:
// 2^3 = 8
// 5^0 = 1

// Uses the fact that
// exponent(x, n)
//          = exponent(x*x, floor(n/2))   ; if n is odd
//          = x*exponent(x*x, floor(n/2)) ; if n is even

const exponent = (x, n) => {
  let ans = 1
  while (n > 0) {
    console.log(':', n);
    if (n % 2 !== 0) ans *= x
    n = Math.floor(n / 2)
    if (n > 0) x *= x
  }
  return ans
}

const exponent_ = (x, n) => {
  return R.useWith(
    (x, n, r) => {
      R.until(
        R.equals(0),
        (n) => {
          return R.pipe(
            R.when( R.pipe(R.modulo(R.__, 2), R.equals(0), R.not), (n) => {r *= x; return n;} ),
            (n) => Math.floor(n / 2),
            R.when( R.gt(R.__, 0), (n) => {x *= x; return n;} )
          )(n)
        }
      )(n);
      return r;
    },
    [
      R.identity,
      R.identity,
      R.defaultTo(1)
    ]
  )(x, n, undefined)
  
}


console.log(exponent_.call(null, 2, 3))
console.log('----------')
console.log(exponent.call(null, 2, 3))

export { exponent }
