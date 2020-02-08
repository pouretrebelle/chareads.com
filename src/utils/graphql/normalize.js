export const normalizeItem = (query) => {
  return query.node
}

export const normalizeArray = (query) => {
  return query.edges.map(normalizeItem)
}
