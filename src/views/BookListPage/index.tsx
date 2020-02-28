import React from 'react'
import { graphql } from 'gatsby'

import { PageProps } from 'types/page'
import { normalizeArray } from 'utils/graphql/normalize'
import Layout from 'Layout'
import { RawBookCard, BookCardType } from 'types/book/card'
import BookCard from 'components/cards/BookCard'
import Grid from 'components/Grid'
import GridItem from 'components/Grid/GridItem'

interface Props extends PageProps {
  data: {
    bookData: {
      edges: {
        node: RawBookCard
      }[]
    }
  }
}

const BookListPage: React.FC<Props> = ({ data: { bookData }, location }) => {
  const books = normalizeArray(bookData) as BookCardType[]

  return (
    <Layout location={location}>
      <Grid as="ol">
        {books.length &&
          books.map((book) => {
            const big = book.rating7 >= 6
            return (
              <GridItem
                as="li"
                key={book.id}
                span={big ? 2 : 1}
                spanFromM={big ? 8 : 4}
                spanFromL={big ? 6 : 3}
                spanRows={big ? 2 : 1}
              >
                <BookCard book={book} big={big} />
              </GridItem>
            )
          })}
      </Grid>
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
