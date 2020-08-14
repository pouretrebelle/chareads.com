const sanitizeHtml = (string: string): string => {
  if (!string) return undefined

  return (
    string
      .replace(/<br \/><br \/>/g, '\n  ')
      .replace(/(<\/p>)|(<br \/>)/g, ' ')
      .replace(/<[^>]*>/g, '')
      .replace(/([^\n]) {2,}/g, '$1 ')
      .replace(/\.{3}/g, '…')
      // .replace(/\n([^ ])/g, '\n  $1')
      .trim()
  )
}

export default sanitizeHtml
