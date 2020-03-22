import React, { useState } from 'react'
import styled from 'styled-components'

import { PageProps } from 'types/page'
import Wrapper from 'components/Wrapper'
import { COLOR } from 'styles/tokens'
import { screenMax } from 'styles/responsive'

import NavLink from './NavLink'

interface OpenProps {
  isOpen?: boolean
}

const StyledWrapper = styled.div`
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
  padding-right: 1.5em;

  ${screenMax.s`
    height: 100vh;
    overflow: auto;
  `}

  ${({ isOpen }): string =>
    !isOpen &&
    `
    opacity: 0;
    pointer-events: none;
  `}
`

const Navigation: React.FC<PageProps> = ({ location }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <StyledWrapper>
      <Wrapper style={{ position: 'relative' }}>
        <StyledMenuButton
          onClick={(): void => setIsOpen(!isOpen)}
          isOpen={isOpen}
        >
          <span />
          <span />
          <span />
        </StyledMenuButton>
      </Wrapper>

      <StyledNav isOpen={isOpen}>
        <Wrapper>
          <NavLink to="/" activeMatches={[/^\/$/]} pathname={location.pathname}>
            Home
          </NavLink>
          <NavLink
            to="/books"
            activeMatches={[/^\/book[s/]/]}
            pathname={location.pathname}
          >
            Book reviews
          </NavLink>
          <NavLink
            to="/videos"
            activeMatches={[/^\/video[s/]/]}
            pathname={location.pathname}
          >
            Videos
          </NavLink>
        </Wrapper>
      </StyledNav>
    </StyledWrapper>
  )
}

export default Navigation
