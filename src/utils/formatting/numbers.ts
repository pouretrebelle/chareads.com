export const shortFormatNumber = (number: number): string => {
  if (number === null) return ''

  if (number >= 10000) return `${Math.floor(number / 1000)}K`

  if (number >= 1000) {
    return Math.floor(number / 100) % 10 === 0
      ? `${Math.floor(number / 1000)}K`
      : `${Math.floor(number / 100) / 10}K`
  }

  if (number === 1) return '1'

  return `${number}`
}

export const formatNumberInThousands = (number: number): string => {
  if (number === null) return ''

  return number
    .toString()
    .split('')
    .reverse()
    .join('')
    .replace(/(\d{3}(?!.*\.|$))/g, '$1,')
    .split('')
    .reverse()
    .join('')
}

export const formatViewCount = (number: number): string => {
  if (number === null) return ''

  return `${shortFormatNumber(number)} ${number > 1 ? 'views' : 'view'}`
}
