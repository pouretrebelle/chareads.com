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
    author
    publisher
    bookHeight
    series {
      title
      number
    }
    image {
      childImageSharp {
        h200: fixed(height: 200) {
          ...GatsbyImageSharpFixed_noBase64
        }
        h300: fixed(height: 300) {
          ...GatsbyImageSharpFixed_noBase64
        }
        h400: fixed(height: 400) {
          ...GatsbyImageSharpFixed_noBase64
        }
      }
      colors {
        ...GatsbyImageColors
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
        h150: fixed(height: 150) {
          ...GatsbyImageSharpFixed_noBase64
        }
        h350: fixed(height: 350) {
          ...GatsbyImageSharpFixed_noBase64
        }
      }
      colors {
        ...GatsbyImageColors
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
