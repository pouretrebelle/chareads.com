import {
  compareBooks,
  getYearsBetweenDates,
  getSpanOfInfluence,
  DATE_MATCH_MAX_POINTS,
} from './compare'
import { Book } from 'types/book'

const currentTestDate = new Date('2020-01-01')
const testBook = {
  author: 'Author',
  tags: [
    'genre-romance',
    'sub-nature',
    'sub-medical',
    'pub-great-ideas',
    'type-paperback',
  ],
  dateBookPublished: new Date('2020-01-01'),
} as Book

describe('getYearsBetweenDates', () => {
  it('returns full years as expected', () => {
    expect(
      getYearsBetweenDates(new Date('2020-01-01'), new Date('2019-01-01'))
    ).toEqual(1)
    expect(
      getYearsBetweenDates(new Date('2020-01-01'), new Date('2010-01-01'))
    ).toEqual(10)
    expect(
      getYearsBetweenDates(new Date('2020-01-01'), new Date('1920-01-01'))
    ).toEqual(100)
  })
  it('returns months as expected', () => {
    expect(
      getYearsBetweenDates(new Date('2020-01-01'), new Date('2020-02-01'))
    ).toEqual(1 / 12)
    expect(
      getYearsBetweenDates(new Date('2020-07-01'), new Date('2010-01-01'))
    ).toEqual(10.5)
    expect(
      getYearsBetweenDates(new Date('2020-01-01'), new Date('1920-04-01'))
    ).toEqual(99.75)
  })
})

describe('getSpanOfInfluence', () => {
  it('returns span of influence', () => {
    expect(getSpanOfInfluence(new Date('2020-01-01'), currentTestDate)).toEqual(
      5
    )
    expect(getSpanOfInfluence(new Date('2019-01-01'), currentTestDate)).toEqual(
      7
    )
    expect(getSpanOfInfluence(new Date('2010-01-01'), currentTestDate)).toEqual(
      15
    )
    expect(getSpanOfInfluence(new Date('1920-01-01'), currentTestDate)).toEqual(
      55
    )
    expect(
      Math.round(getSpanOfInfluence(new Date('1020-01-01'), currentTestDate))
    ).toEqual(255)
  })
})

describe('compareBooks', () => {
  it('adds 3 points for matching authors', () => {
    expect(
      compareBooks(testBook, {
        author: 'Author',
      } as Book)
    ).toEqual(3)
  })

  it('adds 2 points for matching genre', () => {
    expect(
      compareBooks(testBook, {
        tags: ['genre-romance'],
      } as Book)
    ).toEqual(2)
  })

  it('adds 2 points for matching subject', () => {
    expect(
      compareBooks(testBook, {
        tags: ['sub-nature'],
      } as Book)
    ).toEqual(2)
  })

  it('adds 1 point for matching publication', () => {
    expect(
      compareBooks(testBook, {
        tags: ['pub-great-ideas'],
      } as Book)
    ).toEqual(1)
  })

  it('adds 1 point for matching type', () => {
    expect(
      compareBooks(testBook, {
        tags: ['type-paperback'],
      } as Book)
    ).toEqual(1)
  })

  it('adds max points for matching dates', () => {
    expect(
      compareBooks(
        testBook,
        {
          dateBookPublished: new Date('2020-01-01'),
        } as Book,

        currentTestDate
      )
    ).toEqual(DATE_MATCH_MAX_POINTS)
    expect(
      compareBooks(
        {
          ...testBook,
          dateBookPublished: new Date('2019-01-01'),
        },
        {
          dateBookPublished: new Date('2019-01-01'),
        } as Book,

        currentTestDate
      )
    ).toEqual(DATE_MATCH_MAX_POINTS)
  })

  it('adds half points for dates halfway from span of influence', () => {
    expect(
      compareBooks(
        testBook,
        {
          dateBookPublished: new Date('2017-07-01'),
        } as Book,

        currentTestDate
      )
    ).toEqual(DATE_MATCH_MAX_POINTS / 2)
    expect(
      compareBooks(
        {
          ...testBook,
          dateBookPublished: new Date('2019-01-01'),
        },
        {
          dateBookPublished: new Date('2015-07-01'),
        } as Book,

        currentTestDate
      )
    ).toEqual(DATE_MATCH_MAX_POINTS / 2)
    expect(
      compareBooks(
        {
          ...testBook,
          dateBookPublished: new Date('2019-01-01'),
        },
        {
          dateBookPublished: new Date('2022-07-01'),
        } as Book,

        currentTestDate
      )
    ).toEqual(DATE_MATCH_MAX_POINTS / 2)
  })

  it('adds 0 points for dates outside span of influence', () => {
    expect(
      compareBooks(
        testBook,
        {
          dateBookPublished: new Date('2015-01-01'),
        } as Book,

        currentTestDate
      )
    ).toEqual(0)
    expect(
      compareBooks(
        testBook,
        {
          dateBookPublished: new Date('2000-01-01'),
        } as Book,

        currentTestDate
      )
    ).toEqual(0)
  })

  it('total points', () => {
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

  it('does not count irrelevent tags', () => {
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
