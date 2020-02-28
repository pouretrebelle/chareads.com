import React from 'react'
import styled from 'styled-components'

import { PageProps } from 'types/page'
import Wrapper from 'components/Wrapper'
import { COLOR } from 'styles/tokens'
import { screen } from 'styles/responsive'
import { GAP, toVW } from 'styles/layout'

import NavLink from './NavLink'

const StyledNav = styled.nav`
  background: ${COLOR.BACKGROUND_LIGHT};
  box-shadow: 0 -2px 5px 2px rgba(0, 0, 0, 0.05), 0 -2px 10px 2px rgba(0,0,0,0.05);
  margin-bottom: 2em;

  ${screen.s`
    margin-bottom: ${toVW(2 * GAP.S)};
  `}

  ${screen.m`
    margin-bottom: ${toVW(2 * GAP.M)};
  `}

  ${screen.l`
    margin-bottom: ${toVW(2 * GAP.L)};
  `}

  ${screen.xl`
    margin-bottom: ${toVW(2 * GAP.XL)};
  `}
`

const Navigation: React.FC<PageProps> = ({ location }) => (
  <StyledNav>
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
)

export default Navigation
