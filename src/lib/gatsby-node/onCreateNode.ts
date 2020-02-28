import { getBookSlug, getVideoSlug } from 'utils/urls/slugs'
import { getAffiliateLinks } from 'utils/urls/affiliates'
import { makeIsbn10, makeIsbn13 } from 'utils/formatting/isbn'
import { getVideoCount } from './utils/addToNode'

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
      name: 'isbn10',
      value: makeIsbn10(node.frontmatter.isbn13 || node.frontmatter.isbn10),
    })
    createNodeField({
      node,
      name: 'isbn13',
      value: makeIsbn13(node.frontmatter.isbn10 || node.frontmatter.isbn13),
    })
    createNodeField({
      node,
      name: 'links',
      value: getAffiliateLinks(node.fields.isbn13),
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
