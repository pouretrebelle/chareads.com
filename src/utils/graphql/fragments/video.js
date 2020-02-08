import { graphql } from 'gatsby'

// eslint-disable-next-line import/prefer-default-export
export const query = graphql`
  fragment VideoFields on Videos {
    title
    youtubeId
    description
    datePublished
    fields {
      timestamps {
        text
        timestamp
        reference {
          title
          author
          slug
        }
      }
    }
  }
`
