import { convertPxToRem } from "./convertPxToRem"

describe(`util-${convertPxToRem.name}`, () => {
  it("should convert from px to rem for htmlFontSize 16", () => {
    const htmlFontSize = 16
    const input = 16
    expect(convertPxToRem(htmlFontSize, input)).toBe("1rem")
  })

  it("should convert from px to rem for htmlFontSize 16 and negative value", () => {
    const htmlFontSize = 16
    const input = -16
    expect(convertPxToRem(htmlFontSize, input)).toBe("-1rem")
  })

  it("should handle only font size", () => {
    const htmlFontSize = 16
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(convertPxToRem(htmlFontSize, undefined)).toBe("0rem")
  })

  it("should convert from px to rem for htmlFontSize 10", () => {
    const htmlFontSize = 10
    const input = 16
    expect(convertPxToRem(htmlFontSize, input)).toBe("1.6rem")
  })

  it("should convert from px to rem for htmlFontSize 10 and negative value", () => {
    const htmlFontSize = 10
    const input = -16
    expect(convertPxToRem(htmlFontSize, input)).toBe("-1.6rem")
  })

  it("should handle trailing zeroes", () => {
    const htmlFontSize = 16
    expect(convertPxToRem(htmlFontSize, 11.36)).toBe("0.71rem")
    expect(convertPxToRem(htmlFontSize, 11.2)).toBe("0.7rem")
  })

  it("should handle 0 as value", () => {
    const htmlFontSize = 16
    expect(convertPxToRem(htmlFontSize, 0)).toBe("0rem")
  })

  it("should handle topBottom and rightLeft", () => {
    const htmlFontSize = 16
    expect(convertPxToRem(htmlFontSize, 16, 8)).toBe("1rem 0.5rem")
  })

  it("should handle top, right and bottom", () => {
    const htmlFontSize = 16
    expect(convertPxToRem(htmlFontSize, 16, 8, 4)).toBe("1rem 0.5rem 0.25rem")
  })

  it("should handle top, right, bottom and left", () => {
    const htmlFontSize = 16
    expect(convertPxToRem(htmlFontSize, 16, 8, 4, 32)).toBe(
      "1rem 0.5rem 0.25rem 2rem",
    )
  })

  it("should handle negative top, right, bottom and left", () => {
    const htmlFontSize = 16
    expect(convertPxToRem(htmlFontSize, -16, -8, -4, -32)).toBe(
      "-1rem -0.5rem -0.25rem -2rem",
    )
  })
})
