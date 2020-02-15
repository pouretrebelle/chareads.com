import {
  shortFormatDate,
  formatDate,
  formatTimestamp,
  unformatTimestamp,
} from './time'

describe('shortFormatDate', () => {
  it('returns date formatted correctly', () => {
    expect(shortFormatDate(new Date('2020-01-30'))).toEqual('30/01/2020')
    expect(shortFormatDate(new Date('1999-12-12'))).toEqual('12/12/1999')
  })
  it('returns null if invalid date', () => {
    expect(shortFormatDate(new Date('1999-12-40'))).toEqual(null)
    expect(shortFormatDate(new Date('2020-13-01'))).toEqual(null)
  })
})
describe('formatDate', () => {
  it('returns date formatted correctly', () => {
    expect(formatDate(new Date('2020-01-30'))).toEqual(
      'Thursday 30th January 2020'
    )
    expect(formatDate(new Date('1999-12-03'))).toEqual(
      'Friday 3rd December 1999'
    )
  })
  it('returns null if invalid date', () => {
    expect(formatDate(new Date('1999-12-40'))).toEqual(null)
    expect(formatDate(new Date('2020-13-01'))).toEqual(null)
  })
})

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
