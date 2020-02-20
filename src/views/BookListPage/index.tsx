import React from 'react'
import { graphql } from 'gatsby'

import { normalizeArray } from 'utils/graphql/normalize'
import Layout from 'Layout'
import { RawBookCard, BookCardType } from 'types/book/card'
import BookCard from 'components/cards/BookCard'

interface Props {
  data: {
    bookData: {
      edges: {
        node: RawBookCard
      }[]
    }
  }
}

const BookListPage: React.FC<Props> = ({ data: { bookData } }) => {
  const books = normalizeArray(bookData) as BookCardType[]

  return (
    <Layout>
      {books.length && (
        <ol>
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </ol>
      )}
    </Layout>
  )
}

export const query = graphql`
  query BookListPage {
    bookData: allMarkdownRemark(
      sort: { fields: frontmatter___dateRated, order: DESC }
      filter: { frontmatter: { rating7: { ne: null } } }
    ) {
      edges {
        node {
          ...BookCardFields
        }
      }
    }
  }
`

export default BookListPage
