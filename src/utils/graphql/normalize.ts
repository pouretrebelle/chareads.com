interface NormalizeItem {
  frontmatter?: object
  fields?: object
}

export const normalizeItem = ({
  frontmatter,
  fields,
  ...rest
}: NormalizeItem): object => ({
  ...rest,
  ...frontmatter,
  ...fields,
})

interface Query {
  edges: {
    node: object
  }[]
}

export const normalizeArray = (query: Query): object[] =>
  query.edges.map((query) => normalizeItem(query.node))
