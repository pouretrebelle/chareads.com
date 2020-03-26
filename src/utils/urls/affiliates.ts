import { makeIsbn10 } from 'utils/formatting/isbn'

export const AFFILIATES = {
  GOODREADS: 'gr',
  AMAZON: 'amzn',
  BOOK_DEPOSITORY: 'bd',
}

export const getLink = (isbn: string, affiliateAbbr: string): string => {
  if (affiliateAbbr === AFFILIATES.GOODREADS)
    return `https://www.goodreads.com/search?query=${isbn}`

  if (affiliateAbbr === AFFILIATES.AMAZON)
    return `https://www.amazon.co.uk/dp/${makeIsbn10(
      String(isbn)
    )}?tag=thcdex-21`

  if (affiliateAbbr === AFFILIATES.BOOK_DEPOSITORY)
    return `https://bookdepository.com/search?searchTerm=${isbn}&a_id=char`
}

export const getShortLink = (isbn: string, affiliateAbbr: string): string =>
  `https://cha.rs/${affiliateAbbr}/${parseInt(isbn)
    .toString(36)
    .toUpperCase()}`

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
