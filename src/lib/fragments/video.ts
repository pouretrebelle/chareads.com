import { graphql } from 'gatsby'

export const query = graphql`
  fragment VideoFields on Videos {
    id
    title
    youtubeId
    description
    quote
    datePublished
    fields {
      viewCount
    }
    timestamps {
      t
      text
      book {
        fields {
          slug
          links {
            long {
              gr
              amzn
              bd
            }
            short {
              gr
              amzn
              bd
            }
          }
        }
        frontmatter {
          title
          author
          rating7
        }
      }
    }
    image {
      colors {
        ...GatsbyImageColors
      }
    }
    ownedBy {
      fields {
        slug
        links {
          long {
            amzn
            bd
            gr
          }
          short {
            gr
            amzn
            bd
          }
        }
      }
      frontmatter {
        rating7
      }
    }
  }

  fragment VideoCardFields on Videos {
    id
    title
    datePublished
    featured
    fields {
      slug
      viewCount
    }
    image {
      childImageSharp {
        fluid(maxWidth: 200, quality: 70) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
      colors {
        ...GatsbyImageColors
      }
    }
  }

  fragment VideoSnapshotFields on Videos {
    id
    title
    datePublished
    fields {
      slug
      viewCount
    }
    timestamps {
      t
      book {
        id
      }
    }
    image {
      childImageSharp {
        fluid(maxWidth: 200, quality: 70) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
      colors {
        ...GatsbyImageColors
      }
    }
  }
`
