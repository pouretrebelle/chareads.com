import React, { useState } from 'react'
import styled, { SimpleInterpolation } from 'styled-components'

import PATHS from 'routes/paths'
import { PageProps } from 'types/page'
import Wrapper from 'components/Wrapper'
import ArrowIcon from 'components/icons/ArrowIcon'
import Link from 'components/links/Link'
import { COLOR } from 'styles/tokens'
import { screenMin, screenMax } from 'styles/responsive'

import NavLink from './NavLink'

interface Props extends PageProps {
  openOnDesktop?: boolean
  title?: string
  titleLink?: string
}

interface OpenProps {
  isOpen?: boolean
  openOnDesktop?: boolean
}

const StyledTitle = styled(Wrapper)`
  & {
    margin-top: 1em;
    margin-bottom: 1em;
  }
`

const StyledFixedWrapper = styled.div`
  position: fixed;
  z-index: 80;
  top: 0;
  left: 0;
  right: 0;
`

const StyledMenuButton = styled.button<OpenProps>`
  position: absolute;
  display: block;
  z-index: 100;
  top: 0.5em;
  right: -0.5em;
  width: 2.5em;
  height: 2.5em;

  ${({ openOnDesktop }): SimpleInterpolation =>
    openOnDesktop &&
    screenMin.m`
    display: none;
  `}

  > * {
    position: absolute;
    width: 1.5em;
    height: 0.12em;
    background: black;
    border-radius: 2px;
    top: 50%;
    left: 0.5em;
    transition: opacity 0.2s linear, transform 0.2s linear;
    transform-origin: 50% 50%;
    margin-top: -0.06em;
  }

  > *:nth-child(1) {
    transform: translate(0, -0.5em);
    ${({ isOpen }): string =>
      isOpen && `transform: rotate(-45deg) scale(1.1, 1);`}
  }

  > *:nth-child(2) {
    ${({ isOpen }): string => isOpen && `opacity: 0;`}
  }

  > *:nth-child(3) {
    transform: translate(0, 0.5em);
    ${({ isOpen }): string =>
      isOpen && `transform: rotate(45deg) scale(1.1, 1);`}
  }
`

const StyledNav = styled.nav<OpenProps>`
  background: ${COLOR.BACKGROUND};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transition: opacity 0.2s ease-in;

  ${screenMax.s`
    padding-top: 0.5em;
    height: 100vh;
  `}

  ${({ isOpen, openOnDesktop }): SimpleInterpolation =>
    !isOpen &&
    (openOnDesktop
      ? screenMax.s`
    opacity: 0;
    pointer-events: none;
  `
      : `
    opacity: 0;
    pointer-events: none;
  `)}
`

const Navigation: React.FC<Props> = ({
  location,
  openOnDesktop,
  title,
  titleLink,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <StyledFixedWrapper>
        <Wrapper style={{ position: 'relative' }}>
          <StyledMenuButton
            onClick={(): void => setIsOpen(!isOpen)}
            isOpen={isOpen}
            openOnDesktop={openOnDesktop}
          >
            <span />
            <span />
            <span />
          </StyledMenuButton>
        </Wrapper>

        <StyledNav isOpen={isOpen} openOnDesktop={openOnDesktop}>
          <Wrapper>
            <NavLink
              to="/"
              activeMatches={[/^\/$/]}
              pathname={location.pathname}
            >
              Home
            </NavLink>
            <NavLink
              to={PATHS.BOOKS}
              activeMatches={[/^\/book[s/]/]}
              pathname={location.pathname}
            >
              Books
            </NavLink>
            <NavLink
              to={PATHS.VIDEOS}
              activeMatches={[/^\/video[s/]/]}
              pathname={location.pathname}
            >
              Videos
            </NavLink>
          </Wrapper>
        </StyledNav>
      </StyledFixedWrapper>
      {title && (
        <StyledTitle>
          <Link to={titleLink || location.pathname}>
            {titleLink && <ArrowIcon flip thin />}
            {title}
          </Link>
        </StyledTitle>
      )}
    </>
  )
}

export default Navigation
