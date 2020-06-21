import React from 'react'
import styled from 'styled-components'

import { Book } from 'types/book'
import { FONT } from 'styles/tokens'
import { screenMin } from 'styles/responsive'
import { splitTagsByPrefix } from 'utils/tags'
import TagLink from 'components/links/TagLink'

const StyledOl = styled.ol`
  margin: 1em 0;
  font-size: ${FONT.SIZE.S};

  ${screenMin.m`
    margin: 1.5em 0;
  `}
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
          {values
            .map((tag) => (
              <TagLink tag={tag.unprefixed} key={tag.unprefixed}>
                {tag.name}
              </TagLink>
            ))
            .reduce(
              (prev: React.ReactElement[], curr: React.ReactElement) =>
                prev === null ? [curr] : [...prev, ', ', curr],
              null
            )}
        </StyledLi>
      ))}
    </StyledOl>
  )
}

export default TagsList
