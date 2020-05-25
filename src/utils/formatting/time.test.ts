import {
  getDateObjFromString,
  shortFormatDate,
  formatDate,
  formatYear,
  formatTimestamp,
  unformatTimestamp,
  getLastReadDate,
} from './time'

describe('getDateObjFromString', () => {
  it('returns date object correctly', () => {
    expect(getDateObjFromString('2010-01-30').toISOString()).toEqual(
      '2010-01-30T00:00:00.000Z'
    )
    expect(getDateObjFromString('1999-12-12').toISOString()).toEqual(
      '1999-12-12T00:00:00.000Z'
    )
  })
  it('works for dates before year 1000', () => {
    expect(getDateObjFromString('0049-12-12').toISOString()).toEqual(
      '0049-12-12T00:00:00.000Z'
    )
  })
  it('works for BCE dates', () => {
    expect(getDateObjFromString('-000049-12-12').toISOString()).toEqual(
      '-000049-12-12T00:00:00.000Z'
    )
  })
})

describe('shortFormatDate', () => {
  it('returns date formatted correctly', () => {
    expect(shortFormatDate('2010-01-30')).toEqual('30th Jan ’10')
    expect(shortFormatDate('1999-12-12')).toEqual('12th Dec ’99')
  })
  it('returns null if invalid date', () => {
    expect(shortFormatDate('1999-12-40')).toEqual(null)
    expect(shortFormatDate('2020-13-01')).toEqual(null)
  })
})

describe('formatDate', () => {
  it('returns date formatted correctly', () => {
    expect(formatDate('2020-01-30')).toEqual('Thursday 30th January 2020')
    expect(formatDate('1999-12-03')).toEqual('Friday 3rd December 1999')
  })
  it('returns null if invalid date', () => {
    expect(formatDate('1999-12-40')).toEqual(null)
    expect(formatDate('2020-13-01')).toEqual(null)
  })
})

describe('formatYear', () => {
  it('returns year formatted correctly', () => {
    expect(formatYear('2020-01-30')).toEqual('2020')
    expect(formatYear('1999-12-03')).toEqual('1999')
  })
  it('returns null if invalid date', () => {
    expect(formatYear('1999-12-40')).toEqual(null)
    expect(formatYear('2020-13-01')).toEqual(null)
  })
  it('adds suffix to years before 1000', () => {
    expect(formatYear('999-12-01')).toEqual('999 AD')
    expect(formatYear('0049-12-01')).toEqual('49 AD')
  })
  it('adds suffix to years before 0', () => {
    expect(formatYear('-000049-12-01')).toEqual('49 BCE')
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

describe('getLastReadDate', () => {
  it('returns last read date correctly', () => {
    expect(
      getLastReadDate([
        ['2017-10-27', '2017-10-29'],
        ['2017-03-23', '2017-03-24'],
        ['2018-08-05', '2018-09-03'],
      ]).getTime()
    ).toEqual(new Date('2018-09-03').getTime())
    expect(
      getLastReadDate([
        ['2018-08-05', '2018-09-03'],
        ['2017-03-23', '2017-03-24'],
      ]).getTime()
    ).toEqual(new Date('2018-09-03').getTime())
  })
})
