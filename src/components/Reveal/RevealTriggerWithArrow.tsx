import React from 'react'
import styled from 'styled-components'

import { FONT } from 'styles/tokens'
import ArrowIcon from 'components/icons/ArrowIcon'
import Link from 'components/links/Link'

const StyledSummaryTrigger = styled.button`
  font-size: ${FONT.SIZE.S};
  font-weight: ${FONT.WEIGHT.BOLD};
`

const StyledArrowIcon = styled(ArrowIcon)<Pick<Props, 'open'>>`
  transition: transform 0.2s linear;
  transform: rotate(${({ open }): number => (open ? 270 : 90)}deg);
  margin: 0 0.5em 0 0;
`

interface Props {
  children: React.ReactNode
  open: boolean
  ariaId?: string
  onClick: () => void
  className?: string
}

const RevealTriggerWithArrow: React.FC<Props> = ({
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
    <StyledArrowIcon open={open} />
    {children}
  </Link>
)

export default RevealTriggerWithArrow
