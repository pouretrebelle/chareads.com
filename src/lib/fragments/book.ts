import { graphql } from 'gatsby'

export const query = graphql`
  fragment BookFields on Book {
    id
    slug
    links {
      long {
        gr
        amzn
        bd
      }
    }
    title
    subtitle
    summary
    tags
    readDates
    rating7
    rating5
    pageCount
    dateRated
    dateBookPublished
    dateReviewed
    dateLastRead
    sortingDate
    author
    publisher
    bookHeight
    series {
      title
      number
    }
    image {
      publicURL
      childImageColors {
        darkVibrant
        lightVibrant
        muted
        darkMuted
      }
    }
    html
    relatedBooks {
      ...BookCardFields
    }
  }

  fragment BookCardFields on Book {
    id
    slug
    title
    author
    rating7
    dateReviewed
    bookHeight
    image {
      publicURL
      childImageColors {
        vibrant
        darkVibrant
        muted
        lightMuted
      }
    }
    video {
      slug
    }
  }

  fragment BookSnapshotFields on Book {
    title
    author
    rating7
    slug
    links {
      short {
        amzn
        bd
        gr
      }
      long {
        amzn
        bd
        gr
      }
    }
  }
`
