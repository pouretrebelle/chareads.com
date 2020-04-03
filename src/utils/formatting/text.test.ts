import { getBookDetailsFromString, formatBookDetails, stripHtml } from './text'

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

describe('stripHtml', () => {
  it('strips <p> tags', () => {
    expect(stripHtml('<p>Text</p>')).toEqual('Text')
  })
  it('joins sentances from <p> tags', () => {
    expect(stripHtml('<p>Text</p><p>More</p>')).toEqual('Text More')
  })
  it('strips tags with attributes', () => {
    expect(stripHtml('<p>Text <a href="#">link</a></p>')).toEqual('Text link')
  })
})
