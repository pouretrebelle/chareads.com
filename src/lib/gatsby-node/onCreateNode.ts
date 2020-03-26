import { createContentDigest } from 'gatsby-core-utils'

import { getBookSlug, getVideoSlug } from 'utils/urls/slugs'
import { getAffiliateLinks } from 'utils/urls/affiliates'
import { makeIsbn10, makeIsbn13 } from 'utils/formatting/isbn'
import { getVideoCount } from './utils/addToNode'

export const onCreateNode = ({ node, actions }): void => {
  const { createNodeField, createNode } = actions

  if (node.internal.type === 'MarkdownRemark') {
    const { frontmatter, ...content } = node

    const isbn10 = makeIsbn10(
      node.frontmatter.isbn13 || node.frontmatter.isbn10
    )
    const isbn13 = makeIsbn13(
      node.frontmatter.isbn10 || node.frontmatter.isbn13
    )

    createNode({
      ...frontmatter,
      ...content,
      slug: getBookSlug(node.frontmatter),
      isbn10,
      isbn13,
      links: getAffiliateLinks(isbn13 || isbn10),

      id: `${node.id}-book`,
      internal: {
        type: 'Book',
        content: node.rawMarkdownBody,
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
