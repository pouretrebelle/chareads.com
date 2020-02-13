import { getBookDetailsFromString, formatBookDetails } from './text'

describe('getBookDetailsFromString', () => {
  it('returns title and author', () => {
    expect(getBookDetailsFromString('title, author')).toEqual({
      title: 'title',
      author: 'author',
    })
  })

  it('title is hungry for commas', () => {
    expect(getBookDetailsFromString('title, again, author')).toEqual({
      title: 'title, again',
      author: 'author',
    })
  })

  it('returns null without commas', () => {
    expect(getBookDetailsFromString('title author')).toEqual(null)
  })
})

describe('formatBookDetails', () => {
  it('joins title and author with by', () => {
    expect(
      formatBookDetails({
        title: 'title',
        author: 'author',
      })
    ).toEqual('title by author')
  })
})
