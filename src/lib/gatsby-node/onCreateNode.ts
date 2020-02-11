import { getBookSlug, getVideoSlug } from 'utils/urls/slugs'
import { structureTimestamps } from 'utils/transformers/timestamps'

export const onCreateNode = ({ node, actions }): void => {
  const { createNodeField } = actions

  if (node.internal.type === 'MarkdownRemark') {
    createNodeField({
      node,
      name: 'slug',
      value: getBookSlug(node.frontmatter),
    })
  }

  if (node.internal.type === 'Videos') {
    createNodeField({
      node,
      name: 'slug',
      value: getVideoSlug(node),
    })

    createNodeField({
      node,
      name: 'timestamps',
      value: structureTimestamps(node.timestamps),
    })
  }
}
