import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import Helmet from 'react-helmet'

import { PageProps } from 'types/page'
import BaseStylesheet from 'styles/base'
import Navigation from 'components/Navigation'
import Footer from 'components/Footer'
import { StarSymbols } from 'components/icons/StarIcon'

const ROOT_URL = process.env.GATSBY_ROOT_URL || 'https://chareads.com'

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
`

const StyledContent = styled.main`
  flex: 1 0 0;
`

interface Props extends PageProps {
  children?: React.ReactNode
  navOpenOnDesktop?: boolean
  navInverted?: boolean
  navTitle?: string
  navTitleLink?: string
  title?: string
  description?: string
  shareImage?: string
}

const Layout: React.FC<Props> = ({
  children,
  location,
  navOpenOnDesktop,
  navInverted,
  navTitle,
  navTitleLink,
  title: customTitle,
  description: customDescription,
  shareImage: customShareImage,
}) => {
  const { portrait } = useStaticQuery(graphql`
    query SEOQuery {
      portrait: file(relativePath: { eq: "cover.jpg" }) {
        childImageSharp {
          fixed(width: 1200, height: 630, fit: COVER, cropFocus: SOUTH) {
            src
          }
        }
      }
    }
  `)

  const url = `${ROOT_URL}${location.pathname}`
  const title = `${customTitle ? `${customTitle} | ` : ''}Chareads`
  const description =
    customDescription ||
    'Chareads is my online reading hub, it brings together my book reviews and bookish YouTube videos.'
  const shareImage = `${ROOT_URL}${
    customShareImage || portrait.childImageSharp.fixed.src
  }`
  const favicon = `${ROOT_URL}/favicon.png`

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />
        <link rel="shortcut icon" href={favicon} />
        <link rel="canonical" href={url} />
        <meta property="og:url" content={url} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta name="twitter:description" content={description} />
        <meta property="og:image" content={shareImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          name="twitter:card"
          content={customShareImage ? 'summary_large_image' : 'summary'}
        />
        <meta property="twitter:image" content={shareImage} />
        <meta name="twitter:site" content="@charlotte_dann" />
        <link rel="stylesheet" href="https://use.typekit.net/kay5riy.css" />

        <script
          defer
          data-domain="chareads.com"
          src="https://plausible.io/js/script.js"
        ></script>
      </Helmet>

      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
        {StarSymbols}
      </svg>

      <BaseStylesheet />
      <StyledLayout>
        <Navigation
          location={location}
          openOnDesktop={navOpenOnDesktop}
          title={navTitle}
          titleLink={navTitleLink}
          inverted={navInverted}
        />

        <StyledContent>{children}</StyledContent>

        <Footer />
      </StyledLayout>
    </>
  )
}

export default Layout
