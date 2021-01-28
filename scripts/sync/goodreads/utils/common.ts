export const sanitizeQuotes = (string: string): string =>
  string.replace(/"/g, '\\"')

export const sanitizeHtml = (string: string): string => {
  if (!string) return undefined

  return (
    string
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/<br \/><br \/>/g, '\n  ')
      .replace(/(<\/p>)|(<br \/>)/g, ' ')
      .replace(/<[^>]*>/g, '')
      .replace(/([^\n]) {2,}/g, '$1 ')
      .replace(/\.{3}/g, '…')
      // .replace(/\n([^ ])/g, '\n  $1')
      .trim()
  )
}

export const camelCase = (string: string): string =>
  string.toLowerCase().replace(/\s+(.)/g, (match, group) => group.toUpperCase())
