import React from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'

import { PageProps } from 'types/page'
import { normalizeArray } from 'utils/graphql/normalize'
import PATHS from 'routes/paths'
import Layout from 'Layout'
import { RawBookCard, BookCardType } from 'types/book/card'
import H from 'components/H'
import Wrapper from 'components/Wrapper'
import Grid from 'components/Grid'
import GridItem from 'components/Grid/GridItem'
import BookCard from 'components/cards/BookCard'
import { screenMin, screen } from 'styles/responsive'
import { toVW, getWidthOfColumns } from 'styles/layout'

import LinkCard from './LinkCard'

const StyledIntro = styled.div`
  ${screenMin.l`
    max-width: ${toVW(getWidthOfColumns.l(9))};
  `}

  ${screenMin.xl`
    max-width: ${toVW(getWidthOfColumns.xl(8))};
  `}
`

const StyledBookGrid = styled(Grid)`
  ${screen.m`
    > *:nth-child(14) {
      display: none;
    }
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

const HomePage: React.FC<Props> = ({ data: { bookData }, location }) => {
  const books = normalizeArray(bookData) as BookCardType[]

  return (
    <Layout location={location}>
      <Wrapper>
        <H as="h1" size="XXL" decorative>
          <Link to={PATHS.HOME}>Chareads</Link>
        </H>
        <StyledIntro>
          <p style={{ marginBottom: '2em' }}>
            Hello, I&rsquo;m Charlotte and I love to read anything and
            everything. Chareads is where I record and review every book I read.
            Have a poke around and find your next favourite.
          </p>
        </StyledIntro>
      </Wrapper>

      <Wrapper>
        <H as="h2" size="L" decorative>
          <Link to={PATHS.BOOKS}>Recent reads</Link>
        </H>
      </Wrapper>
      <StyledBookGrid as="ol">
        {books.length &&
          books.map((book) => (
            <GridItem
              as="li"
              key={book.id}
              span={1}
              spanFromM={4}
              spanFromL={3}
            >
              <BookCard book={book} big={book.rating7 >= 6} />
            </GridItem>
          ))}
        <GridItem as="li" span={1} spanFromM={4} spanFromL={3}>
          <LinkCard to={PATHS.BOOKS}>More book reviews</LinkCard>
        </GridItem>
        <GridItem as="li" span={1} spanFromM={4} spanFromL={3}>
          <LinkCard to={PATHS.VIDEOS}>Videos</LinkCard>
        </GridItem>
      </StyledBookGrid>
    </Layout>
  )
}

export const query = graphql`
  query HomePage {
    bookData: allMarkdownRemark(
      sort: { fields: frontmatter___dateRated, order: DESC }
      filter: { frontmatter: { rating7: { ne: null } } }
      limit: 14
    ) {
      edges {
        node {
          ...BookCardFields
        }
      }
    }
  }
`

export default HomePage
