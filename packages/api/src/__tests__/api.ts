import { helloProduct, helloSum } from 'api'

describe('api', () => {
  it('says hello sum', () => {
    expect(helloSum(1, 1)).toEqual('hello 2')
  })
  it('says hello product', () => {
    expect(helloProduct(1, 3)).toEqual('hello 3')
  })
})
