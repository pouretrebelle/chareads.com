import { graphql } from 'gatsby'

export const GatsbyImageColors = graphql`
  fragment GatsbyImageColors on FileColors {
    vibrant
    darkVibrant
    lightVibrant
    muted
    darkMuted
    lightMuted
  }
`
