import React from 'react'

interface Props {
  of7?: number
  of5?: number
}

const UnicodeStarRating: React.FC<Props> = ({ of7, of5 }) => {
  if (of7) {
    const stars = Array.from({ length: 7 }, (v, i) => (i <= of7 ? '★' : '☆'))

    return (
      <>
        {stars.slice(0, 4)}|{stars.slice(5)}
      </>
    )
  }

  if (of5) {
    const stars = Array.from({ length: 5 }, (v, i) => (i <= of5 ? '★' : '☆'))
    return <>{stars.join('')}</>
  }

  return null
}

export default UnicodeStarRating
