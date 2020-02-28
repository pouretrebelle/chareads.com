import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import Wrapper from 'components/Wrapper'
import { COLOR } from 'styles/tokens'

const StyledNav = styled.nav`
  background: ${COLOR.BACKGROUND_CARD};
  margin-bottom: 2em;
`

const activeStyle = {
  background: COLOR.BACKGROUND,
}

const StyledLink = styled(({ to, children, className }) => (
  <Link to={to} activeStyle={activeStyle} className={className}>
    {children}
  </Link>
))`
  display: inline-block;
  padding: 0.5em 1em;
`

const Navigation: React.FC = () => (
  <StyledNav>
    <Wrapper>
      <StyledLink to="/books">Books</StyledLink>
      <StyledLink to="/videos">Videos</StyledLink>
    </Wrapper>
  </StyledNav>
)

export default Navigation
