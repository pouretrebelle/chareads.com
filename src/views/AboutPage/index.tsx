import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Img from 'gatsby-image'

import Layout from 'Layout'
import { PageProps } from 'types/page'
import { BookCardType } from 'types/book'
import { GatsbyImageSharpFluid } from 'types/image'
import H from 'components/H'
import Grid from 'components/Grid'
import GridItem from 'components/Grid/GridItem'
import BookCard from 'components/cards/BookCard'
import ArrowIcon from 'components/icons/ArrowIcon'
import Link from 'components/links/Link'
import { normalizeArray } from 'utils/graphql/normalize'
import { FONT, BORDER_RADIUS } from 'styles/tokens'
import { screenMin } from 'styles/responsive'

const StyledBook = styled(GridItem)`
  list-style: none;
  font-size: ${FONT.SIZE.S};

  ${screenMin.l`
    &:nth-of-type(n + 7) {
      display: none;
    }
  `}
`

const StyledImg = styled(Img)`
  border-radius: ${BORDER_RADIUS.S};

  ${screenMin.m`
    margin-top: 1.25em;
  `}
`

const StyledLinksList = styled.ul`
  font-size: ${FONT.SIZE.S};
  line-height: 1.25;

  > * {
    margin-bottom: 0.5em;

    &:last-child {
      margin-bottom: 0;
    }
  }
`

interface Props extends PageProps {
  data: {
    bookData: {
      edges: {
        node: BookCardType
      }[]
    }
    portrait: GatsbyImageSharpFluid
  }
}

const AboutPage: React.FC<Props> = ({
  data: { bookData, portrait },
  location,
}) => {
  const books = normalizeArray(bookData) as BookCardType[]

  return (
    <Layout
      location={location}
      navOpenOnDesktop
      navTitle="About Chareads"
      title="About"
    >
      <Grid>
        <GridItem span={2} spanFromM={8} spanFromL={7}>
          <p>
            <em>Welcome to Chareads</em>, the online hub that brings together my
            book reviews and bookish YouTube videos.
          </p>
          <p>
            Contrary to most bookish people, I hated reading as a child. Apart
            from Twilight and the occasional book for English Lit, you would not
            find me within 6 feet of a book.
          </p>
          <p>
            When I discovered the joy of reading aged 20, I learned so much I
            decided I wanted to share that joy with <em>everybody</em>, so I
            made a YouTube channel called Chareadzard (in {}
            <a href="https://youtu.be/TH0kjnCYQM4">my first video</a> I stated I
            would never regret naming it that&mdash;I was wrong).
          </p>
          <p>
            Six years later, Chareadzard has evolved into Chareads, and I now
            make a monthly wrap-up video of all the books I’ve read in a month,
            and individual in-depth reviews for specific books.
          </p>
          <p>
            I hope you can find your new favourite book here, and feel free to
            email me at <a href="mailto:hi@cha.rs">hi@cha.rs</a> if you have any
            questions or suggestions for the site.
          </p>
        </GridItem>
        <GridItem span={2} spanFromM={4} columnsFromL="9 / 13">
          <StyledImg
            alt="Photo of Charlotte Dann"
            fluid={portrait.childImageSharp.fluid}
            backgroundColor={portrait.colors.vibrant}
          />

          <StyledLinksList>
            <li>
              <Link as="a" href="https://www.twitter.com/charlotte_dann">
                Follow me on Twitter&nbsp;
                <ArrowIcon />
              </Link>
            </li>
            <li>
              <Link
                as="a"
                href="https://www.goodreads.com/user/show/5008298-charlotte-dann"
              >
                Follow me on Goodreads&nbsp;
                <ArrowIcon />
              </Link>
            </li>
            <li>
              <Link as="a" href="https://www.youtube.com/chareads">
                Subscribe to Chareads on YouTube&nbsp;
                <ArrowIcon />
              </Link>
            </li>
            <li>
              <Link as="a" href="https://github.com/pouretrebelle/chareads.com">
                Website source code on GitHub&nbsp;
                <ArrowIcon />
              </Link>
            </li>
          </StyledLinksList>
        </GridItem>

        <GridItem>
          <H size="M">A couple of faves to get you going:</H>
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
              <BookCard book={book} featured />
            </StyledBook>
          )
        )}
      </Grid>
    </Layout>
  )
}

export const query = graphql`
  query AboutPage {
    portrait: file(relativePath: { eq: "portrait.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 340) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
      colors {
        ...GatsbyImageColors
      }
    }
    bookData: allBook(
      filter: {
        title: {
          in: [
            "Wild"
            "The Secret History"
            "The Moonstone"
            "My Year of Rest and Relaxation"
            "The Name of the Wind"
            "The Distance of the Moon"
            "When Breath Becomes Air"
            "Eat Up"
          ]
        }
      }
    ) {
      edges {
        node {
          ...BookCardFields
        }
      }
    }
  }
`

export default AboutPage
