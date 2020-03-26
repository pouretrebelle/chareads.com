interface Query {
  edges: {
    node: object
  }[]
}

export const normalizeArray = (query: Query): object[] =>
  query.edges.map((query) => query.node)
