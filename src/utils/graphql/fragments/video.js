import { graphql } from 'gatsby'

// eslint-disable-next-line import/prefer-default-export
export const query = graphql`
  fragment VideoFields on Videos {
    timestamps
    title
    youtubeId
    description
    datePublished
  }
`
