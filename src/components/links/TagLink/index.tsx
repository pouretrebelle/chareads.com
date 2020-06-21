import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import { FILTER_UNDERLINE_STYLE } from 'styles/tokens'
import PATHS from 'routes/paths'
import { splitTagByPrefix } from 'utils/tags'

const StyledLink = styled(Link)`
  ${FILTER_UNDERLINE_STYLE};
`

interface Props {
  tag: string
}

const TagLink: React.FC<Props> = ({ tag, ...props }) => {
  const [prefix, name] = splitTagByPrefix(tag)
  const to = `${PATHS.BOOKS}?${prefix}=${name}`

  return <StyledLink to={to} {...props} />
}

export default TagLink
