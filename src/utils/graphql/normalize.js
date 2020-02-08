export const normalizeItem = ({ frontmatter, fields, ...rest }) => ({
  ...rest,
  ...frontmatter,
  ...fields,
})

export const normalizeArray = (query) =>
  query.edges.map((query) => normalizeItem(query.node))
