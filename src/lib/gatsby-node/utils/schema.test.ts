import { getTimestampTextFromBook } from './schema'

describe('getTimestampTextFromBook', () => {
  it('returns text string when only text is present', () => {
    expect(
      getTimestampTextFromBook({
        text: 'text',
      })
    ).toEqual('text')
  })

  it('returns book string when details cannot be extracted', () => {
    expect(
      getTimestampTextFromBook({
        book: 'book name',
      })
    ).toEqual('book name')
  })

  it('returns formatted book details when details can be extracted', () => {
    expect(
      getTimestampTextFromBook({
        book: 'book name, author',
      })
    ).toEqual('book name by author')
  })
})
