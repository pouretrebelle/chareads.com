import React from 'react'
import styled from 'styled-components'

const StyledHideOnPercy = styled.span`
  @media only percy {
    display: inline-block;
    width: 5ch;
    overflow: hidden;
    white-space: nowrap;
    background: currentColor;
    color: currentColor;

    > * {
      visibility: hidden;
    }
  }
`

export const HideOnPercy: React.FC = ({ children }) => (
  <StyledHideOnPercy>{children}</StyledHideOnPercy>
)
