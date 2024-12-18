import { makeIsbn10 } from 'utils/formatting/isbn'

export const AFFILIATES = {
  GOODREADS: 'gr',
  AMAZON: 'amzn',
  BOOKSHOP_ORG: 'bs',
} as const

export const getLink = (isbn: string, affiliateAbbr: string): string => {
  if (affiliateAbbr === AFFILIATES.GOODREADS)
    return `https://www.goodreads.com/search?query=${isbn}`

  if (affiliateAbbr === AFFILIATES.AMAZON)
    return `https://amazon.com/dp/${makeIsbn10(String(isbn))}?tag=chareads-20`

  if (affiliateAbbr === AFFILIATES.BOOKSHOP_ORG)
    return `https://uk.bookshop.org/a/15033/${isbn}`
}

export const getShortLink = (isbn: string, affiliateAbbr: string): string =>
  `https://cha.rs/${parseInt(isbn).toString(36).toUpperCase()}/${affiliateAbbr}`

export const getAffiliateLinks = (isbn: string): object => {
  const long = {}
  const short = {}

  Object.values(AFFILIATES).forEach((affiliate: string) => {
    long[affiliate] = getLink(isbn, affiliate)
    short[affiliate] = getShortLink(isbn, affiliate)
  })

  return {
    long,
    short,
  }
}
