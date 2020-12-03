import { __, pipe, ifElse, lt, subtract, identity } from 'ramda';

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

const absVal = (num) => pipe(
  ifElse(
    lt(__, 0),
    subtract(0, __),
    identity
  )
)(num);

export { absVal }
