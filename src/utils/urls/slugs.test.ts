import { getBookSlug, getImageSlug, getVideoSlug } from './slugs'

describe('getBookSlug', () => {
  it('returns slug correctly', () => {
    expect(
      getBookSlug({
        title: 'title',
        author: 'author',
      })
    ).toEqual('/books/title-author/')
  })

  it('deals with capitalisation', () => {
    expect(
      getBookSlug({
        title: 'Title',
        author: 'Author',
      })
    ).toEqual('/books/title-author/')
  })

  it('removes punctuation', () => {
    expect(
      getBookSlug({
        title: 'title: a book!',
        author: 'author',
      })
    ).toEqual('/books/title-a-book-author/')
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
    ).toEqual('/videos/2020-01-title/')
  })

  it('deals with capitalisation', () => {
    expect(
      getVideoSlug({
        title: 'TITLE',
        datePublished,
      })
    ).toEqual('/videos/2020-01-title/')
  })

  it('deals with accented characters', () => {
    expect(
      getVideoSlug({
        title: 'Horrorstör by Grady Hendrix',
        datePublished,
      })
    ).toEqual('/videos/2020-01-horrorstor-grady-hendrix/')
  })

  it('removes punctuation', () => {
    expect(
      getVideoSlug({
        title: 'title: book!',
        datePublished,
      })
    ).toEqual('/videos/2020-01-title-book/')
  })

  it('removes waste words', () => {
    expect(
      getVideoSlug({
        title: 'the title of a book is',
        datePublished,
      })
    ).toEqual('/videos/2020-01-title-of-book/')
  })

  it('limits string to 6 words', () => {
    expect(
      getVideoSlug({
        title: 'the title of this particular book is very long',
        datePublished,
      })
    ).toEqual('/videos/2020-01-title-of-this-particular-book-very/')
  })
})

describe('getImageSlug', () => {
  it('returns slug correctly', () => {
    expect(
      getImageSlug({
        relativePath: '2009/07/01-harry-potter-deathly-hallows/cover.jpg',
        sourceInstanceName: 'books',
      })
    ).toEqual('books-2009-07-01-harry-potter-deathly-hallows-cover')

    expect(
      getImageSlug({
        relativePath: '2014/12/08-double-fyodor-dostoyevsky/cover.jpg',
        sourceInstanceName: 'books',
      })
    ).toEqual('books-2014-12-08-double-fyodor-dostoyevsky-cover')

    expect(
      getImageSlug({
        relativePath: '2014/12/08-double-fyodor-dostoyevsky/cover.jpg',
        sourceInstanceName: 'videos',
      })
    ).toEqual('videos-2014-12-08-double-fyodor-dostoyevsky-cover')
  })
})
