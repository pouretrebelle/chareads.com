import { graphql } from 'gatsby'

export const query = graphql`
  fragment BookFields on MarkdownRemark {
    id
    frontmatter {
      title
      summary
      tags
      readDates
      rating7
      rating5
      pageCount
      isbn13
      dateRated
      dateBookPublished
      dateReviewed
      author
      image {
        childImageSharp {
          fluid(maxWidth: 915, quality: 70) {
            ...GatsbyImageSharpFluid_withWebp
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
          fluid(maxWidth: 915, quality: 70) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  }
`
