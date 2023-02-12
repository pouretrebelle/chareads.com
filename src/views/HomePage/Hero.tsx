import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { GatsbyColors } from 'types/image'
import Image, { ImageColor } from 'components/Image'
import H from 'components/H'
import Wrapper from 'components/Wrapper'
import { screenMin } from 'styles/responsive'
import { TEXT_SHADOW } from 'styles/tokens'

const SECRET_HISTORY_LINK = '/books/the-secret-history-donna-tartt/'

const StyledTitle = styled(Wrapper)`
  color: #fff;
  & {
    margin-top: 1em;
    margin-bottom: 1em;
  }

  ${screenMin.m`
    opacity: 0;
  `}
`

const StyledCoverWrapper = styled.figure`
  margin: 0;
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  perspective: 50vmax;

  > * {
    position: relative;
  }
`

const StyledQuoteWrapper = styled(Wrapper)`
  z-index: 20;
  color: #fff;
  text-shadow: ${TEXT_SHADOW};

  ${screenMin.m`
    margin-top: 5vh;
  `}
`

const StyledQuote = styled(H)`
  max-width: 5.5em;
  margin: 0 0 0.25em;
  font-size: 3em;
  text-indent: -0.25em;

  &:before {
    content: ${`"\\201C"`};
  }
`

const StyledBookLink = styled(Link)`
  position: absolute;
  z-index: 10;
  width: 19vh;
  height: 31vh;
  bottom: 8vh;
  left: 50%;
  margin-left: -7vh;
  transform: rotate3d(2, -1, 1.5, -30deg);
  transform-origin: 50% 100%;
  border-top-left-radius: 30% 5%;
  border-top-right-radius: 50% 10%;
  border-bottom-left-radius: 5%;
  border-bottom-right-radius: 5%;

  @media (min-aspect-ratio: 4008/3002) {
    width: 15vw;
    height: 22vw;
    bottom: 8vh;
    left: 50%;
    margin-left: -6vw;
  }
`

const StyledCover = styled(Image)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  user-select: none;
  background: transparent !important;

  img {
    object-fit: cover;
    object-position: 50% 100%;
    height: 100%;
    transition: opacity 2000ms ease 0s !important;
  }
`

const StyledFallback = styled.svg`
  background: #50597a;
  position: absolute;
  height: 100%;
  width: 100%;
  bottom: 0;
  left: 0;
  object-fit: cover;
  object-position: 50% 100%;
  z-index: -1;
`

const StyledHeart = styled.span`
  color: #ff006a;
