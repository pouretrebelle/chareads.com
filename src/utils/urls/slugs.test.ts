import { getBookSlug, getVideoSlug } from './slugs'

describe('getBookSlug', () => {
  it('returns slug correctly', () => {
    expect(
      getBookSlug({
        title: 'title',
        author: 'author',
      })
    ).toEqual('/book/title-author')
  })

  it('deals with capitalisation', () => {
    expect(
      getBookSlug({
        title: 'Title',
        author: 'Author',
      })
    ).toEqual('/book/title-author')
  })

  it('removes punctuation', () => {
    expect(
      getBookSlug({
        title: 'title: a book!',
        author: 'author',
      })
    ).toEqual('/book/title-a-book-author')
  })
})

describe('getVideoSlug', () => {
  const datePublished = new Date('2020-01-30')

  it('returns slug correctly', () => {
    expect(
      getVideoSlug({
        title: 'title',
        datePublished,
      })
    ).toEqual('/video/2020-01-title')
  })

  it('deals with capitalisation', () => {
    expect(
      getVideoSlug({
        title: 'TITLE',
        datePublished,
      })
    ).toEqual('/video/2020-01-title')
  })

  it('deals with accented characters', () => {
    expect(
      getVideoSlug({
        title: 'Horrorstör by Grady Hendrix',
        datePublished,
      })
    ).toEqual('/video/2020-01-horrorstor-grady-hendrix')
  })

  it('removes punctuation', () => {
    expect(
      getVideoSlug({
        title: 'title: book!',
        datePublished,
      })
    ).toEqual('/video/2020-01-title-book')
  })

  it('removes waste words', () => {
    expect(
      getVideoSlug({
        title: 'the title of a book is',
        datePublished,
      })
    ).toEqual('/video/2020-01-title-of-book')
  })

  it('limits string to 6 words', () => {
    expect(
      getVideoSlug({
        title: 'the title of this particular book is very long',
        datePublished,
      })
    ).toEqual('/video/2020-01-title-of-this-particular-book-very')
  })
})
