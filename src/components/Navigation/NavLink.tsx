import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { COLOR, FONT } from 'styles/tokens'

interface StyledLinkProps {
  active: boolean
}

const StyledLink = styled(Link)<StyledLinkProps>`
  display: inline-block;
  padding: 0.25em 1em;
  font-weight: ${FONT.WEIGHT.BOLD};

  ${({ active }): string =>
    active &&
    `
    background: ${COLOR.BACKGROUND};
  `}
`

interface Props {
  to: string
  children?: React.ReactNode
  activeMatches: RegExp[]
  pathname: string
}

const NavLink: React.FC<Props> = ({
  to,
  children,
  activeMatches,
  pathname,
}) => (
  <StyledLink
    to={to}
    active={(activeMatches || []).some((match) => pathname.match(match))}
  >
    {children}
  </StyledLink>
)

export default NavLink
