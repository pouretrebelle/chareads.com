import { graphql } from 'gatsby'

export const query = graphql`
  fragment VideoFields on Video {
    id
    title
    youtubeId
    html
    quote
    datePublished
    viewCount
    timestamps {
      t
      text
      book {
        ...BookSnapshotFields
      }
    }
    image {
      childImageSharp {
        share: fixed(width: 1200, height: 630, fit: COVER, cropFocus: CENTER) {
          src
        }
      }
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

  fragment VideoCardFields on Video {
    id
    title
    datePublished
    featured
    youtubeId
    slug
    viewCount
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

  fragment VideoSnapshotFields on Video {
    id
    title
    datePublished
    youtubeId
    slug
    viewCount
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
