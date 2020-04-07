import React from 'react'
import styled from 'styled-components'

const StyledWrapper = styled.div`
  line-height: 0.8;
`

interface Props {
  of7?: number
  of5?: number
}

const UnicodeStarRating: React.FC<Props> = ({ of7, of5 }) => {
  if (of7) {
    const stars = Array.from({ length: 7 }, (v, i) => (i < of7 ? '★' : '☆'))

    return (
      <StyledWrapper>
        {stars.slice(0, 5)}|{stars.slice(5)}
      </StyledWrapper>
    )
  }

  if (of5) {
    const stars = Array.from({ length: 5 }, (v, i) => (i <= of5 ? '★' : '☆'))
    return <StyledWrapper>{stars.join('')}</StyledWrapper>
  }

  return null
}

export default UnicodeStarRating
