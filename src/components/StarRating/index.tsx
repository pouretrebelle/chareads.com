import React from 'react'
import styled from 'styled-components'

import StarIcon from 'components/icons/StarIcon'

const StyledWrapper = styled.figure`
  margin: 0;
  line-height: 0;
  white-space: nowrap;

  > * {
    margin: 0 0.1em;
  }
`

const StyledDivider = styled.span`
  display: inline-block;
  margin: 0 0.2em -0.1em 0.25em;
  width: 0.08em;
  height: 1.2em;
  background: currentColor;
  border-radius: 1px;
  transform: rotate(15deg);
`

interface Props {
  of7?: number
  of5?: number
  className?: string
}

const StarRating: React.FC<Props> = ({ of7, className }) => {
  const stars = Array.from({ length: 7 }, (v, i) =>
    i < of7 ? <StarIcon full /> : <StarIcon />
  )

  return (
    <StyledWrapper
      aria-label={`${of7} out of 7 stars`}
      role="img"
      className={className}
    >
      {stars.slice(0, 5)}
      <StyledDivider />
      {stars.slice(5)}
    </StyledWrapper>
  )
}

export default StarRating
