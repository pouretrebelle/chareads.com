import React from 'react'
import { graphql } from 'gatsby'
import styled, { SimpleInterpolation } from 'styled-components'

import { PageProps } from 'types/page'
import { normalizeArray } from 'utils/graphql/normalize'
import Layout from 'Layout'
import { RawBookCard, BookCardType } from 'types/book/card'
import { FONT } from 'styles/tokens'
import { screenMin } from 'styles/responsive'
import BookCard from 'components/cards/BookCard'
import Grid from 'components/Grid'
import GridItem from 'components/Grid/GridItem'
import InfiniteScroll from 'components/InfiniteScroll'
import PageTitle from 'components/Navigation/PageTitle'

interface Props extends PageProps {
  data: {
    bookData: {
      edges: {
        node: RawBookCard
      }[]
    }
  }
}

const BooksByAuthorPage: React.FC<Props> = ({
  data: { bookData },
  location,
}) => {
  const books = normalizeArray(bookData) as BookCardType[]
  const authorBookMap = {}

  books.forEach((book) => {
    if (!authorBookMap[book.author]) authorBookMap[book.author] = []
    authorBookMap[book.author].push(book)
  })
  const booksByAuthor = Object.entries(authorBookMap)
    .map(([author, books]) => ({ author, books }))
    .sort((a, b) => {
      const aLastName = a.author.split(' ').pop()
      const bLastName = b.author.split(' ').pop()
      if (aLastName < bLastName) {
        return -1
      }
      if (aLastName > bLastName) {
        return 1
      }
      return 0
    })

  const authorsByInitial = {}
  ;[...Array(26).keys()].forEach((i) => {
    authorsByInitial[String.fromCharCode(i + 65)] = []
  })

  booksByAuthor.forEach((authorWithBooks) => {
    const lastInitial = authorWithBooks.author.split(' ').pop()[0]

    authorsByInitial[lastInitial.toUpperCase()].push(authorWithBooks)
  })

  return (
    <Layout location={location} openOnDesktop>
      <PageTitle>Books by author</PageTitle>

      {Object.entries(authorsByInitial).map(
        ([initial, authors]) =>
          authors.length > 0 && (
            <Grid key={initial}>
              <GridItem
                span={4}
                style={{
                  fontSize: '5em',
                  fontFamily: 'cosmopolitan, sans-serif',
                  lineHeight: 0.8,
                }}
              >
                {initial}
              </GridItem>
              <GridItem span={8}>
                {authors.map((author) => (
                  <p key={author.author}>
                    {author.author} ({author.books.length})
                  </p>
                ))}
              </GridItem>
            </Grid>
          )
      )}
    </Layout>
  )
}

export const query = graphql`
  query BooksByAuthorPage {
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

export default BooksByAuthorPage
