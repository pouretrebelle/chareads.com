import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { GatsbyImage } from 'gatsby-plugin-image'

import { GatsbyImageSharpFluid } from 'types/image'
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

const StyledCover = styled(GatsbyImage)`
  position: absolute !important;
  top: 0;
  width: 100%;
  height: 100%;
  user-select: none;
  background: #50597a;

  img {
    object-fit: cover !important;
    object-position: 50% 100% !important;
  }

  > img {
    opacity: 1 !important;
  }

  img + picture img {
    transition: opacity 2000ms ease 0s !important;
  }
`

const StyledHeart = styled.span`
  color: #ff006a;
`

interface Props {
  cover: GatsbyImageSharpFluid
}

const HomeHero: React.FC<Props> = ({ cover }) => (
  <StyledCoverWrapper>
    <StyledCover image={cover} />

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
