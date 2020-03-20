import React from 'react'
import styled from 'styled-components'

interface Props {
  className?: string
}

const StyledArrowIcon = styled.svg`
  width: 0.75em;
`

const ArrowIcon: React.FC<Props> = ({ className }) => (
  <StyledArrowIcon viewBox="0 0 20 17" className={className}>
    <path d="M19.6 7.4L12.5.3l-2.1 2.1L14.9 7H1.6L.1 10h14.8l-4.5 4.5 2.1 2.1 7.1-7.1c.5-.5.5-1.5 0-2.1z" />
  </StyledArrowIcon>
)

export default ArrowIcon
