import React from 'react'
import styled, { SimpleInterpolation } from 'styled-components'
import { Link, navigate } from 'gatsby'

import { BookCardType } from 'types/book'
import Image, { ImageColor } from 'components/Image'
import StarRating from 'components/StarRating'
import ArrowIcon from 'components/icons/ArrowIcon'
import { FONT, COLOR, BORDER_RADIUS } from 'styles/tokens'
import { screenMin } from 'styles/responsive'

interface BookCardProps {
  $big: boolean
}

const StyledBookCard = styled(
  ({ $big, ...props }) => <Link {...props} /> // eslint-disable-line
)<BookCardProps>`
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
  outline: 0 !important;
  --perspective: 800px;
  --book-pages-color: #afbdbb;

  ${({ $big }): SimpleInterpolation =>
    $big &&
    screenMin.m`
    --perspective: 1600px;
    `}
  }
`

const StyledImgWrapper = styled.figure`
  max-width: 100%;
  height: 150px;
  margin: 0.5em;
  background: var(--book-pages-color);
  box-shadow: 0 0.2em 0.5em rgba(0, 0, 0, 0.1);
  transform: scale(var(--book-scale));

  *::selection {
    background: var(--primary-color);
    color: ${COLOR.BACKGROUND_LIGHT};
  }

  &[data-big='true'] {
    height: 350px;
  }
`

const StyledImg = styled(Image)`
  height: 100%;
  vertical-align: bottom;
  transition: transform 0.3s ease-out;
  transform-origin: 0 50%;
  box-shadow: 0 0 0.3em rgba(0, 0, 0, 0.05);
  transform: perspective(var(--perspective)) rotateY(0);

  a:hover &,
  a:focus & {
    transition: transform 0.15s ease-out;
    transform: perspective(var(--perspective)) rotateY(-30deg);
  }

  a:active & {
    transition: transform 0.5s ease-out;
    transform: perspective(var(--perspective)) rotateY(-80deg);
  }
`

const StyledAccessibilityTitle = styled.figcaption`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: ${FONT.SIZE.S};
  color: transparent;
  padding: 0.5em;
  display: flex;
  place-items: center;
`

const StyledMeta = styled.div`
  margin: 0 0 1em;
  font-size: ${FONT.SIZE.XS};
  line-height: 1;
  text-align: center;

  & > * + * {
    margin-top: 0.25em;
  }
`

const StyledVideoLink = styled.button`
  display: inline-block;
  font-weight: ${FONT.WEIGHT.BOLD};
  padding: 0.25em 0.5em;
  transition: transform 150ms linear;

  &:hover {
    transform: translate(-0.1em, 0);
  }

  &::selection {
    background: transparent;
  }
`

interface Props {
  book: BookCardType
  featured?: boolean
  big?: boolean
  hideDetails?: boolean
  className?: string
}

const BookCard: React.FC<Props> = ({
  book,
  featured,
  big,
  hideDetails,
  className,
}) => {
  return (
    <StyledBookCard
      to={book.slug}
      $big={big}
      style={
        {
          background: hideDetails
            ? book.image.childImageColors.darkVibrant
            : featured && book.image.childImageColors.lightMuted,
          color: book.image.childImageColors.darkVibrant,
          '--primary-color': book.image.childImageColors.vibrant,
          '--secondary-color': book.image.childImageColors.darkVibrant,
          '--book-pages-color': featured && book.image.childImageColors.muted,
          '--book-scale': ((book.bookHeight || 198) / 220).toFixed(2),
        } as object
      }
      className={className}
      title={`${book.title} by ${book.author}`}
    >
      <StyledImgWrapper data-big={big}>
        <StyledImg image={book.image} background={ImageColor.Muted} />
        <StyledAccessibilityTitle>
          <span>
            {book.title} by {book.author}
          </span>
        </StyledAccessibilityTitle>
      </StyledImgWrapper>
      {!hideDetails && (book.rating7 || book.video) && (
        <StyledMeta>
          {book.video && (
            <StyledVideoLink
              onClick={(e): void => {
                e.preventDefault()
                navigate(book.video.slug)
              }}
            >
              Video review
              <ArrowIcon />
            </StyledVideoLink>
          )}
          {book.rating7 && <StarRating of7={book.rating7} />}
        </StyledMeta>
      )}
    </StyledBookCard>
  )
}

export default BookCard
