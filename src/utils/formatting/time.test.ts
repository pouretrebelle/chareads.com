import { formatTimestamp, unformatTimestamp } from './time'

describe('formatTimestamp', () => {
  it('returns time formatted correctly', () => {
    expect(formatTimestamp(2)).toEqual('0:02')
    expect(formatTimestamp(26)).toEqual('0:26')
    expect(formatTimestamp(86)).toEqual('1:26')
    expect(formatTimestamp(146)).toEqual('2:26')
  })
})

describe('unformatTimestamp', () => {
  it('returns seconds number correctly', () => {
    expect(unformatTimestamp('0:02')).toEqual(2)
    expect(unformatTimestamp('0:26')).toEqual(26)
    expect(unformatTimestamp('1:26')).toEqual(86)
    expect(unformatTimestamp('2:26')).toEqual(146)
  })
})
