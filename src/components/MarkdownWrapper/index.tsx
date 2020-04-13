import styled from 'styled-components'
import { COLOR, FONT } from 'styles/tokens'
import { trim } from 'styles/helpers'

const MarkdownWrapper = styled.div`
  ${trim}

  hr {
    height: 0.1em;
    background: ${COLOR.BACKGROUND_DARK};
    border: 0;
    margin: 1em 0;
  }

  blockquote {
    margin-left: 0;
    border-left: 0.2em solid ${COLOR.BACKGROUND_DARK};
    padding-left: 1em;
  }

  h2 {
    margin-top: 1em;
    font-size: ${FONT.SIZE.M};
  }

  h3,
  h4 {
    margin-top: 1em;
    font-size: ${FONT.SIZE.S};
  }

  img {
    max-width: 100%;
  }

  ul {
    list-style: disc;
  }

  ol {
    list-style: decimal;
  }

  p,
  ul,
  ol {
    margin: 0.5em 0;
  }

  ul,
  ol {
    padding-left: 1em;
    ${trim}
  }

  li {
    margin: 0.25em 0;
  }

  a {
    text-decoration: underline;
    text-decoration-color: var(--secondary-color);
  }
`

export default MarkdownWrapper
