import { FluidObject, FixedObject } from 'gatsby-image'

export interface GatsbyImageSharpFluid {
  childImageSharp: {
    fluid: FluidObject
  }
  colors?: GatsbyColors
}

export interface GatsbyImageSharpFixed {
  childImageSharp: {
    h150: FixedObject
    h350: FixedObject
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
