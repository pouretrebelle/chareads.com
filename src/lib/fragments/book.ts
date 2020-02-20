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
          fluid(maxWidth: 400, quality: 70) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
    }
    html
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
  }
`
