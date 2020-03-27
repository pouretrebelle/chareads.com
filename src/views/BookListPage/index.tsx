import React from 'react'
import { graphql } from 'gatsby'
import styled, { SimpleInterpolation } from 'styled-components'

import { PageProps } from 'types/page'
import { normalizeArray } from 'utils/graphql/normalize'
import Layout from 'Layout'
import { BookCardType } from 'types/book'
import { FONT } from 'styles/tokens'
import { screenMin } from 'styles/responsive'
import BookCard from 'components/cards/BookCard'
import Grid from 'components/Grid'
import GridItem from 'components/Grid/GridItem'
import InfiniteScroll from 'components/InfiniteScroll'
import PageTitle from 'components/Navigation/PageTitle'

interface BookProps {
  big: boolean
}

const StyledBook = styled(GridItem)<BookProps>`
  ${({ big }): SimpleInterpolation => screenMin.m`
    font-size: ${big ? '1.25em' : FONT.SIZE.S};
  `}
`

interface Props extends PageProps {
  data: {
    bookData: {
      edges: {
        node: BookCardType
      }[]
    }
  }
}

const BookListPage: React.FC<Props> = ({ data: { bookData }, location }) => {
  const books = normalizeArray(bookData) as BookCardType[]

  return (
    <Layout location={location} openOnDesktop>
      <PageTitle>Book reviews</PageTitle>

      <Grid as="ol" full>
        <InfiniteScroll
          items={books}
          renderItem={(book: BookCardType): React.ReactNode => {
            const big = book.rating7 >= 6
            return (
              <StyledBook
                big={big}
                as="li"
                key={book.id}
                span={1}
                spanFromM={big ? 6 : 3}
                spanFromL={big ? 4 : 2}
                spanRowsFromM={big ? 2 : 1}
              >
                <BookCard book={book} featured={big} big={big} />
              </StyledBook>
            )
          }}
        />
      </Grid>
    </Layout>
  )
}

export const query = graphql`
  query BookListPage {
    bookData: allBook(
      sort: { fields: dateRated, order: DESC }
      filter: { rating7: { ne: null } }
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
