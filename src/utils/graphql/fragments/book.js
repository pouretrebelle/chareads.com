import { graphql } from 'gatsby'

// eslint-disable-next-line import/prefer-default-export
export const query = graphql`
  fragment BookFields on MarkdownRemark {
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
    }
    html
  }
`
