import { getBookSlug, getVideoSlug } from 'utils/urls/slugs'

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
  }
}
