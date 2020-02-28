import React from 'react'
import { Link } from 'gatsby'
import styled, { css, FlattenSimpleInterpolation } from 'styled-components'

import { COLOR, FONT } from 'styles/tokens'

import { BACKGROUND_BLOCK } from '.'

interface StyledLinkProps {
  active: boolean
}

const StyledLink = styled(Link)<StyledLinkProps>`
  display: inline-block;
  position: relative;
  padding: 1.5em 2em;
  font-weight: ${FONT.WEIGHT.BOLD};
  /* font-size: 0.75em; */
  background: rgba(0, 5, 20, 0.8);// ${BACKGROUND_BLOCK};
  color: #fff;

  ${({ active }): string =>
    active &&
    `
    background: transparent;
    color: #000;
    box-shadow: inset 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  `};
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
