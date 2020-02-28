import React from 'react'
import Helmet from 'react-helmet'

import { PageProps } from 'types/page'
import BaseStylesheet from 'styles/base'
import Navigation from 'components/Navigation'
import Footer from 'components/Footer'

interface Props extends PageProps {
  children?: React.ReactNode
}

const Layout: React.FC<Props> = ({ children, location }) => (
  <>
    <Helmet>
      <link rel="stylesheet" href="https://use.typekit.net/kay5riy.css" />
    </Helmet>

    <BaseStylesheet />
    <Navigation location={location} />

    {children}

    <Footer />
  </>
)

export default Layout
