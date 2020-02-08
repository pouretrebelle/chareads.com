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
    image {
      childImageSharp {
        fluid(maxWidth: 915, quality: 70) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
