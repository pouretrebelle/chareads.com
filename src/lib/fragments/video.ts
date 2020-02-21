import { graphql } from 'gatsby'

export const query = graphql`
  fragment VideoFields on Videos {
    id
    title
    youtubeId
    description
    quote
    datePublished
    timestamps {
      t
      text
      book {
        fields {
          slug
        }
        frontmatter {
          title
          author
          rating7
        }
      }
    }
    ownedBy {
      fields {
        slug
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
    }
  }
`
