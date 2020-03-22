import React from 'react'
import styled from 'styled-components'

import Grid from 'components/Grid'
import GridItem from 'components/Grid/GridItem'
import { FONT } from 'styles/tokens'
import { screen } from 'styles/responsive'

import { BookCardType } from 'types/book/card'
import BookCard from 'components/cards/BookCard'

const StyledWrapper = styled.div`
  margin: 1.5em 0;
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

const RelatedBooks: React.FC<Props> = ({ books, featuredSlugs, ownedSlug }) => (
  <StyledWrapper>
    <StyledGrid full>
      {books.map(
        (book: BookCardType): React.ReactNode => {
          const featured = ownedSlug
            ? ownedSlug === book.slug
            : featuredSlugs
            ? featuredSlugs.includes(book.slug)
            : book.rating7 >= 6
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

export default RelatedBooks
