import React from 'react'
import { Link } from 'gatsby'
import styled, { css, FlattenSimpleInterpolation } from 'styled-components'

import { COLOR, FONT } from 'styles/tokens'

interface StyledLinkProps {
  active: boolean
}

const StyledLink = styled(Link)<StyledLinkProps>`
  display: inline-block;
  position: relative;
  padding: 1em 1.5em;
  margin: 0 1em 0 -1em;
  font-weight: ${FONT.WEIGHT.BOLD};
  font-size: 0.75em;

  ${({ active }): FlattenSimpleInterpolation =>
    active &&
    css`
      background: ${COLOR.BACKGROUND};
      box-shadow: inset 0 2px 4px -2px rgba(0, 0, 0, 0.1);

      &:after {
        content: '';
        position: absolute;
        display: block;
        pointer-events: none;
        width: 100%;
        bottom: -9px;
        left: -12px;
        height: 0;
        border-width: 0 12px 12px 12px;
        border-style: solid;
        border-color: ${COLOR.BACKGROUND} transparent;
      }
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
