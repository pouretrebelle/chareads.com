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
      childImageSharp {
        h200: gatsbyImageData(height: 200)
        h300: gatsbyImageData(height: 300)
        h400: gatsbyImageData(height: 400)
      }
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
      childImageSharp {
        h150: gatsbyImageData(height: 150)
        h350: gatsbyImageData(height: 350)
      }
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
