import React from 'react'
import styled from 'styled-components'

import Grid from 'components/Grid'
import GridItem from 'components/Grid/GridItem'
import H from 'components/H'
import { FONT } from 'styles/tokens'
import { screen, screenMin } from 'styles/responsive'

import { BookCardType } from 'types/book'
import BookCard from 'components/cards/BookCard'

const StyledWrapper = styled.div`
  margin: 2em 0 1em;
`

const StyledTitleGridItem = styled(GridItem)`
  ${screenMin.m`
    display: none;
  `}
`

const StyledGrid = styled(Grid)`
  font-size: ${FONT.SIZE.S};

  ${screen.l`
    > *:nth-last-child(1) {
      display: none;
    }
  `}
`

interface Props {
  books: BookCardType[]
  featuredSlugs?: string[]
  ownedSlug?: string
}

const RelatedBooks: React.FC<Props> = ({ books, featuredSlugs, ownedSlug }) => {
  if (!books || books.length === 0) return null

  return (
    <StyledWrapper>
      <StyledGrid full>
        <StyledTitleGridItem>
          <H size="L" as="h2">
            Related books
          </H>
        </StyledTitleGridItem>

        {books.map(
          (book: BookCardType): React.ReactNode => {
            const featured = ownedSlug
              ? ownedSlug === book.slug
              : featuredSlugs && featuredSlugs.includes(book.slug)

            return (
              <GridItem key={book.id} span={1} spanFromM={3} spanFromL={2}>
                <BookCard
                  book={book}
                  featured={featured}
                  hideDetails={ownedSlug === book.slug}
                />
              </GridItem>
            )
          }
        )}
      </StyledGrid>
    </StyledWrapper>
  )
}

export default RelatedBooks
