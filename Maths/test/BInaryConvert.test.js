import { BinaryConvert } from '../BinaryConvert'

describe('Binary Convert', () => {
  it('should return the correct value #1', () => {
    expect(BinaryConvert(12)).toBe(1100)
  })
  it('should return the correct value #2', () => {
    expect(BinaryConvert(817621)).toBe(11000111100111010101)
  })
  it('should return the correct value of the sum from two number', () => {
    expect(BinaryConvert(12 + 2)).toBe(1110)
  })
})
