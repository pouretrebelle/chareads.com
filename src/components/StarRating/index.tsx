import React from 'react'
import UnicodeStarRating from './UnicodeStarRating'

interface Props {
  of7?: number
  of5?: number
}

const StarRating: React.FC<Props> = ({ of7, of5 }) => {
  // if (of7) return <>{of7} / 7</>
  // if (of5) return <>{of5} / 5</>
  // return null

  return <UnicodeStarRating of7={of7} of5={of5} />
}

export default StarRating
