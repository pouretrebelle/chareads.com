import React from 'react'
import styled from 'styled-components'

import Wrapper from 'components/Wrapper'
import H from 'components/H'
import { screenMin } from 'styles/responsive'

const StyledTitle = styled(H)`
  margin: 0.75em 0;
  line-height: 0.6;

  ${screenMin.m`
    margin: 1em 0;
  `}
`

interface Props {
  children: React.ReactNode
}

const PageTitle: React.FC<Props> = ({ children }) => (
  <Wrapper>
    <StyledTitle size="XXL" decorative>
      {children}
    </StyledTitle>
  </Wrapper>
)

export default PageTitle
