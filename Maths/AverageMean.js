import { converge, divide, sum, length } from 'ramda';

/*
    Author: Samuel Wang
    Original Author: PatOnTheBack
    License: GPL-3.0 or later

    Modified from:
        https://github.com/TheAlgorithms/Python/blob/master/maths/average.py

    This script will find the average (mean) of an array of numbers.

    More about mean:
        https://en.wikipedia.org/wiki/Mean
*/

const mean = (n) => converge(
  divide,
  [
    sum,
    length
  ]
)(n);

export { mean }
