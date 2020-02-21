import { createGlobalStyle } from 'styled-components'
import { COLOR, FONT, BREAKPOINT } from './tokens'
import reset from './reset'
import { screenMin } from './responsive'

const GlobalStyle = createGlobalStyle`
  ${reset}

  html {
    width: 100%;
    font-size: 16px;

    ${screenMin.m`
      font-size: calc(12px + ${((4 / BREAKPOINT.S) * 100).toFixed(2)}vw);
    `}
  }

  body {
    overflow-x: hidden;
    background: ${COLOR.BACKGROUND};
    --primary-color: ${COLOR.ACCENT.PRIMARY};
    --secondary-color: ${COLOR.ACCENT.SECONDARY};
  }

  ::selection {
    background-color: ${COLOR.HIGHLIGHT};
  }
  
  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  input[type='number'] {
    -moz-appearance: textfield;
  }
  
  textarea,
  input[type='text'],
  input[type='email'],
  input[type='password'],
  input[type='submit'] {
    -webkit-appearance: none;
    box-shadow: none;
  }
  
  button {
    margin: 0;
    padding: 0;
    border: 0;
    background: none;
    color: inherit;
    font: inherit;
    cursor: pointer;

    &:focus {
      outline: 1px dashed var(--secondary-color);
    }

    &:active {
      outline: 1px dashed var(--primary-color);
    }
  }
  
  body,
  input,
  textarea {
    font-family: ${FONT.FAMILY.BODY};
    font-size: ${FONT.SIZE.M};
    font-weight: ${FONT.WEIGHT.REGULAR};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
    color: ${COLOR.TEXT};
    line-height: 1.5;
  }

  a {
    position: relative;
    color: inherit;
    text-decoration: none;

    &:focus {
      outline: 1px dashed var(--secondary-color);
    }

    &:active {
      outline: 1px dashed var(--primary-color);
    }
  }

  h1, h2, h3 {
    margin: 0.5em 0;
  }

  h1 {
    font-size: ${FONT.SIZE.XL};
  }
  
  h2 {
    font-size: ${FONT.SIZE.L};
  }

  p {
    margin: 1em 0;
  }

  ol,
  ul {
    margin: 1em 0;
  }

  svg {
    fill: currentColor;
  }
`
export default GlobalStyle
