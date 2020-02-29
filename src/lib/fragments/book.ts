import { graphql } from 'gatsby'

export const query = graphql`
  fragment BookFields on MarkdownRemark {
    id
    fields {
      slug
      links {
        long {
          gr
          amzn
          bd
        }
      }
    }
    frontmatter {
      title
      summary
      tags
      readDates
      rating7
      rating5
      pageCount
      dateRated
      dateBookPublished
      dateReviewed
      author
      image {
        childImageSharp {
          fluid(maxHeight: 450) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
        colors {
          ...GatsbyImageColors
        }
      }
    }
    html
    relatedBooks {
      ...BookCardFields
    }
  }

  fragment BookCardFields on MarkdownRemark {
    id
    fields {
      slug
    }
    frontmatter {
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
    }
    video {
      fields {
        slug
      }
    }
  }
`
