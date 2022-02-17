import { graphql } from 'gatsby'

export const GatsbyImageColors = graphql`
  fragment GatsbyImageColors on ImageColors {
    vibrant
    darkVibrant
    lightVibrant
    muted
    darkMuted
    lightMuted
  }
`
