import { graphql } from 'gatsby'

export const query = graphql`
  fragment VideoFields on Videos {
    id
    title
    youtubeId
    description
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
    image {
      childImageSharp {
        fluid(maxWidth: 915, quality: 70) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }

  fragment VideoCardFields on Videos {
    id
    title
    datePublished
    fields {
      slug
    }
    image {
      childImageSharp {
        fluid(maxWidth: 915, quality: 70) {
          ...GatsbyImageSharpFluid_withWebp
        }
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
        fluid(maxWidth: 500, quality: 70) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
