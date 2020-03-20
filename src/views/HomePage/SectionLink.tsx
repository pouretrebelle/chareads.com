import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import { FONT } from 'styles/tokens'
import ArrowIcon from 'components/icons/ArrowIcon'

const StyledLinkCard = styled(Link)`
  font-weight: ${FONT.WEIGHT.BOLD};
`

interface Props {
  to: string
  children: React.ReactNode
}

const SectionLink: React.FC<Props> = ({ to, children }) => {
  return (
    <div>
      <StyledLinkCard to={to}>
        {children}&ensp;
        <ArrowIcon />
      </StyledLinkCard>
    </div>
  )
}

export default SectionLink
