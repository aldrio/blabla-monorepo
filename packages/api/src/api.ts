import { sum, product } from '@blabla/library'

export const helloProduct = (a: number, b: number): string =>
  `hello ${product(a, b)}`
export const helloSum = (a: number, b: number): string => `hello ${sum(a, b)}`
