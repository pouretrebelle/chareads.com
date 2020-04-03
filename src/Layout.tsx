import React from 'react'
import Helmet from 'react-helmet'

import { PageProps } from 'types/page'
import BaseStylesheet from 'styles/base'
import Navigation from 'components/Navigation'
import Footer from 'components/Footer'
import { useStaticQuery, graphql } from 'gatsby'

const {
  GATSBY_GOOGLE_ANALYTICS_ID: GOOGLE_ANALYTICS_ID,
  GATSBY_ROOT_URL: ROOT_URL,
} = process.env

interface Props extends PageProps {
  children?: React.ReactNode
  navOpenOnDesktop?: boolean
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
  navTitle,
  navTitleLink,
  title: customTitle,
  description: customDescription,
  shareImage: customShareImage,
}) => {
  const { portrait } = useStaticQuery(graphql`
    query SEOQuery {
      portrait: file(relativePath: { eq: "portrait.jpg" }) {
        childImageSharp {
          fixed(width: 1200, height: 630, fit: COVER, cropFocus: CENTER) {
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
  const shareImage = `${ROOT_URL}${customShareImage ||
    portrait.childImageSharp.fixed.src}`
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
        <meta property="twitter:image" content={shareImage} />
        <meta name="twitter:site" content="@charlotte_dann" />
        <link rel="stylesheet" href="https://use.typekit.net/kay5riy.css" />

        {GOOGLE_ANALYTICS_ID && (
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
          ></script>
        )}
        {GOOGLE_ANALYTICS_ID && (
          <script>
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GOOGLE_ANALYTICS_ID}');`}
          </script>
        )}
      </Helmet>

      <BaseStylesheet />
      <Navigation
        location={location}
        openOnDesktop={navOpenOnDesktop}
        title={navTitle}
        titleLink={navTitleLink}
      />

      {children}

      <Footer />
    </>
  )
}

export default Layout
