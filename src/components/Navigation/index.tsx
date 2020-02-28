import React from 'react'
import styled from 'styled-components'

import { PageProps } from 'types/page'
import Wrapper from 'components/Wrapper'
import { COLOR } from 'styles/tokens'
import { screen } from 'styles/responsive'
import { GAP, toVW } from 'styles/layout'

import NavLink from './NavLink'

const StyledNav = styled.nav`
  background: ${COLOR.BACKGROUND_CARD};
  margin-bottom: 2em;

  ${screen.s`
    margin-bottom: ${toVW(GAP.S)};
  `}

  ${screen.m`
    margin-bottom: ${toVW(GAP.M)};
  `}

  ${screen.l`
    margin-bottom: ${toVW(GAP.L)};
  `}

  ${screen.xl`
    margin-bottom: ${toVW(GAP.XL)};
  `}
`

const Navigation: React.FC<PageProps> = ({ location }) => (
  <StyledNav>
    <Wrapper>
      <NavLink
        to="/books"
        activeMatches={[/^\/$/, /^\/book[s/]/]}
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
)

export default Navigation
