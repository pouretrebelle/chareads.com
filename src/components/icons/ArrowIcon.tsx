import React from 'react'
import styled from 'styled-components'

interface Props {
  className?: string
  flip?: boolean
  thin?: boolean
}

const StyledArrowIcon = styled.svg<Props>`
  width: 0.75em;
  ${({ flip }): string =>
    flip ? `margin-right: 0.4em;` : `margin-left: 0.4em;`}

  ${({ flip }): string =>
    flip && `transform: rotate(180deg);`}

  a > &,
  button > & {
    transition: transform 150ms linear;
  }

  a:hover > &,
  button:hover > & {
    transform: ${({ flip }): string =>
      flip ? 'translate(-0.2em, 0) rotate(180deg)' : 'translate(0.2em, 0);'};
  }
`

const ArrowIcon: React.FC<Props> = ({ className, thin, flip }) => (
  <StyledArrowIcon viewBox="0 0 20 17" className={className} flip={flip}>
    {thin ? (
      <path d="M19.4 7.8L12.5.9 11.4 2l5.8 5.8H.5v1.5h16.7L11.4 15l1.1 1.1 6.9-6.9c.3-.4.3-1 0-1.4z" />
    ) : (
      <path d="M19.6 7.4L12.5.3l-2.1 2.1L14.9 7H1.6L.1 10h14.8l-4.5 4.5 2.1 2.1 7.1-7.1c.5-.5.5-1.5 0-2.1z" />
    )}
  </StyledArrowIcon>
)

export default ArrowIcon
