import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'

import BaseStylesheet from 'styles/base'
import Wrapper from 'components/Wrapper'
import H from 'components/H'

interface Props {
  children?: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => (
  <>
    <Helmet>
      <link rel="stylesheet" href="https://use.typekit.net/kay5riy.css" />
    </Helmet>

    <BaseStylesheet />
    <Wrapper>
      <H as="h1" size="XL" decorative>
        <Link to="/">Chareads</Link>
      </H>
    </Wrapper>

    {children}
  </>
)

export default Layout
