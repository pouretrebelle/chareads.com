import React from 'react'
import styled from 'styled-components'

import { Book } from 'types/book'
import { FONT } from 'styles/tokens'
import { splitTagsByPrefix } from './utils'

const StyledOl = styled.ol`
  margin: 0;
  font-size: ${FONT.SIZE.S};

  span + span:before {
    content: ', ';
  }
`

const StyledLi = styled.li`
  line-height: 1.25;
  margin: 0.5em 0;
`

type Props = Pick<Book, 'tags'>

const TagsList: React.FC<Props> = ({ tags }) => {
  if (!tags || tags.length === 0) return null

  const splitTags = splitTagsByPrefix(tags)

  return (
    <StyledOl>
      {splitTags.map(({ prefix, values }) => (
        <StyledLi key={prefix}>
          <strong>{prefix}</strong> &ndash; {}
          {values.map((value) => (
            <span key={value}>{value}</span>
          ))}
        </StyledLi>
      ))}
    </StyledOl>
  )
}

export default TagsList
