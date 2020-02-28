import {
  shortFormatNumber,
  formatNumberInThousands,
  formatViewCount,
} from './numbers'

describe('shortFormatNumber', () => {
  it('returns empty string if null', () => {
    expect(shortFormatNumber(null)).toEqual('')
  })

  it('returns actual number up to 1000', () => {
    expect(shortFormatNumber(1)).toEqual('1')
    expect(shortFormatNumber(100)).toEqual('100')
    expect(shortFormatNumber(999)).toEqual('999')
  })

  it('returns abbreviated number after 1000', () => {
    expect(shortFormatNumber(1000)).toEqual('1K')
  })

  it('returns abbreviated number with decimal', () => {
    expect(shortFormatNumber(1199)).toEqual('1.1K')
    expect(shortFormatNumber(1200)).toEqual('1.2K')
  })

  it('returns abbreviated number after 10000', () => {
    expect(shortFormatNumber(10000)).toEqual('10K')
  })

  it('returns abbreviated number without decimal after 10000', () => {
    expect(shortFormatNumber(12345)).toEqual('12K')
  })

  it('returns abbreviated number to nearest thousand after 100000', () => {
    expect(shortFormatNumber(123456)).toEqual('123K')
  })
})

describe('formatNumberInThousands', () => {
  it('returns empty string if null', () => {
    expect(formatNumberInThousands(null)).toEqual('')
  })

  it('returns normal number', () => {
    expect(formatNumberInThousands(1)).toEqual('1')
    expect(formatNumberInThousands(12)).toEqual('12')
    expect(formatNumberInThousands(123)).toEqual('123')
  })

  it('returns number with thousands separator', () => {
    expect(formatNumberInThousands(1234)).toEqual('1,234')
    expect(formatNumberInThousands(12345)).toEqual('12,345')
    expect(formatNumberInThousands(123456)).toEqual('123,456')
    expect(formatNumberInThousands(1234567)).toEqual('1,234,567')
    expect(formatNumberInThousands(12345678)).toEqual('12,345,678')
    expect(formatNumberInThousands(123456789)).toEqual('123,456,789')
  })
})

describe('formatViewCount', () => {
  it('returns empty string if null', () => {
    expect(formatViewCount(null)).toEqual('')
  })

  it('returns singular view', () => {
    expect(formatViewCount(1)).toEqual('1 view')
  })

  it('returns multiple views', () => {
    expect(formatViewCount(12)).toEqual(`${shortFormatNumber(12)} views`)
    expect(formatViewCount(123)).toEqual(`${shortFormatNumber(123)} views`)
    expect(formatViewCount(1234)).toEqual(`${shortFormatNumber(1234)} views`)
    expect(formatViewCount(12345)).toEqual(`${shortFormatNumber(12345)} views`)
    expect(formatViewCount(123456)).toEqual(
      `${shortFormatNumber(123456)} views`
    )
  })
})
