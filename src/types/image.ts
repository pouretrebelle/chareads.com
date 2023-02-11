import { GatsbyImage } from 'gatsby-plugin-image'

export interface GatsbyImageSharpFluid {
  childImageSharp: {
    [key: string]: typeof GatsbyImage
  }
  colors?: GatsbyColors
}

export interface GatsbyImageSharpFixed {
  childImageSharp: {
    [key: string]: typeof GatsbyImage
  }
  colors?: GatsbyColors
}

export interface GatsbyColors {
  darkMuted: string
  darkVibrant: string
  lightVibrant: string
  muted: string
  vibrant: string
  lightMuted: string
}

export interface Image {
  publicURL: string
  childImageColors?: GatsbyColors
}
