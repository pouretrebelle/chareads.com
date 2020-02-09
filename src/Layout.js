import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'

import BaseStylesheet from 'styles/base'
import H from 'components/H'

const Layout = ({ children }) => (
  <>
    <Helmet>
      <link rel="stylesheet" href="https://use.typekit.net/kay5riy.css" />
    </Helmet>

    <BaseStylesheet />
    <H as="h1" size="XL" decorative>
      <Link to="/">Chareads</Link>
    </H>

    {children}
  </>
)

export default Layout
