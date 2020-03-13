import React from 'react'
import styled from 'styled-components'

import { Book } from 'types/book'
import { FONT } from 'styles/tokens'

const StyledDt = styled.dt`
  font-size: ${FONT.SIZE.S};
  font-weight: ${FONT.WEIGHT.BOLD};
`

const StyledDd = styled.dd`
  font-size: ${FONT.SIZE.S};
  margin: 0 0 1em;
`

const StyledOl = styled.ol`
  margin: 0;
  list-style: disc;
`

type Props = Pick<Book, 'tags'>

const TagsList: React.FC<Props> = ({ tags }) =>
  tags && tags.length === 0 ? null : (
    <>
      <StyledDt>Tags</StyledDt>
      <StyledDd>
        <StyledOl>
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </StyledOl>
      </StyledDd>
    </>
  )

export default TagsList
