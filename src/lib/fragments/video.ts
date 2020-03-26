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
        ...BookSnapshotFields
      }
    }
    image {
      colors {
        ...GatsbyImageColors
      }
    }
    ownedBy {
      ...BookSnapshotFields
    }
    relatedBooks {
      ...BookCardFields
    }
  }

  fragment VideoCardFields on Videos {
    id
    title
    datePublished
    featured
    youtubeId
    fields {
      slug
      viewCount
    }
    image {
      childImageSharp {
        w200: fluid(maxWidth: 200) {
          ...GatsbyImageSharpFluid_noBase64
        }
        w350: fluid(maxWidth: 350) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
      colors {
        ...GatsbyImageColors
      }
    }
    ownedBy {
      rating7
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
    youtubeId
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
        w200: fluid(maxWidth: 200) {
          ...GatsbyImageSharpFluid_noBase64
        }
        w350: fluid(maxWidth: 350) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
      colors {
        ...GatsbyImageColors
      }
    }
  }
`
