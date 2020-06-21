import { splitTagByPrefix, splitTagsByPrefix, getTagsFromBooks } from './index'

describe('splitTagByPrefix', () => {
  it('returns an array with three values', () => {
    expect(splitTagByPrefix('genre-satire').length).toEqual(3)
    expect(splitTagByPrefix('sub-mental-illness').length).toEqual(3)
  })

  it('returns prefix as first value', () => {
    expect(splitTagByPrefix('genre-satire')[0]).toEqual('genre')
    expect(splitTagByPrefix('sub-mental-illness')[0]).toEqual('sub')
  })

  it('returns name as second value', () => {
    expect(splitTagByPrefix('genre-satire')[1]).toEqual('satire')
    expect(splitTagByPrefix('sub-mental-illness')[1]).toEqual('mental-illness')
  })

  it('returns input as third value', () => {
    expect(splitTagByPrefix('genre-satire')[2]).toEqual('genre-satire')
    expect(splitTagByPrefix('sub-mental-illness')[2]).toEqual(
      'sub-mental-illness'
    )
  })
})

describe('splitTagsByPrefix', () => {
  it('translates prefix name', () => {
    const splitTags = splitTagsByPrefix([
      'type-fiction',
      'genre-satire',
      'sub-mental-illness',
    ])
    expect(splitTags[0].prefix).toEqual('Type')
    expect(splitTags[1].prefix).toEqual('Genre')
    expect(splitTags[2].prefix).toEqual('Subject')
  })

  it('removes tags without a named prefix', () => {
    const splitTags = splitTagsByPrefix([
      'type-fiction',
      'genre-satire',
      'sub-mental-illness',
      'loc-london',
    ])
    expect(splitTags.length).toEqual(3)
  })

  it('returns values with name and unprefixed keys', () => {
    const splitTags = splitTagsByPrefix(['genre-satire', 'sub-mental-illness'])

    expect(splitTags[0].values[0]).toEqual({
      name: 'satire',
      unprefixed: 'genre-satire',
    })
    expect(splitTags[1].values[0]).toEqual({
      name: 'mental-illness',
      unprefixed: 'sub-mental-illness',
    })
  })

  it('returns multiple values for one prefix', () => {
    const splitTags = splitTagsByPrefix([
      'genre-romance',
      'genre-satire',
      'genre-comedy',
    ])

    expect(splitTags[0].values[0].name).toEqual('romance')
    expect(splitTags[0].values[1].name).toEqual('satire')
    expect(splitTags[0].values[2].name).toEqual('comedy')
  })
})

describe('getTagsFromBooks', () => {
  it('flattens and alphebatises tags', () => {
    const tags = getTagsFromBooks([
      { tags: ['sub-mental-illness', 'genre-satire'] },
      { tags: ['type-fiction'] },
    ])
    expect(tags).toEqual(['genre-satire', 'sub-mental-illness', 'type-fiction'])
  })

  it('removes duplicate tags', () => {
    const tags = getTagsFromBooks([
      { tags: ['sub-mental-illness', 'genre-satire'] },
      { tags: ['type-fiction', 'genre-satire'] },
    ])
    expect(tags).toEqual(['genre-satire', 'sub-mental-illness', 'type-fiction'])
  })

  it('get tags with prefix', () => {
    const tags = getTagsFromBooks(
      [
        { tags: ['sub-mental-illness', 'genre-satire'] },
        { tags: ['sub-death'] },
      ],
      'sub'
    )
    expect(tags).toEqual(['death', 'mental-illness'])
  })
})
