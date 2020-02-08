import { graphql } from 'gatsby'

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
