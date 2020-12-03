import * as R from 'ramda';

/*
    author: Samuel Wang
    original author: PatOnTheBack
    license: GPL-3.0 or later

    Modified from:
        https://github.com/TheAlgorithms/Python/blob/master/maths/abs.py

    This script will find the absolute value of a number.

    More about absolute values:
        https://en.wikipedia.org/wiki/Absolute_value
*/

const absVal = (num) => R.pipe(
  R.ifElse(
    R.lt(R.__, 0),
    R.subtract(0, R.__),
    R.identity
  )
)(num);

export { absVal }
