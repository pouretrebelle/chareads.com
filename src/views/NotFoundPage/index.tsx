import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import { PageProps } from 'types/page'
import { BookCardType } from 'types/book'
import Layout from 'Layout'
import { normalizeArray } from 'utils/graphql/normalize'
import Wrapper from 'components/Wrapper'
import H from 'components/H'
import Grid from 'components/Grid'
import GridItem from 'components/Grid/GridItem'
import BookCard from 'components/cards/BookCard'
import { FONT } from 'styles/tokens'

const StyledBook = styled(GridItem)`
  list-style: none;
  font-size: ${FONT.SIZE.S};
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

const NotFoundPage: React.FC<Props> = ({ data: { bookData }, location }) => {
  const books = normalizeArray(bookData) as BookCardType[]

  return (
    <Layout location={location} navOpenOnDesktop navTitle="404" title="404">
      <Wrapper>
        <H size="XXL" decorative>
          Page not found
        </H>
        <p>
          Do you think this page is supposed to be here? Tweet me {}
          <a href="https://twitter.com/charlotte_dann">@charlotte_dann</a> and
          I&rsquo;ll look into it.
        </p>
      </Wrapper>
      <Grid style={{ marginTop: '2em' }}>
        <GridItem>
          <H size="M">Check out some recent book reviews:</H>
        </GridItem>
        {books.map(
          (book: BookCardType): React.ReactNode => (
            <StyledBook
              key={book.id}
              span={1}
              spanFromM={3}
              spanFromL={2}
              spanRowsFromM={1}
              as="li"
            >
              <BookCard book={book} />
            </StyledBook>
          )
        )}
      </Grid>
    </Layout>
  )
}

export const query = graphql`
  query NotFoundPage {
    bookData: allBook(
      limit: 12
      filter: { dateReviewed: { ne: null } }
      sort: { dateReviewed: DESC }
    ) {
      edges {
        node {
          ...BookCardFields
        }
      }
    }
  }
`

export default NotFoundPage
