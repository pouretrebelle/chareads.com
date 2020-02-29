import React from 'react'
import styled from 'styled-components'

import Wrapper from 'components/Wrapper'
import { FONT, COLOR } from 'styles/tokens'

const StyledFooter = styled.footer`
  margin-top: 1.5em;
  margin-bottom: 1em;
  padding-top: 0.5em;
  border-top: 1px solid ${COLOR.BACKGROUND_DARK};

  a {
    text-decoration: underline;
    text-decoration-color: ${COLOR.ACCENT.SECONDARY};
  }

  p {
    margin: 0.5em 0;
    font-size: ${FONT.SIZE.XS};
  }
`

const StyledHeart = styled.span`
  color: #ff006a;
  vertical-align: middle;
  line-height: 0;
`

const Footer: React.FC = () => (
  <StyledFooter as={Wrapper}>
    <p>
      This site was made with <a href="https://www.gatsbyjs.org/">Gatsby</a> and{' '}
      {}
      <StyledHeart>&#10084;</StyledHeart> in London by {}
      <a href="https://charlottedann.com">Charlotte Dann</a>.
    </p>
    <p>
      The contents are mostly populated from my {}
      <a href="https://www.youtube.com/chareads">YouTube</a> and {}
      <a href="https://www.goodreads.com/user/show/5008298-charlotte-dann">
        Goodreads
      </a>{' '}
      {}
      accounts. You can find the source code for this website {}
      <a href="https://github.com/pouretrebelle/chareads.com">on Github</a>.
    </p>
  </StyledFooter>
)

export default Footer
