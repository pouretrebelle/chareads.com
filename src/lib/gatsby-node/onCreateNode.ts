import { createContentDigest } from 'gatsby-core-utils'
import { getBookSlug, getVideoSlug } from 'utils/urls/slugs'
import { getAffiliateLinks } from 'utils/urls/affiliates'
import { makeIsbn10, makeIsbn13 } from 'utils/formatting/isbn'
import { getVideoCount } from './utils/addToNode'

export const onCreateNode = ({ node, actions }): void => {
  const { createNodeField, createNode } = actions

  if (node.internal.type === 'MarkdownRemark') {
    const { frontmatter, ...content } = node

    createNode({
      ...frontmatter,
      ...content,
      slug: getBookSlug(node.frontmatter),
      isbn10: makeIsbn10(node.frontmatter.isbn13 || node.frontmatter.isbn10),
      isbn13: makeIsbn13(node.frontmatter.isbn10 || node.frontmatter.isbn13),
      links: getAffiliateLinks(node.fields.isbn13),

      id: `${node.id}-book`,
      parent: null,
      internal: {
        type: 'Book',
        contentDigest: createContentDigest(node),
      },
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
      name: 'viewCount',
      value: getVideoCount(node),
    })
  }
}
