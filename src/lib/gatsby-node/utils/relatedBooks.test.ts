import { compareBooks } from './relatedBooks'
import { Book } from 'types/book'

const testBook = {
  author: 'Author',
  tags: [
    'genre-romance',
    'sub-nature',
    'sub-medical',
    'pub-great-ideas',
    'type-paperback',
  ],
} as Book

describe('compareBooks', () => {
  it('Adds 3 points for matching authors', () => {
    expect(
      compareBooks(testBook, {
        author: 'Author',
      } as Book)
    ).toEqual(3)
  })

  it('Adds 2 points for matching genre', () => {
    expect(
      compareBooks(testBook, {
        tags: ['genre-romance'],
      } as Book)
    ).toEqual(2)
  })

  it('Adds 2 points for matching subject', () => {
    expect(
      compareBooks(testBook, {
        tags: ['sub-nature'],
      } as Book)
    ).toEqual(2)
  })

  it('Adds 1 point for matching publication', () => {
    expect(
      compareBooks(testBook, {
        tags: ['pub-great-ideas'],
      } as Book)
    ).toEqual(1)
  })

  it('Adds 1 point for matching type', () => {
    expect(
      compareBooks(testBook, {
        tags: ['type-paperback'],
      } as Book)
    ).toEqual(1)
  })

  it('Totals points', () => {
    expect(
      compareBooks(testBook, {
        author: 'Author',
        tags: ['type-paperback'],
      } as Book)
    ).toEqual(4)
    expect(
      compareBooks(testBook, {
        author: 'Author',
        tags: ['sub-nature', 'sub-medical', 'type-paperback'],
      } as Book)
    ).toEqual(8)
    expect(
      compareBooks(testBook, {
        tags: ['genre-romance', 'sub-medical'],
      } as Book)
    ).toEqual(4)
  })

  it('Does not count irrelevent tags', () => {
    expect(
      compareBooks(testBook, {
        author: 'Alternative',
        tags: ['type-paperback'],
      } as Book)
    ).toEqual(1)
    expect(
      compareBooks(testBook, {
        author: 'Alternative',
        tags: ['type-hardback', 'sub-medical', 'sub-diy'],
      } as Book)
    ).toEqual(2)
  })
})
