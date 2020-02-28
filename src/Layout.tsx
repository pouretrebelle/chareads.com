import React from 'react'
import Helmet from 'react-helmet'

import BaseStylesheet from 'styles/base'
import Navigation from 'components/Navigation'

interface Props {
  children?: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => (
  <>
    <Helmet>
      <link rel="stylesheet" href="https://use.typekit.net/kay5riy.css" />
    </Helmet>

    <BaseStylesheet />
    <Navigation />

    {children}
  </>
)

export default Layout
