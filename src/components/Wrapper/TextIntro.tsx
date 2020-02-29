import React from 'react'
import styled from 'styled-components'

import Wrapper from 'components/Wrapper'
import { screenMin } from 'styles/responsive'
import { toVW, getWidthOfColumns } from 'styles/layout'

const StyledIntro = styled.div`
  margin-bottom: 2em;

  ${screenMin.l`
    max-width: ${toVW(getWidthOfColumns.l(9))};
  `}

  ${screenMin.xl`
    max-width: ${toVW(getWidthOfColumns.xl(8))};
  `}
`

interface Props {
  children: React.ReactNode
}

const TextIntro: React.FC<Props> = ({ children }) => (
  <Wrapper>
    <StyledIntro>{children}</StyledIntro>
  </Wrapper>
)

export default TextIntro