`

interface Props {
  cover: {
    publicURL: string
    childImageColors: Pick<GatsbyColors, 'darkMuted' | 'muted'>
  }
}

const HomeHero: React.FC<Props> = ({ cover }) => (
  <StyledCoverWrapper>
    <StyledCover image={cover}>
      <StyledFallback
        aria-hidden
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMax slice"
        style={{
          background: cover.childImageColors[ImageColor.Muted],
          fill: cover.childImageColors[ImageColor.DarkMuted],
        }}
      >
        <path
          fillRule="evenodd"
          d="M0 79c0 85 0 81 5 81 2 0 3 1 2 2l1 2 1-1h1l3-2c2-1 2-1 5 2l5 2 3 1c4 5 7 4 3-1v-2l3 1v1c0 2 5 6 7 7s3-1 1-2v-3l1 2c1 3 6 7 6 6l2 2 2 4-2-1-6-1-6-1-8-1c-4 0-6-1-5-2l1-1v-1h-9c-2-1-5 0-10 2l-4 2H0l2 1v1c-2 0-2 1-2 16 0 13 0 15 2 14v-2c-1-2 6-8 10-8l5-2 2 1c-1 1 0 1 1 1 4-1 4-1 0 3l-5 6c-2 2-2 2-1 0 1-4-3-1-7 6-5 8-7 7-3 0 3-5 2-6-1-2l-3 4v84h69l69-1-8-18c-4-8-5-13-4-17 1-5 3-4 2 1 0 5 2 7 7 7 3 0 5-1 3-3-1-1 0-2 3-2l3 1-1 2c-1 3-2 3-4 3l-1 1v2l1 1 1 1c0 2 5 7 6 6l1 1c0 2 1 2 3 2l1 2v2h2c3 0 2 3-2 6l-3 3h47l-6-5c-3-4-6-5-10-6-6-1-8-3-8-5 0-3 3-3 14 0l10 2-22-9c-3 0-5-3-3-4 2-3 1-3-2-1-3 3-10 5-10 4l5-7h8l6 2 15 3 12 3c2-2-1-4-10-9-8-3-9-4-9-6 1-4 11-4 19 0l7 3 1 1 4 3c2 2 2 2 6 0l7-4c3-1 4-3 2-3l-1-3c0-8-14-54-17-56h-4l-4 1-15 3c-24 7-41 15-40 19 1 1 0 2-1 2-3 0-7 2-7 4h-1l-4 2-2 2 3 5c2 4 2 4 1 6-2 3-2 3 0 4 3 1 3 2 2 4-1 1-2 1-8-1-9-3-10-2-7 1 2 5 1 4-3 0-4-5-6-10-4-13l1-4 2-4c1-2 2-3 1-4v-2c2 0 6 4 6 6 0 1 5 6 6 5l-10-15-2 2-1 2-5-4-5-5-1-1-2-3-4-5v-2c2-2 1-9 0-9l-2-2c0-2-2-3-2-1-1 3 0 11 3 15 3 5 1 5-2 0-5-7-5-9-5-14 1-4 0-5-1-6-2 0-3 2-3 6v4l-1-4c-2-8 2-12 11-13l7-1 4 1c2 1 2 1-2 1l-4 1h22c1-1 11 10 14 15l4 10 3 6 3-2 9-5c6-3 7-3 9-8 2-8 9-14 17-17 9-3 9-3 9 0 0 2-2 3-3 4-3 1-4 2-4 6 0 3 0 3 1 2l2-1c0 2 3 3 3 1h4v-2h2l5 2 4 3 3 1c2 1 2 1 2-2-2-5-4-9-10-14-3-3-7-5-7-4l-1-2-1-4-3-11c0-3 0-3 4-3h4l-4 1c-5 1-2 2 3 2 2-1 4 0 5 1s1 1 1-1c0-3-3-5-9-5-7 0-6 1-8-11-1-7 0-10 4-14l1-3 1-1c2-2 3-6 2-6-4 0-4-2-1-5 2-2 2-3 1-3l3-5 6-3v2l2 1c2 1 2 1 0 1l-4 2-1 2v4c1 2 0 3-2 6-4 5-1 6 4 1 2-2 3-4 2-5l1-2v-1l1-2 2-6 3-5 1 1 3 1 2 3-1 1c-1-1-2 0-2 1l1 2v7l-1 3-1 1c0 2 6 1 6 0 1-2 9-3 11-1l-4 1-3 1c-3 2-1 3 6 6s11 7 10 10l1 2c1-1 5 1 6 3l3 3 2 4c0 3-2 5-3 4l-1 10c1 7 1 11-1 15l-1 8-2 4c-1 2-1 10 1 10 3 2 6 2 6 0 2-4 3-13 2-20v-10c1-2 1-2 1 1v4l1-2 1-3 1 2 1 2 1 5 1 12v7l1-6 1-6v6l-2 10c-1 6-1 6 2 6 4-2 7-7 7-16v-9l1 3 2 4 1-2v-9l1 2 1 2 1-2c1-2 2-2 5-2h6l4 2c3 3 5 1 5-6l2-17c2-17 2-18 6-23l4-4-26-1h-26l-1-3c-5-8-7-16-6-19l1-14 2-14a91 91 0 0132-2l6 1v4c1 7 4 7 4-1 1-5 1-7 3-6l-2 18v18c1 2 2 0 3-16 2-21 1-25-1-27-4-3 0-15 8-22l1-3-54-2h-54l1 10a2164 2164 0 010 50l-4 3V80l-2-32-10-1-9-1c0-2 2-2 8-2 12 0 11 2 12-23V0H0v79m247-67l-1 22v9h3c3 0 4 0 4-3V0l-2 1-1 5V3c0-2-1-3-2-3l-1 12m16-3c-2 26-2 34-1 34l1-3 1-3c1-1 1 0 1 2 0 3 0 4 3 4h4l3-40V0h-12v9m28 2a548 548 0 011 31l1-4c1-1 1-1 1 2 0 4 0 4 2 4 3-1 5-7 5-15 0-6-2-7-2-1v4l-1 4c0 3-2 4-3 1l-1-1-1-18c1-14 0-18-1-18l-1 11m9-7c0 2 0 3-2 3l-2 2 1 1c1 0 2 0 1 6l-1 2-2 1 6-1c2-2 3-18 1-18s-2 1-2 4m13-3l-3 39v4h6c5 1 7 1 8-1h2c1 2 3 2 9 2h7l1-11V22c-2-1-3-3-1-3 2 1 3-1 4-9l1-8c0-2-1-2-11-2h-11v9c-1 11-1 11-5 9-2-1-2-4-1-16 1-2-6-2-6-1m36 0l-1 8a588 588 0 01-3 34l3-21a508 508 0 011-21m9 0l-3 21c-3 24-2 23 0 23s3-2 3-7l1-8a190 190 0 004-28c0-2 0-2-2-2l-3 1m40 2c-2 6-1 10 1 10l1-6c0-7-1-9-2-4M270 3l-1 8 1 7c1 0 2-15 1-16s-1-1-1 1m108 8c0 9 0 9 1 4V5c-1-4-1-4-1 6m16-5c-2 4-2 12-1 12l2-10c0-3-1-3-1-2M285 26v17l1-14V16l-1 10m40-6c-1 3-1 5 2 5 2 0 2-1 2-3-1-4-2-5-4-2m-119 7l-3 9v1l2 2 1 2c1-1 2-20 1-21l-1 7m113-5l-1 10h3l2-6c0-3-4-6-4-4m72 2c0 2-1 3-2 3-2 0-3 2-1 2l2 4c0 3 0 4-2 5l-3 3h1c1-2 2-1 1 2 0 3-1 3-2 2h-1c0 4 5 2 6-2 3-12 4-27 1-19m4 4l-3 18c0 2 1 2 4 2h4V27h-3l-2 1m-69 40a790 790 0 01-3 50c1-1 5-1 6 1l7 1h7v-5c1-5 1-6-4-6l-4-1 4-1c6 0 5 1 7-16 1-12 2-15 2-5v6c2 1 1 8-1 9v4c2 0 0 10-1 12-3 2-1 3 4 3s5 0 6-8c0-7 0-7 11-5 5 1 5 1 5-2l1-2c3 0 3 2 2 4l-2 4h-1c0-2-1-2-4-2-6 0-7 2-7 8l1 4 4-1h6l5 1c6 0 6 0 8-14a2609 2609 0 011-22l-2-3c0-2-2-3-5-4l-2-3c0-2 0-2 3-1h8c4 0 4 0 5-3s2-4 4-5c3-1 3-2 3-7 0-6 0-6-3-6l-62-3h-8l-1 18m-94 4l-4 1h3l7 1h10l1-2h-17m95 5l-1 14-2 14h3l2 2c1 2 3-23 3-27 0-3-1-4-3-4l-2 1m69 12a441 441 0 00-2 28c-1 2 0 3 2 3l1-1 2-2c1 0 1-1-1-2v-10c2-10 3-27 1-27-1 0-2 3-3 11m-34-9l-3 23c2 1 3-2 4-12 1-9 0-14-1-11m-101 6a387 387 0 00-1 29c1 1 2-3 2-9V86h-1m9 6v21c-2 2-2 2 0 2h4l-1-2v-9c2-3 2-5 1-7v-2c1-3 0-8-2-8-1 0-2 1-2 5m-159 11l-5 5c-8 5-10 9-11 18l-1 1-2 4-2 4c-1 0-2 1-2 3l-2 5c-3 2-4 8-1 20 1 11 2 14 3 9 1-3 6-9 8-9 3 0 2 1-1 4-4 4-3 6 1 3 4-4 10-12 9-13l1-1 2-2 3-6 4-8 1-8 1-9c0-5 0-5-2-3-1 1-1 1-1-1 2-6 2-11 1-12l-1-4c0-5 0-5-3 0m146-3v12l1-7c0-5 0-7-1-5m35 6c-2 5-1 11 1 12s3-1 3-9c1-6 1-7-1-7l-3 4m-106 20c-3 1-6 5-6 7 1 2 6 3 6 0l2-8-2 1m140 14l-3 24-3 29 4-21c3-23 3-22 6-21 2 0 2 0-1 25-2 18-2 18 0 19 3 1 21 0 22-1a546 546 0 009-42l3-3c0-3 1-4 3-4 4 0 4 0 1 14-1 8-2 9-3 9l-2 2 2 1c1-1 1 2-1 12-1 4-1 5 2 5 3 1 2 2-1 3-2 0-4 1-2 2 2 2 10 2 14 1 4-2 5-3 6-9l1-6v11c0 4 0 5 3 5s4-1 5-7l2-12 1-6 1-5c0-8 1-12 3-12s2-1 2-8v-9h-74v4m-61 6c-2 1-1 6 0 8l2 1 2 1 1 6v2l2 1c1 1 1 0 2-7 0-10 0-11-3-9-3 1-3 1-3-1-1-2-2-4-3-2m22 4c-2 4-1 9 1 9l1 1-1 1c-2-1-2 0-2 2v2l2-2c2-2 3-11 1-10l-1-2c0-3-1-3-1-1m101 2a115 115 0 00-3 19l1-3 2-9v-7m-164 5c3 2 3 2 1 2h-6c-2 2 1 2 7 2 5-1 5-1 6 2l1 4v-4l1-4c2-1 1-2-6-2h-4m-11 2l-2 2 2 3c1 3 3 4 4 3 2 0 1-2-1-2-2-1-3-4 0-6 2-3 0-2-3 0m63 9c-1 3 0 6 2 8 2 1 2 1 2-3v-6l-2-1-2 2m10 0c-1 1 0 7 1 8l1-4c0-4-1-6-2-4m-157 4l-6 2 5 4c4 4 7 5 7 3l-3-2-3-2c0-2 2-2 4-1h1l1-2 5 5 4 3c4 2 14 4 13 2l-3-1c-3 0-8-3-8-5l2-1h3c4-2-13-6-22-5m268 10c-1 10-1 15 1 12h1l1-11v-12l-3 11M63 193l-9 3h-2c3-2 3-4 0-3-6 0-10 2-10 3 0 3-1 4-4 4l-2 1-2 3-7 6-6 4c-1-1-2 1-2 4l1 4 1 4c1 4 3 5 4 3 1-3 3-2 3 1s0 3 4-4c7-11 13-16 22-19l4-2 2-1c1 1 2 0 3-2 1-4 5-6 8-5l1-3c0-5-1-5-9-1m255 11l3 12c3 13 4 17 4 39l2 21v5l-14 1c-18 0-29-1-29-4l6-3 5-5c0-2-1-3-3-1-1 2-6 3-9 3-2 0-2-1-1-7v-4c-2-1-7 8-7 12l-1 3-3 2c-3 3-5 2-5-2 2-8 2-9 0-7l-2 6-3 3c-3 1-15-1-16-2h-15l-8-1c-1 1 1 4 3 4l12 6c3 3 9 6 18 9l5 4c1 2 3 2 11 2h10l-1-3-4-4v-2c3-2 23 2 30 7 2 1 7 2 48 2h46v-90l-8 1-17 1c-16 2-22 1-31-3-8-3-26-7-26-5m-119 4l-7 2-3 2h1l7-2 6-2h-4m-141 5l-4 3-8 4h3c0 2 0 3-2 4l-2 2c1 2-1 3-4 3-1 0-3 1-5 4-3 5-4 7-2 5s5-1 5 1c-1 1-1 2 1 2s2 1-5 8c-5 4-8 8-8 9l1-1c1-1 2-1 3 1 2 1 2 1 3-1l2-3v1c0 1 3 4 5 4s2 0 1 2c-2 3-3 5-1 5 2-2 3 0 1 4l-1 6c1 2 1 2 2-1 2-4 3-5 5-2 1 1 4 2 4 0l3-2h3c2-1 3-3 4-11l2-3 3-5c2-5 5-7 4-3l-2 7v4l2-4c3-6 4-7 4-4l2-2c2-5 3-12 2-13l-1 2c0 5-2 4-3 0l-1-3c0 3-2 1-2-1 0-1 0-2 1-1l1-3c-2-6 3-7 4 0 1 1 1 0 1-2l-2-6c-2-3-3-4-1-4l1-1c-1-2 0-2 2-1l-1-4c-1-4-3-4-8 0-3 2-4 2-4 1l2-3c1-3-6-2-10 2m36-3c0 4 4 9 7 11 5 3 6 3 3-1-3-3-4-4-2-4s-5-6-7-6h-1m-53 11l-2 2-1 1c-1-1-2 0-2 1l-2 4-2 4c0 1 2 0 3-3l7-7 2-1c1-2 1-2-3-1m-29 8l-2 6-1 2-3 2v6l1 3c2 0 2 0 1 2v3l3-3 2-4 2-1v1l1 3 3-5 1-5-1-4-1-5c0-2-3-4-4-4s-2 1-2 3m19 12l-3 1c-2-1-5 4-5 6 1 3 4 2 7-3s4-8 1-4m162 8c-4 1-4 4-2 5 3 3 8 2 11-1 2-2 2-2 1-4h-10m-50 9c-2 1-1 6 1 7 2 0 5 3 7 5 7 7 9 6 4-1l-4-6-1-1v-2l-1-1c-1 1-3 0-4-1h-2m-77 4c-4 3-5 10-3 10l1-1 3-5c2-2 3-3 2-5 0-1-1-1-3 1"
        />
      </StyledFallback>
    </StyledCover>

    <StyledTitle>
      <Link to="/">Chareads</Link>
    </StyledTitle>

    <StyledQuoteWrapper>
      <StyledQuote as="blockquote" size="XL" decorative>
        It is better to know one book intimately than a hundred superficially
      </StyledQuote>
      <small>
        <StyledHeart>&#10084;</StyledHeart> Donna Tartt, {}
        <Link to={SECRET_HISTORY_LINK}>The Secret History</Link>
      </small>
    </StyledQuoteWrapper>

    <StyledBookLink to={SECRET_HISTORY_LINK} />
  </StyledCoverWrapper>
)

export default HomeHero
