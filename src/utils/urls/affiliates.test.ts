import {
  AFFILIATES,
  getLink,
  getShortLink,
  getAffiliateLinks,
} from './affiliates'

const testIsbn = '9781781257661'
const testIsbn10 = '1781257663'
const testIsbnBase36 = '3GTOS03I5'

describe('getLink', () => {
  it('returns Goodreads link correctly', () => {
    expect(getLink(testIsbn, AFFILIATES.GOODREADS)).toEqual(
      `https://www.goodreads.com/search?query=${testIsbn}`
    )
  })
  it('returns Amazon link correctly with ISBN-10 conversion', () => {
    expect(getLink(testIsbn, AFFILIATES.AMAZON)).toEqual(
      `https://www.amazon.co.uk/dp/${testIsbn10}?tag=thcdex-21`
    )
  })
  it('returns Book Depository link correctly', () => {
    expect(getLink(testIsbn, AFFILIATES.BOOK_DEPOSITORY)).toEqual(
      `https://bookdepository.com/search?searchTerm=${testIsbn}&a_id=char`
    )
  })
})

describe('getShortLink', () => {
  it('returns short link correctly with base36 encoding', () => {
    expect(getShortLink(testIsbn, 'test')).toEqual(
      `https://cha.rs/test/${testIsbnBase36}`
    )
  })
})

describe('getAffiliateLinks', () => {
  it('returns correct object structure', () => {
    const linksPattern = {}
    Object.values(AFFILIATES).forEach((affiliateAbbr) => {
      linksPattern[affiliateAbbr] = expect.any(String)
    })

    expect(getAffiliateLinks(testIsbn)).toEqual({
      long: linksPattern,
      short: linksPattern,
    })
  })
  it('contains links', () => {
    const { long } = getAffiliateLinks(testIsbn) as { long: string[] }
    Object.values(AFFILIATES).forEach((affiliateAbbr) => {
      expect(long[affiliateAbbr]).toEqual(getLink(testIsbn, affiliateAbbr))
    })
  })
  it('contains short links', () => {
    const { short } = getAffiliateLinks(testIsbn) as { short: string[] }
    Object.values(AFFILIATES).forEach((affiliateAbbr) => {
      expect(short[affiliateAbbr]).toEqual(
        getShortLink(testIsbn, affiliateAbbr)
      )
    })
  })
})
