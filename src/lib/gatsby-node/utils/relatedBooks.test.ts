import { compareBooks } from './relatedBooks'
import { RawBook } from 'types/book'

const testBook = {
  frontmatter: {
    author: 'Author',
    tags: [
      'genre-romance',
      'sub-nature',
      'sub-medical',
      'pub-great-ideas',
      'type-paperback',
    ],
  },
} as RawBook

describe('compareBooks', () => {
  it('Adds 3 points for matching authors', () => {
    expect(
      compareBooks(testBook, {
        frontmatter: {
          author: 'Author',
        },
      } as RawBook)
    ).toEqual(3)
  })

  it('Adds 2 points for matching genre', () => {
    expect(
      compareBooks(testBook, {
        frontmatter: {
          tags: ['genre-romance'],
        },
      } as RawBook)
    ).toEqual(2)
  })

  it('Adds 2 points for matching subject', () => {
    expect(
      compareBooks(testBook, {
        frontmatter: {
          tags: ['sub-nature'],
        },
      } as RawBook)
    ).toEqual(2)
  })

  it('Adds 1 point for matching publication', () => {
    expect(
      compareBooks(testBook, {
        frontmatter: {
          tags: ['pub-great-ideas'],
        },
      } as RawBook)
    ).toEqual(1)
  })

  it('Adds 1 point for matching type', () => {
    expect(
      compareBooks(testBook, {
        frontmatter: {
          tags: ['type-paperback'],
        },
      } as RawBook)
    ).toEqual(1)
  })

  it('Totals points', () => {
    expect(
      compareBooks(testBook, {
        frontmatter: {
          author: 'Author',
          tags: ['type-paperback'],
        },
      } as RawBook)
    ).toEqual(4)
    expect(
      compareBooks(testBook, {
        frontmatter: {
          author: 'Author',
          tags: ['sub-nature', 'sub-medical', 'type-paperback'],
        },
      } as RawBook)
    ).toEqual(8)
    expect(
      compareBooks(testBook, {
        frontmatter: {
          tags: ['genre-romance', 'sub-medical'],
        },
      } as RawBook)
    ).toEqual(4)
  })

  it('Does not count irrelevent tags', () => {
    expect(
      compareBooks(testBook, {
        frontmatter: {
          author: 'Alternative',
          tags: ['type-paperback'],
        },
      } as RawBook)
    ).toEqual(1)
    expect(
      compareBooks(testBook, {
        frontmatter: {
          author: 'Alternative',
          tags: ['type-hardback', 'sub-medical', 'sub-diy'],
        },
      } as RawBook)
    ).toEqual(2)
  })
})
