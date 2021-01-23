import { product, sum } from "library";

describe("library", () => {
  it("calcs product", () => {
    expect(product(3, 4)).toEqual(12);
  });
  it("calcs sum", () => {
    expect(sum(1, 3)).toEqual(4);
  });
});
