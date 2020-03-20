import React from 'react'

interface Props {
  className?: string
}

const PlayIcon: React.FC<Props> = ({ className }) => (
  <svg viewBox="0 0 11 14" className={className}>
    <path d="M9.2,6.2l-7.5-5c-0.5-0.3-1.2,0-1.2,0.6v10.3c0,0.6,0.7,1,1.2,0.6l7.5-5C9.8,7.4,9.8,6.6,9.2,6.2z" />
  </svg>
)

export default PlayIcon
