import childProcess from 'child_process'

import { sum, product } from '@blabla/library'

export const helloProduct = (a: number, b: number): string =>
  `hello ${product(a, b)}`
export const helloSum = (a: number, b: number): string => `hello ${sum(a, b)}`

/**
 * Makes a cow say something
 * Example of using a native dependency managed by nix
 */
export const cowsay = (msg: string): string => {
  const output = childProcess.execFileSync('cowsay', [msg], {
    stdio: 'pipe',
    encoding: 'utf-8',
  })
  return output
}
