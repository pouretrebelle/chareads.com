import React, { useState } from 'react'
import styled from 'styled-components'
import { COLOR, FONT, BORDER_RADIUS } from 'styles/tokens'
import useClickOutside from 'utils/hooks/useClickOutside'

const StyledWrapper = styled.span`
  position: relative;
  display: inline-block;
`

const StyledOptions = styled.ol`
  position: absolute;
  background: ${COLOR.BACKGROUND_LIGHT};
  border-radius: ${BORDER_RADIUS.M};
  border: 1px solid ${COLOR.BACKGROUND_DARK};
  box-shadow: 0 2px 8px ${COLOR.SHADOW}20;
  min-width: 11em;
  max-height: 20.5em;
  top: -0.25rem;
  left: -0.5rem;
  margin: -1px; /* counteract border */
  padding: 0 0 0.25rem;
  z-index: 1;
  line-height: 1.25;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 0.25em;
    border-radius: 0 ${BORDER_RADIUS.S} ${BORDER_RADIUS.S} 0;
    /* border-left: 1px solid ${COLOR.BACKGROUND_DARK}; */
  }

  ::-webkit-scrollbar-thumb {
    background: ${COLOR.BACKGROUND_DARK};
  }
`

interface OptionProps {
  $active?: boolean
  $default?: boolean
}
const StyledOption = styled.li<OptionProps>`
  padding: 0.125rem 0.5rem;
  font-size: ${FONT.SIZE.S};
  cursor: pointer;
  user-select: none;

  ${({ $active }): string =>
    $active &&
    `
    background: ${COLOR.SHADOW}05;
  `}

  ${({ $default }): string =>
    $default &&
    `
    text-decoration: underline;
    text-decoration-color: var(--secondary-color);
  `}

  &:first-child {
    font-style: italic;
    text-decoration: underline;
    text-decoration-color: var(--secondary-color);
    font-size: ${FONT.SIZE.M};
    padding: 0.25rem 0.5rem;
    line-height: 1.5;
  }

  &:nth-child(n + 2):hover {
    background: ${COLOR.SHADOW}10;
  }
`

const StyledTrigger = styled.span`
  font-style: italic;
  text-decoration: underline;
  text-decoration-color: var(--secondary-color);
  cursor: pointer;
  user-select: none;
`

interface Props {
  value?: string
  valueArray?: string[]
  defaultLabel: string
  options: string[]
  onChange: (value: string | string[]) => void
}

const FilterTrigger: React.FC<Props> = ({
  value,
  valueArray,
  defaultLabel,
  options,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [wrapperElement] = useClickOutside(isOpen, () => setIsOpen(false))
  const multiChoice = !!valueArray

  const text = multiChoice
    ? valueArray.length === 0
      ? defaultLabel
      : valueArray.join(', ')
    : !value
    ? defaultLabel
    : value

  const handleChange = (newValue: string): void => {
    setIsOpen(false)

    if (!newValue) return onChange(multiChoice ? [] : undefined)

    if (!multiChoice) return onChange(newValue)

    if (valueArray.includes(newValue)) {
      return onChange(valueArray.filter((v) => v !== newValue))
    }

    return onChange([newValue, ...valueArray])
  }

  const optionsList =
    !multiChoice && value ? options.filter((o) => o !== value) : options

  if (!optionsList || (optionsList.length <= 1 && text === defaultLabel))
    return defaultLabel

  return (
    <StyledWrapper ref={wrapperElement}>
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
              $active={multiChoice && valueArray.includes(option)}
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
