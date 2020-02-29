import React from 'react'
import { graphql } from 'gatsby'
import styled, { SimpleInterpolation } from 'styled-components'

import { PageProps } from 'types/page'
import { normalizeArray } from 'utils/graphql/normalize'
import Layout from 'Layout'
import { RawBookCard, BookCardType } from 'types/book/card'
import { FONT, BORDER_RADIUS } from 'styles/tokens'
import { toVW, getWidthOfColumns } from 'styles/layout'
import { screenMin } from 'styles/responsive'
import BookCard from 'components/cards/BookCard'
import Grid from 'components/Grid'
import GridItem from 'components/Grid/GridItem'
import H from 'components/H'
import TextIntro from 'components/Wrapper/TextIntro'
import InfiniteScroll from 'components/InfiniteScroll'

const StyledWarningBox = styled.div`
  padding: 1em;
  font-size: ${FONT.SIZE.S};
  border-radius: ${BORDER_RADIUS.S};
  background: #f1ecda;

  ${screenMin.l`
    max-width: ${toVW(getWidthOfColumns.l(7))}
  `}

  ${screenMin.xl`
    max-width: ${toVW(getWidthOfColumns.xl(6))}
  `}
`

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
        node: RawBookCard
      }[]
    }
  }
}

const BookListPage: React.FC<Props> = ({ data: { bookData }, location }) => {
  const books = normalizeArray(bookData) as BookCardType[]

  return (
    <Layout location={location}>
      <TextIntro>
        <H as="h1" size="XXL" decorative>
          Book reviews
        </H>
        <p>
          {books.length} books rated, with {}
          {books.filter((b) => b.video).length} dedicated video reviews
        </p>
        <StyledWarningBox>
          This page is still in development, come back in a few weeks to browse
          by author, tag, and more!
        </StyledWarningBox>
      </TextIntro>

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
