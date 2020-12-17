import * as R from 'ramda';

const FibonacciIterative = (number) => {
  return R.cond([
    [R.equals(R.__, 0), ()=>[]],
    [R.equals(R.__, 1), ()=>[1]],
    [R.equals(R.__, 2), ()=>[1, 1]],
    [
      R.T,
      R.converge(
        (number, i, table) => {
          R.until(
            R.equals(number),
            (i) => R.converge(
              (n, table) => table.push(n),
              [
                R.converge(R.add, [R.nth(i - 1), R.nth(i - 2)]),
                R.identity
              ]
            )(table)
          )(i);
          return table;
        },
        [
          R.identity,
          R.always(2),
          R.always([1, 1])
        ]
      )
    ]
  ])(number);
}


const FibonacciRecursive = (number) => {
  const f = R.curryN(1 + 2, R.call)(
    (table, n) => {
      return R.cond([
        [R.equals(0), () => f(R.append(1, table), n)],
        [R.equals(1), () => f(R.append(1, table), n)],
        [R.equals(n), () => table],
        [R.T, (i) => {
          return f(
            R.converge(
              R.append,
              [
                R.converge(R.add, [R.nth(i - 1), R.nth(i - 2)]),
                R.identity
              ]
            )(table),
            n
          );
        }]
      ])(R.length(table))
    }
  )

  return f([], number);
}

console.log(5, FibonacciRecursive(5))
console.log(12, FibonacciRecursive(12))



const dict = new Map()

const FibonacciRecursiveDP = (stairs) => {
  if (stairs <= 0) return 0
  if (stairs === 1) return 1

  // Memoize stair count
  if (dict.has(stairs)) return dict.get(stairs)

  const res =
    FibonacciRecursiveDP(stairs - 1) + FibonacciRecursiveDP(stairs - 2)

  dict.set(stairs, res)

  return res
}

// Algorithms
// Calculates Fibonacci(n) such that Fibonacci(n) = Fibonacci(n - 1) + Fibonacci(n - 2)
// Fibonacci(0) = Fibonacci(1) = 1
// Uses a bottom up dynamic programming approach
// Solve each sub-problem once, using results of previous sub-problems
// which are n-1 and n-2 for Fibonacci numbers
// Although this algorithm is linear in space and time as a function
// of the input value n, it is exponential in the size of n as
// a function of the number of input bits
// @Satzyakiz

const FibonacciDpWithoutRecursion = (number) => {
  return R.converge(
    (number, i, table) => {
      R.until(
        R.equals(number),
        (i) => R.converge(
          (n, table) => table.push(n),
          [
            R.converge(R.add, [R.nth(i - 1), R.nth(i - 2)]),
            R.identity
          ]
        )(table)
      )(i);
      return table;
    },
    [
      R.identity,
      R.always(2),
      R.always([1, 1])
    ]
  )(number);
}

// Using Matrix exponentiation to find n-th fibonacci in O(log n) time

const copyMatrix = (A) => {
  return A.map(row => row.map(cell => cell))
}

const Identity = (size) => {
  const I = Array(size).fill(null).map(() => Array(size).fill())
  return I.map((row, rowIdx) => row.map((_col, colIdx) => {
    return rowIdx === colIdx ? 1 : 0
  }))
}

// A of size (l x m) and B of size (m x n)
// product C will be of size (l x n)
const matrixMultiply = (A, B) => {
  A = copyMatrix(A)
  B = copyMatrix(B)
  const l = A.length
  const m = B.length
  const n = B[0].length // Assuming non-empty matrices
  const C = Array(l).fill(null).map(() => Array(n).fill())
  for (let i = 0; i < l; i++) {
    for (let j = 0; j < n; j++) {
      C[i][j] = 0
      for (let k = 0; k < m; k++) {
        C[i][j] += A[i][k] * B[k][j]
      }
    }
  }
  return C
}

// A is a square matrix
const matrixExpo = (A, n) => {
  A = copyMatrix(A)
  if (n === 0) return Identity(A.length) // Identity matrix
  if (n === 1) return A

  // Just like Binary exponentiation mentioned in ./BinaryExponentiationIterative.js
  let result = Identity(A.length)
  while (n > 0) {
    if (n % 2 !== 0) result = matrixMultiply(result, A)
    n = Math.floor(n / 2)
    if (n > 0) A = matrixMultiply(A, A)
  }
  return result
}

const FibonacciMatrixExpo = (n) => {
  // F(0) = 0, F(1) = 1
  // F(n) = F(n-1) + F(n-2)
  // Consider below matrix multiplication:

  // | F(n) |   |1  1|   |F(n-1)|
  // |      | = |    | * |      |
  // |F(n-1)|   |1  0|   |F(n-2)|

  // F(n, n-1) = pow(A, n-1) * F(1, 0)

  if (n === 0) return 0

  const A = [
    [1, 1],
    [1, 0]
  ]
  const poweredA = matrixExpo(A, n - 1) // A raise to the power n
  let F = [
    [1],
    [0]
  ]
  F = matrixMultiply(poweredA, F)
  return F[0][0]
}

export { FibonacciDpWithoutRecursion }
export { FibonacciIterative }
export { FibonacciRecursive }
export { FibonacciRecursiveDP }
export { FibonacciMatrixExpo }
