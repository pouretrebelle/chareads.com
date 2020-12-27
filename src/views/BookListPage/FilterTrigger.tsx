import React, { useState } from 'react'
import styled from 'styled-components'
import {
  COLOR,
  FONT,
  BORDER_RADIUS,
  FILTER_UNDERLINE_STYLE,
} from 'styles/tokens'
import useClickOutside from 'utils/hooks/useClickOutside'
import { trackEvent } from 'utils/tracking'

const StyledWrapper = styled.div`
  position: relative;
  background: ${COLOR.BACKGROUND};
  padding: 0.5em;
`

const StyledOptions = styled.ol`
  position: absolute;
  background: ${COLOR.BACKGROUND_LIGHT};
  border-radius: ${BORDER_RADIUS.M};
  border: 1px solid ${COLOR.BACKGROUND_DARK};
  box-shadow: 0 2px 8px ${COLOR.SHADOW}20;
  min-width: 11em;
  max-height: 20.5em;
  top: 1.375rem;
  left: 0;
  margin: -1px; /* counteract border */
  padding: 0 0 0.25rem;
  z-index: 1;
  line-height: 1.25;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 0.25em;
    border-radius: 0 ${BORDER_RADIUS.S} ${BORDER_RADIUS.S} 0;
  }

  ::-webkit-scrollbar-thumb {
    background: ${COLOR.BACKGROUND_DARK};
  }
`

interface OptionProps {
  $default?: boolean
}
const StyledOption = styled.li<OptionProps>`
  padding: 0.125rem 0.5rem;
  font-size: ${FONT.SIZE.S};
  cursor: pointer;
  user-select: none;

  ${({ $default }): string =>
    $default &&
    `
    ${FILTER_UNDERLINE_STYLE};
  `}

  &:first-child {
    ${FILTER_UNDERLINE_STYLE};
    font-style: italic;
    font-size: ${FONT.SIZE.M};
    padding: 0.25rem 0.5rem;
    line-height: 1.5;
  }

  &:nth-child(n + 2):hover {
    background: ${COLOR.SHADOW}10;
  }
`

const StyledLabel = styled.h2`
  font-size: 0.75em;
  cursor: pointer;
  user-select: none;
  margin: 0;
  text-transform: uppercase;
`
const StyledTrigger = styled.button`
  ${FILTER_UNDERLINE_STYLE};
  /* font-size: 0.75em; */
  text-align: left;
  cursor: pointer;
  user-select: none;
`

interface Props {
  label?: string
  value?: string
  defaultLabel: string
  options: string[]
  trackingCategory: string
  onChange: (value: string | string[]) => void
}

const FilterTrigger: React.FC<Props> = ({
  label,
  value,
  defaultLabel,
  options,
  trackingCategory,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [wrapperElement] = useClickOutside(isOpen, () => setIsOpen(false))
  const text = value || defaultLabel

  const handleChange = (newValue: string): void => {
    setIsOpen(false)

    if (!newValue) return onChange(undefined)

    trackEvent('book-filter', trackingCategory, newValue)
    return onChange(newValue)
  }

  const optionsList = value ? options.filter((o) => o !== value) : options
  if (!optionsList || optionsList.length === 0)
    return <>{value || defaultLabel}</>

  return (
    <StyledWrapper ref={wrapperElement}>
      <StyledLabel>{label}</StyledLabel>

      <StyledTrigger onClick={(): void => setIsOpen(!isOpen)}>
        {text}
      </StyledTrigger>

      {isOpen && (
        <StyledOptions>
          <StyledOption onClick={(): void => setIsOpen(false)}>
            {text}
          </StyledOption>
          {defaultLabel !== text && (
            <StyledOption
              onClick={(): void => handleChange(undefined)}
              $default
            >
              {defaultLabel}
            </StyledOption>
          )}
          {optionsList.map((option) => (
            <StyledOption
              key={option}
              onClick={(): void => handleChange(option)}
            >
              {option}
            </StyledOption>
          ))}
        </StyledOptions>
      )}
    </StyledWrapper>
  )
}

export default FilterTrigger
