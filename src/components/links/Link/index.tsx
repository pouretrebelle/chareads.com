import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'

const Link = styled(GatsbyLink)`
  position: relative;
  outline: none;

  &:focus {
    outline: none;
  }

  &:active {
    outline: none;
  }

  &:before {
    content: '';
    position: absolute;
    top: -0.25em;
    left: -0.5em;
    bottom: -0.25em;
    right: -0.5em;
    outline: inherit;
  }

  &:focus:before {
    outline: 1px dashed var(--secondary-color);
  }

  &:active:before {
    outline: 1px dashed var(--primary-color);
  }
`

export default Link
