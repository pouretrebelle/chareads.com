import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import Wrapper from 'components/Wrapper'
import ArrowIcon from 'components/icons/ArrowIcon'

const StyledWrapper = styled(Wrapper)`
  & {
    margin-top: 1em;
    margin-bottom: 1em;
  }
`

interface Props {
  to: string
  children: React.ReactNode
}

const BackLink: React.FC<Props> = ({ to, children }) => (
  <StyledWrapper>
    <Link to={to}>
      <ArrowIcon flip thin />
      {children}
    </Link>
  </StyledWrapper>
)

export default BackLink
