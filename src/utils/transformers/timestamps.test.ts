import { getTimeInSeconds, structureTimestamps } from './timestamps'
import { structureBookDetails } from './text'

describe('getTimeInSeconds', () => {
  it('returns time correctly', () => {
    expect(getTimeInSeconds('0:26')).toEqual(26)
    expect(getTimeInSeconds('1:26')).toEqual(86)
  })
})

describe('structureTimestamps', () => {
  it('returns object with text', () => {
    expect(structureTimestamps(['1:00 timestamp'])).toEqual([
      {
        text: 'timestamp',
        timestamp: 60,
        reference: {},
      },
    ])
  })

  it('returns object with text including commas', () => {
    expect(structureTimestamps(['1:00 timestamp, note'])).toEqual([
      {
        text: 'timestamp, note',
        timestamp: 60,
        reference: {},
      },
    ])
  })

  it('returns object with reference', () => {
    expect(structureTimestamps(['1:00 [title, author]'])).toEqual([
      {
        text: 'title, author',
        timestamp: 60,
        reference: structureBookDetails('title, author'),
      },
    ])
  })

  it('returns object without reference', () => {
    expect(structureTimestamps(['1:00 [title author]'])).toEqual([
      {
        text: 'title author',
        timestamp: 60,
        reference: {},
      },
    ])
  })
})
