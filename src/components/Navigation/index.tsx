import React from 'react'
import styled from 'styled-components'

import { PageProps } from 'types/page'
import { COLOR } from 'styles/tokens'
import { screen } from 'styles/responsive'
import { GAP, toVW, toPerc, GRID_MARGIN } from 'styles/layout'

import NavLink from './NavLink'

export const BACKGROUND_BLOCK = 'rgba(0,5,20,0.8)'

const StyledNav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  z-index: 1;
  /* background: ${COLOR.BACKGROUND_LIGHT}; */
  /* box-shadow: 0 -2px 5px 2px rgba(0, 0, 0, 0.05), 0 -2px 10px 2px rgba(0,0,0,0.05); */
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

const StyledWrapper = styled.div`
  display: flex;

  ${screen.s`
    width: ${toPerc(1 - 2 * GAP.S)};
  `}

  ${screen.m`
    width: ${toPerc(1 - 2 * GAP.M)};
  `}  

  ${screen.l`
    width: ${toPerc(1 - 2 * GRID_MARGIN.L)};
  `}

  ${screen.xl`
    width: ${toPerc(1 - 2 * GRID_MARGIN.XL)};
  `}
`

const Navigation: React.FC<PageProps> = ({ location }) => (
  <>
    <StyledNav>
      <div style={{ flex: '1 1 0', background: BACKGROUND_BLOCK }} />
      <StyledWrapper>
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
        <div style={{ flex: '1 1 0', background: BACKGROUND_BLOCK }} />
      </StyledWrapper>
      <div style={{ flex: '1 1 0', background: BACKGROUND_BLOCK }} />
    </StyledNav>
    <div style={{ height: '6em' }} />
  </>
)

export default Navigation
