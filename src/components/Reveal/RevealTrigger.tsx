import React from 'react'
import styled from 'styled-components'

import { FONT } from 'styles/tokens'
import { screenMax } from 'styles/responsive'
import Link from 'components/links/Link'

const StyledSummaryTrigger = styled.button`
  font-size: ${FONT.SIZE.S};
  font-weight: ${FONT.WEIGHT.BOLD};

  ${screenMax.s`
    width: 100%;
    text-align: left;
  `}
`

const StyledIcon = styled.i<Pick<Props, 'open'>>`
  display: inline-block;
  position: relative;
  width: 1.25em;
  height: 1.25em;
  vertical-align: -0.3em;

  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 0.35em;
    width: 0.7em;
    height: 0.125em;
    background: currentColor;
    transform-origin: 50% 50%;
    transform: translate(-50%, -50%);
    transition: transform 0.2s linear;
  }

  ${({ open }): string =>
    !open &&
    `
    &:before {
      transform: translate(-50%, -50%) rotate(-90deg);
    }
  `}
`

interface Props {
  children: React.ReactNode
  open: boolean
  ariaId?: string
  onClick: () => void
  className?: string
}

const RevealTrigger: React.FC<Props> = ({
  children,
  open,
  ariaId,
  onClick,
  className,
}) => (
  <Link
    onClick={onClick}
    aria-expanded={open}
    aria-controls={ariaId}
    as={StyledSummaryTrigger}
    className={className}
  >
    <StyledIcon open={open} />
    {children}
  </Link>
)

export default RevealTrigger
