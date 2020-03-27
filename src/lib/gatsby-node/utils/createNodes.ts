import { createContentDigest } from 'gatsby-core-utils'

import viewCounts from 'viewCounts'
import { makeIsbn10, makeIsbn13 } from 'utils/formatting/isbn'
import { getBookSlug, getVideoSlug } from 'utils/urls/slugs'
import { getAffiliateLinks } from 'utils/urls/affiliates'

export const createBookNode = ({ node, createNode }): void => {
  const { frontmatter, ...content } = node

  const isbn10 = makeIsbn10(node.frontmatter.isbn13 || node.frontmatter.isbn10)
  const isbn13 = makeIsbn13(node.frontmatter.isbn10 || node.frontmatter.isbn13)

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

export const createVideoNode = ({ node, createNode }): void => {
  const { frontmatter, ...content } = node

  createNode({
    ...frontmatter,
    ...content,
    slug: getVideoSlug(node.frontmatter),
    viewCount: viewCounts[node.frontmatter.youtubeId],

    id: `${node.id}-video`,
    internal: {
      type: 'Video',
      content: node.rawMarkdownBody,
      contentDigest: createContentDigest(node),
    },
  })
}
