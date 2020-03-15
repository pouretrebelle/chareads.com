const tagPrefixNames = {
  type: 'Type',
  genre: 'Genre',
  sub: 'Subject',
}

export const splitTagsByPrefix = (
  tags: string[]
): {
  prefix: string
  values: string[]
}[] => {
  const resultMap = {}

  tags.forEach((tag) => {
    const parts = tag.split('-')
    if (parts.length === 1) return

    const prefix = parts[0]

    const value = parts.slice(1).join('-')

    if (!resultMap[prefix]) return (resultMap[prefix] = [value])

    resultMap[prefix].push(value)
  })

  return Object.keys(tagPrefixNames)
    .filter((p) => resultMap[p])
    .map((prefix) => ({
      prefix: tagPrefixNames[prefix],
      values: resultMap[prefix],
    }))
}
