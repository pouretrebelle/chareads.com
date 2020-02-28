import React from 'react'
import styled from 'styled-components'

const StyledWrapper = styled.div`
  line-height: 0.8;
`

const StyledDivider = styled.span`
  display: inline-block;
  margin: 0 0.2em;
  width: 0.08em;
  height: 0.7em;
  background: currentColor;
  opacity: 0.3;
  vertical-align: -10%;
`

interface Props {
  of7?: number
  of5?: number
}

const StarRating: React.FC<Props> = ({ of7, of5 }) => {
  if (of7) {
    const stars = Array.from({ length: 7 }, (v, i) => (i < of7 ? '★' : '☆'))

    return (
      <StyledWrapper>
        {stars.slice(0, 5)}
        <StyledDivider />
        {stars.slice(5)}
      </StyledWrapper>
    )
  }

  if (of5) {
    const stars = Array.from({ length: 5 }, (v, i) => (i <= of5 ? '★' : '☆'))
    return <StyledWrapper>{stars.join('')}</StyledWrapper>
  }

  return null
}

export default StarRating
