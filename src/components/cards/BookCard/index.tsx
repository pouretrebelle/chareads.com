import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import { BookCardType } from 'types/book/card'
import StarRating from 'components/StarRating'
import ArrowIcon from 'components/icons/ArrowIcon'
import { FONT, COLOR, BORDER_RADIUS, BREAKPOINT } from 'styles/tokens'

const StyledBookCard = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 0;
  height: 100%;
  position: relative;
  overflow: hidden;
  background: ${COLOR.BACKGROUND_DARK};
  border-radius: ${BORDER_RADIUS.S};
`

const StyledImg = styled(Img)`
  box-shadow: 0 0.2em 0.5em rgba(0, 0, 0, 0.1), 0 0 0.3em rgba(0, 0, 0, 0.05);
  max-width: 100%;
  height: auto;
  margin: 0.5em;
  transform: scale(var(--book-scale));
`

const StyledMeta = styled.div`
  margin: 0 0 0.5em;
  line-height: 1;
  text-align: center;
`

const StyledVideoLink = styled(Link)`
  font-size: ${FONT.SIZE.XS};
  font-weight: ${FONT.WEIGHT.BOLD};
  padding: 0.25em 0.5em;
`

interface Props {
  book: BookCardType
  featured?: boolean
  big?: boolean
}

const BookCard: React.FC<Props> = ({ book, featured, big }) => {
  return (
    <StyledBookCard
      to={book.slug}
      style={
        {
          background: featured && book.image.colors.lightMuted,
          color: book.image.colors.darkVibrant,
          '--primary-color': book.image.colors.vibrant,
        } as object
      }
      title={`${book.title} by ${book.author}`}
    >
      <StyledImg
        fixed={
          big
            ? [
                {
                  ...book.image.childImageSharp.h150,
                  media: `(max-width: ${BREAKPOINT.M - 1}px)`,
                },
                {
                  ...book.image.childImageSharp.h350,
                  media: `(min-width: ${BREAKPOINT.M}px)`,
                },
              ]
            : book.image.childImageSharp.h150
        }
        style={{
          '--book-scale': ((book.bookHeight || 198) / 220).toFixed(2),
        }}
        backgroundColor={book.image.colors.muted}
      />
      {(book.rating7 || book.video) && (
        <StyledMeta>
          {book.rating7 && <StarRating of7={book.rating7} />}
          {book.video && (
            <StyledVideoLink to={book.video.fields.slug}>
              Video review&ensp;
              <ArrowIcon />
            </StyledVideoLink>
          )}
        </StyledMeta>
      )}
    </StyledBookCard>
  )
}

export default BookCard
