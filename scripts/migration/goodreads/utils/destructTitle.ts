import { DestructedBookTitle } from '../types'

const destructTitle = (string: string): DestructedBookTitle => {
  const matches = string.match(/^(.+?)(?:: (.+))?(?: \((.+?),? #([\d.]+)\))?$/)

  if (!matches) return { title: string }

  const [match, title, subtitle, seriesTitle, seriesNumber] = matches

  const res: DestructedBookTitle = { title }

  if (subtitle) res.subtitle = subtitle

  if (seriesTitle) {
    res.series = {
      title: seriesTitle,
      number: Number(seriesNumber),
    }
  }

  return res
}

export default destructTitle
