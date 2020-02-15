import { getBookSlug, getVideoSlug } from 'utils/urls/slugs'
import { getAffiliateLinks } from 'utils/urls/affiliate'

export const onCreateNode = ({ node, actions }): void => {
  const { createNodeField } = actions

  if (node.internal.type === 'MarkdownRemark') {
    createNodeField({
      node,
      name: 'slug',
      value: getBookSlug(node.frontmatter),
    })
    createNodeField({
      node,
      name: 'links',
      value: getAffiliateLinks(node.frontmatter.isbn13),
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
