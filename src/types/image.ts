import { FluidObject, FixedObject } from 'gatsby-image'

export interface GatsbyImageSharpFluid {
  childImageSharp: {
    [key: string]: FluidObject
  }
  colors?: GatsbyColors
}

export interface GatsbyImageSharpFixed {
  childImageSharp: {
    [key: string]: FixedObject
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
