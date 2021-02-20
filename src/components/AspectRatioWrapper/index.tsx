import React from 'react'
import styled from 'styled-components'

const StyledAspectRatioWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;

  > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`

interface Props {
  ratio?: number
  as?: React.ElementType
  style?: object
  className?: string
  children: React.ReactNode
}

const AspectRatioWrapper: React.FC<Props> = ({
  ratio,
  as,
  style,
  className,
  children,
}) => (
  <StyledAspectRatioWrapper
    style={{
      paddingBottom: `${(100 / (ratio || 16 / 9)).toFixed(2)}%`,
      ...style,
    }}
    className={className}
    as={as}
  >
    {children}
  </StyledAspectRatioWrapper>
)

export default AspectRatioWrapper
