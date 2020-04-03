import React, { useState, useEffect, createRef } from 'react'
import styled from 'styled-components'

const TRANSITION_DURATION_IN_MS = 200

interface ContentProps {
  ref: React.RefObject<React.ReactNode>
  isOpen: boolean
  isTransitioning: boolean
  contentHeight: number
  className?: string
  as?: string
}

const StyledContent = styled.div<ContentProps>`
  margin: 0;
  will-change: opacity, max-height;
  transition: opacity ${TRANSITION_DURATION_IN_MS}ms ease-in-out, max-height ${TRANSITION_DURATION_IN_MS}ms ease-in-out;
  overflow: hidden;

  ${({ isOpen, isTransitioning }): string =>
    !isOpen &&
    !isTransitioning &&
    `
      position: absolute;
      opacity: 0;
      pointer-events: none;
  `}

  ${({ isTransitioning }): string =>
    isTransitioning &&
    `
      opacity: 0;
      max-height: 0;
  `}

  ${({ isOpen, contentHeight }): string =>
    isOpen &&
    `
      opacity: 1;
      max-height: ${contentHeight}px;
  `}
`

interface Props {
  children: React.ReactNode
  open: boolean
  ariaId?: string
  className?: string
  as?: string
}

const Reveal: React.FC<Props> = ({ children, open, ariaId, className, as }) => {
  const [isOpen, setIsOpen] = useState(open)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [contentHeight, setContentHeight] = useState(null)
  const contentEl = createRef<HTMLDivElement>()

  useEffect(() => {
    if (open) {
      const ref = contentEl.current as HTMLElement
      setContentHeight(ref.clientHeight)
      setIsTransitioning(true)
    } else {
      setIsOpen(false)
      setTimeout(() => setIsTransitioning(false), TRANSITION_DURATION_IN_MS)
    }
  }, [open])

  useEffect(() => {
    if (isTransitioning && !isOpen) setTimeout(() => setIsOpen(true), 50)
  }, [isTransitioning])

  return (
    <StyledContent
      className={className}
      ref={contentEl}
      isOpen={isOpen}
      isTransitioning={isTransitioning}
      contentHeight={contentHeight}
      id={ariaId}
      aria-hidden={!isOpen}
      as={as}
    >
      {children}
    </StyledContent>
  )
}

export default Reveal
