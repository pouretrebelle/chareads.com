import { FluidObject } from 'gatsby-image'

export interface GatsbyImageSharpFluid {
  childImageSharp: {
    fluid: FluidObject
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
