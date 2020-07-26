import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import { normalizeArray } from 'utils/graphql/normalize'
import PATHS from 'routes/paths'
import Layout from 'Layout'
import { PageProps } from 'types/page'
import { BookCardType } from 'types/book'
import { GatsbyImageSharpFluid } from 'types/image'
import Grid from 'components/Grid'
import GridItem from 'components/Grid/GridItem'
import BookCard from 'components/cards/BookCard'
import Wrapper from 'components/Wrapper'
import { screen, screenMin } from 'styles/responsive'
import { COLOR } from 'styles/tokens'

import Hero from './Hero'
import SectionLink from './SectionLink'

const StyledMainWrapper = styled.div`
  background: ${COLOR.BACKGROUND};
  position: relative;
  z-index: 90;
`

const StyledIntroGrid = styled(Grid)`
  && {
    padding-top: 1em;
    margin-bottom: 1em;

    ${screenMin.m`
      padding-top: 2em;
      margin-bottom: 2em;
    `}

    ${screenMin.l`
      padding-top: 3em;
      margin-bottom: 3em;
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
    cover: GatsbyImageSharpFluid
  }
}

const HomePage: React.FC<Props> = ({ data: { bookData, cover }, location }) => {
  const books = normalizeArray(bookData) as BookCardType[]

  return (
    <Layout location={location} navOpenOnDesktop navInverted>
      <Hero cover={cover} />

      <StyledMainWrapper>
        <StyledIntroGrid>
          <GridItem span={2} spanFromM={12} spanFromL={9} spanFromXL={8}>
            <p>
              Hello, I&rsquo;m Charlotte and I love to read anything and
              everything. Chareads is where I record and review every book I
              read. Have&nbsp;a&nbsp;poke around and find your next favourite.
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
                spanFromL={2}
              >
                <BookCard book={book} featured={book.rating7 >= 6} />
              </GridItem>
            ))}
        </StyledBookGrid>

        <StyledLinkWrapper>
          <SectionLink to={PATHS.BOOKS}>Find more book reviews</SectionLink>
          <SectionLink to={PATHS.VIDEOS}>See all my bookish videos</SectionLink>
        </StyledLinkWrapper>
      </StyledMainWrapper>
    </Layout>
  )
}

export const query = graphql`
  query HomePage {
    cover: file(relativePath: { eq: "cover.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 2000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
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
