const getBookFromString = (string: string): string => {
  const matches = string.match(/([^&|]+) by (.+)/)

  if (!matches) return undefined

  const title = matches[1].trim().replace(/Great Ideas #[0-9]+: /, '')
  const author = matches[2]

  return `${title}, ${author}`
}

export default getBookFromString
