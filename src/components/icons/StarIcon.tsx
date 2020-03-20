import React from 'react'
import styled from 'styled-components'

interface Props {
  className?: string
  full?: boolean
}

const StyledStarIcon = styled.svg`
  width: 1em;
  fill: currentColor;
`

const StarIcon: React.FC<Props> = ({ className, full }) => (
  <StyledStarIcon viewBox="0 0 20 20" className={className}>
    {full ? (
      <path d="M10 .1c-.2 0-.4.1-.5.3L7 6.4l-6.4.5c-.5 0-.7.6-.3.9L5.2 12l-1.5 6.3c-.1.4.2.7.5.7.1 0 .2 0 .3-.1l5.5-3.4 5.5 3.4c.1.1.2.1.3.1.3 0 .6-.3.5-.7L14.8 12l4.9-4.2c.4-.3.2-.9-.3-.9L13 6.4l-2.5-6c-.1-.2-.3-.3-.5-.3z" />
    ) : (
      <path d="M19.4 6.9L13 6.4l-2.5-6c-.2-.4-.8-.4-1 0L7 6.4l-6.4.5c-.5 0-.7.6-.3.9L5.2 12l-1.5 6.3c-.1.5.4.8.8.6l5.5-3.4 5.5 3.4c.4.2.9-.1.8-.6L14.8 12l4.9-4.2c.4-.3.2-.9-.3-.9zm-5.8 4.2c-.3.2-.4.6-.3 1l1 4.3-3.8-2.3c-.3-.2-.7-.2-1 0l-3.8 2.3 1-4.3c.1-.4 0-.7-.3-1L3 8.2l4.4-.4c.4 0 .7-.3.8-.6l1.8-4 1.7 4.1c.1.3.5.6.8.6l4.5.3-3.4 2.9z" />
    )}
  </StyledStarIcon>
)

export default StarIcon
