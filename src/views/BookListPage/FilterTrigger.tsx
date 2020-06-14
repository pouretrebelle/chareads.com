import React, { useState } from 'react'
import styled from 'styled-components'
import { COLOR, FONT, BORDER_RADIUS } from 'styles/tokens'
import useClickOutside from 'utils/hooks/useClickOutside'

const StyledWrapper = styled.span`
  position: relative;
`

const StyledOptions = styled.ol`
  position: absolute;
  background: ${COLOR.BACKGROUND_DARK};
  border-radius: ${BORDER_RADIUS.S};
  min-width: 11em;
  top: -0.25em;
  left: -0.5em;
  margin: 0;
  padding: 0 0 0.25rem;
  z-index: 1;
  line-height: 1.25;
`

interface OptionProps {
  $active?: boolean
}
const StyledOption = styled.li<OptionProps>`
  padding: 0.125rem 0.5rem;
  font-size: ${FONT.SIZE.S};
  cursor: pointer;
  user-select: none;

  ${({ $active }): string =>
    $active &&
    `
    background: rgba(0, 0, 0, 0.075);
  `}

  &:first-child {
    font-style: italic;
    font-size: ${FONT.SIZE.M};
    padding: 0.25rem 0.5rem;
    background: rgba(0, 0, 0, 0.1);
  }

  &:nth-child(n + 2):hover {
    background: rgba(0, 0, 0, 0.05);
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
            <StyledOption onClick={(): void => handleChange(undefined)}>
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
