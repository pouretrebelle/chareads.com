/**
 * ISBNs take the form [978-]GG-PPPP-TTT-C
 * but are represented here as numbers with the dashes removed
 *
 * The parts stand for:
 * [] - a GS1 prefix only used in ISBN-13s, at present only
 *      978 and 979 are in use, with the vast majority of
 *      books using 978
 * G - group
 * P - publisher
 * T - title
 * C - checksum
 *
 * The checksum of ISBN-10s and ISBN-13s is derived from
 * a calculation of the G, P, and T sections of the ISBN.
 *
 * To convert between the two values we take the main 9
 * digits and run them through checkLastDigit, for ISBN-10s
 * it is possible to have a final digit of 10, represented
 * as an X.
 *
 * Method from https://github.com/coolaj86/isbnjs
 */

const checkLastDigit = (isbn: string): string => {
  let c: number, n: number
  if (isbn.match(/^\d{9}[\dX]?$/)) {
    c = 0
    for (n = 0; n < 9; n += 1) {
      c += (10 - n) * Number(isbn.charAt(n))
    }
    c = (11 - (c % 11)) % 11
    return c === 10 ? 'X' : String(c)
  } else if (isbn.match(/(?:978|979)\d{9}[\dX]?/)) {
    c = 0
    for (n = 0; n < 12; n += 2) {
      c += Number(isbn.charAt(n)) + 3 * Number(isbn.charAt(n + 1))
    }
    return String((10 - (c % 10)) % 10)
  }
  return null
}

const addLastDigit = (isbn9: string): string =>
  `${isbn9}${checkLastDigit(isbn9)}`

export const makeIsbn10 = (isbn: string): string => {
  if (isbn.length === 10) return isbn

  return addLastDigit(isbn.slice(3, 12))
}

export const makeIsbn13 = (isbn: string): string => {
  if (isbn.length === 13) return isbn

  return addLastDigit(`978${isbn.slice(0, 9)}`)
}
