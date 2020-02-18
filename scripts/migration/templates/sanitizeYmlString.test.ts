import sanitizeYmlString from './sanitizeYmlString'

describe('sanitizeYmlString', () => {
  it('returns same if fine', () => {
    expect(sanitizeYmlString('title, author')).toEqual('title, author')
  })
  it('sanitize if there is a colon', () => {
    expect(sanitizeYmlString('title: again, author')).toEqual(
      `'title: again, author'`
    )
  })
  it('sanitize if there is a hash', () => {
    expect(sanitizeYmlString('#awkward')).toEqual(`'#awkward'`)
  })
  it('returns same if starts and ends with quotes', () => {
    expect(sanitizeYmlString(`'title: again, author'`)).toEqual(
      `'title: again, author'`
    )
  })
})
