const sanitizeYmlString = (string: string): string => {
  if (!string) return string

  let safe = true

  if (string.match(/[:#]/)) safe = false
  if (string.match(/^'.+'$/)) safe = true

  return safe ? string : `'${string}'`
}

export default sanitizeYmlString
