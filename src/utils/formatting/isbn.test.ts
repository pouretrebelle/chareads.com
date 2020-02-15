import { makeIsbn10, makeIsbn13 } from './isbn'

const exampleMap = {
  '9781781257661': '1781257663',
  '9781591846352': '1591846358',
  '9780140449334': '0140449337',
  '9781786075192': '1786075199',
  '9781509892846': '1509892842',
  '9780439420891': '043942089X',
}

describe('makeIsbn10', () => {
  it('returns the same if length is 10', () => {
    Object.values(exampleMap).map((isbn10: string): void => {
      expect(makeIsbn10(isbn10)).toEqual(isbn10)
    })
  })
  it('converts from ISBN-13 correctly', () => {
    Object.entries(exampleMap).map(
      ([isbn13, isbn10]: [string, string]): void => {
        expect(makeIsbn10(isbn13)).toEqual(isbn10)
      }
    )
  })
})

describe('makeIsbn13', () => {
  it('returns the same if length is 13', () => {
    Object.keys(exampleMap).map((isbn13: string): void => {
      expect(makeIsbn13(isbn13)).toEqual(isbn13)
    })
  })
  it('converts from ISBN-10 correctly', () => {
    Object.entries(exampleMap).map(
      ([isbn13, isbn10]: [string, string]): void => {
        expect(makeIsbn13(isbn10)).toEqual(isbn13)
      }
    )
  })
})
