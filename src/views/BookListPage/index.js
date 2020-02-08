import React from 'react'
import { graphql, Link } from 'gatsby'

import { normalizeArray } from 'utils/graphql/normalize'

const BookListPage = ({ location, data: { bookData } }) => {
  const books = normalizeArray(bookData)

  return (
    <>
      {books.length && (
        <ol>
          {books.map((book) => (
            <li key={book.id}>
              <Link to={book.slug}>{book.title}</Link>
            </li>
          ))}
        </ol>
      )}
    </>
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
