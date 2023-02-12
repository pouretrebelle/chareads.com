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
    commentCount
    timestamps {
      t
      text
      link
      book {
        ...BookSnapshotFields
      }
    }
    image {
      publicURL
      childImageColors {
        muted
      }
    }
    book {
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
    duration
    slug
    viewCount
    image {
      publicURL
      childImageColors {
        vibrant
        lightVibrant
        muted
        darkMuted
      }
    }
    book {
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
    duration
    slug
    viewCount
    timestamps {
      t
      book {
        id
      }
    }
    image {
      publicURL
      childImageColors {
        vibrant
        lightVibrant
        muted
        darkMuted
      }
    }
    book {
      rating7
    }
  }
`
