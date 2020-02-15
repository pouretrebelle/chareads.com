import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import { RawBook, Book } from 'types/book'
import { normalizeItem } from 'utils/graphql/normalize'
import Layout from 'Layout'
import H from 'components/H'

interface Props {
  data: {
    bookData: RawBook
  }
}

const BookPage: React.FC<Props> = ({ data: { bookData } }) => {
  const book = normalizeItem(bookData) as Book

  return (
    <Layout>
      <H as="h2" size="L" decorative>
        {book.title}
      </H>
      <H as="h2" size="M">
        by {book.author}
      </H>

      <figure style={{ maxWidth: 200, margin: 0 }}>
        <Img
          key={book.image.childImageSharp.fluid.src}
          fluid={book.image.childImageSharp.fluid}
        />
      </figure>
    </Layout>
  )
}

export const query = graphql`
  query BookPage($id: String!) {
    bookData: markdownRemark(id: { eq: $id }) {
      ...BookFields
    }
  }
`

export default BookPage
