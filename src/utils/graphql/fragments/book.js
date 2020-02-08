import { graphql } from 'gatsby'

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
