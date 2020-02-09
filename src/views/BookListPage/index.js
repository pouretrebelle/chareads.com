import React from 'react'
import { graphql, Link } from 'gatsby'

import { normalizeArray } from 'utils/graphql/normalize'
import Layout from 'Layout'

const BookListPage = ({ location, data: { bookData } }) => {
  const books = normalizeArray(bookData)

  return (
    <Layout>
      {books.length && (
        <ol>
          {books.map((book) => (
            <li key={book.id}>
              <Link to={book.slug}>{book.title}</Link>
            </li>
          ))}
        </ol>
      )}
    </Layout>
  )
}

export const query = graphql`
  query BookListPage {
    bookData: allMarkdownRemark(sort: { fields: frontmatter___dateReviewed }) {
      edges {
        node {
          ...BookCardFields
        }
      }
    }
  }
`

export default BookListPage
