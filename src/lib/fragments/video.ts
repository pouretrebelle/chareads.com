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
      childImageSharp {
        share: fixed(width: 1200, height: 630, fit: COVER, cropFocus: CENTER) {
          src
        }
      }
      childImageColors {
        muted
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
    duration
    slug
    viewCount
    image {
      childImageSharp {
        w200: gatsbyImageData(width: 200)
        w350: gatsbyImageData(width: 350)
      }
      childImageColors {
        vibrant
        lightVibrant
        muted
        darkMuted
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
      childImageSharp {
        w200: gatsbyImageData(width: 200)
        w350: gatsbyImageData(width: 350)
      }
      childImageColors {
        vibrant
        lightVibrant
        muted
        darkMuted
      }
    }
    ownedBy {
      rating7
    }
  }
`
