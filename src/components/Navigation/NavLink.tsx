import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { FONT } from 'styles/tokens'
import { screenMin } from 'styles/responsive'

interface StyledLinkProps {
  active: boolean
}

const StyledLink = styled(Link)<StyledLinkProps>`
  display: block;
  position: relative;
  padding: 0.5em;
  margin: 0 2em 0 -0.5em;

  ${screenMin.m`
    display: inline-block;
    padding: 1em;
    margin: 0 1em 0 -1em;
  `}

  ${({ active }): string => active && `font-weight: ${FONT.WEIGHT.BOLD};`}
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
