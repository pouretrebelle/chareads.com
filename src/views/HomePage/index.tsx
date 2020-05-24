import React from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'

import { PageProps } from 'types/page'
import { normalizeArray } from 'utils/graphql/normalize'
import PATHS from 'routes/paths'
import Layout from 'Layout'
import { BookCardType } from 'types/book'
import H from 'components/H'
import Grid from 'components/Grid'
import GridItem from 'components/Grid/GridItem'
import BookCard from 'components/cards/BookCard'
import Wrapper from 'components/Wrapper'
import { screen, screenMin } from 'styles/responsive'

import SectionLink from './SectionLink'

const StyledIntroGrid = styled(Grid)`
  && {
    margin-top: 1em;
    margin-bottom: 1em;

    ${screenMin.m`
      margin-top: 3.5em;
      margin-bottom: 1em;
    `}
  }
`

const StyledBookGrid = styled(Grid)`
  ${screen.m`
    > *:nth-child(14) {
      display: none;
    }
  `}
`

const StyledLinkWrapper = styled(Wrapper)`
  && {
    margin-top: 2em;
  }
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

const HomePage: React.FC<Props> = ({ data: { bookData }, location }) => {
  const books = normalizeArray(bookData) as BookCardType[]

  return (
    <Layout location={location} navOpenOnDesktop>
      <StyledIntroGrid>
        <GridItem span={2} spanFromM={12} spanFromL={9} spanFromXL={8}>
          <H as="h1" size="XXL" decorative style={{ marginLeft: '-0.1ch' }}>
            <Link to={PATHS.HOME}>Chareads</Link>
          </H>
          <p>
            Hello, I&rsquo;m Charlotte and I love to read anything and
            everything. Chareads is where I record and review every book I read.
            Have a poke around and find your next favourite.
          </p>
        </GridItem>
      </StyledIntroGrid>

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
              <BookCard book={book} featured={book.rating7 >= 6} />
            </GridItem>
          ))}
      </StyledBookGrid>

      <StyledLinkWrapper>
        <SectionLink to={PATHS.BOOKS}>Find more book reviews</SectionLink>
        <SectionLink to={PATHS.VIDEOS}>See all my bookish videos</SectionLink>
      </StyledLinkWrapper>
    </Layout>
  )
}

export const query = graphql`
  query HomePage {
    bookData: allBook(
      sort: { fields: dateRated, order: DESC }
      filter: { rating7: { ne: null } }
      limit: 12
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
