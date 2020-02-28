import React from 'react'
import styled from 'styled-components'

import Wrapper from 'components/Wrapper'
import { COLOR } from 'styles/tokens'

import NavLink from './NavLink'

const StyledNav = styled.nav`
  background: ${COLOR.BACKGROUND_CARD};
  margin-bottom: 2em;
`

const Navigation: React.FC = () => (
  <StyledNav>
    <Wrapper>
      <NavLink to="/books" activeMatches={[/^\/$/, /^\/book[s/]/]}>
        Book reviews
      </NavLink>
      <NavLink to="/videos" activeMatches={[/^\/video[s/]/]}>
        Videos
      </NavLink>
    </Wrapper>
  </StyledNav>
)

export default Navigation
