import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import { FONT, COLOR, BORDER_RADIUS } from 'styles/tokens'

const StyledLinkCard = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0;
  padding: 1rem;
  height: 100%;
  background: ${COLOR.BACKGROUND_LIGHT};
  border-radius: ${BORDER_RADIUS.S};
  font-family: ${FONT.FAMILY.DECORATIVE};
  font-size: 2.5em;
  line-height: 0.85;
`

interface Props {
  to: string
  children: React.ReactNode
}

const LinkCard: React.FC<Props> = ({ to, children }) => {
  return (
    <StyledLinkCard to={to}>
      {children}
      <br />
      &rarr;
    </StyledLinkCard>
  )
}

export default LinkCard
