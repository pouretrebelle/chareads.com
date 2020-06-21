import { createContentDigest } from 'gatsby-core-utils'

import allYouTubeStats from 'youTubeStats'
import { makeIsbn10, makeIsbn13 } from 'utils/formatting/isbn'
import { getBookSlug, getVideoSlug } from 'utils/urls/slugs'
import { getAffiliateLinks } from 'utils/urls/affiliates'
import { Book } from 'types/book'
import { getLastReadDate, getSortDate } from 'utils/formatting/time'

export const createBookNode = ({ node, createNode }): void => {
  const { frontmatter, ...content } = node

  const isbn10 = makeIsbn10(frontmatter.isbn13 || frontmatter.isbn10)
  const isbn13 = makeIsbn13(frontmatter.isbn10 || frontmatter.isbn13)
  const dateLastRead = getLastReadDate(frontmatter.readDates)
  const sortDate = getSortDate(frontmatter.dateReviewed, frontmatter.readDates)

  const data = {
    ...frontmatter,
    ...content,
    slug: getBookSlug(frontmatter),
    isbn10,
    isbn13,
    dateLastRead,
    sortDate,
    links: getAffiliateLinks(isbn13 || isbn10),
  } as Book

  createNode({
    ...data,
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

  const youTubeStats = allYouTubeStats[node.frontmatter.youtubeId]

  createNode({
    ...frontmatter,
    ...content,
    ...youTubeStats,
    slug: getVideoSlug(node.frontmatter),

    id: `${node.id}-video`,
    internal: {
      type: 'Video',
      content: node.rawMarkdownBody,
      contentDigest: createContentDigest(node),
    },
  })
}
