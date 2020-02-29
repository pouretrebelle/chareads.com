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
              amzn
              bd
              gr
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
    ownedBy {
      frontmatter {
        rating7
      }
    }
    timestamps {
      book {
        id
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
