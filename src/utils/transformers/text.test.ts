import { splitBookDetailsString, structureBookDetails } from './text'

describe('splitBookDetailsString', () => {
  it('returns title and author', () => {
    expect(splitBookDetailsString('title, author')).toEqual({
      title: 'title',
      author: 'author',
    })
  })

  it('title is hungry for commas', () => {
    expect(splitBookDetailsString('title, again, author')).toEqual({
      title: 'title, again',
      author: 'author',
    })
  })

  it('returns empty without commas', () => {
    expect(splitBookDetailsString('title author')).toEqual({})
  })
})

describe('structureBookDetails', () => {
  it('returns details', () => {
    expect(structureBookDetails('title, author')).toEqual({
      title: 'title',
      author: 'author',
      slug: '/book/title-author',
    })
  })

  it('returns empty without commas', () => {
    expect(structureBookDetails('title author')).toEqual({})
  })
})
