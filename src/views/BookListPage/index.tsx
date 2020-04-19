import React, { useState } from 'react'
import { graphql } from 'gatsby'
import styled, { SimpleInterpolation } from 'styled-components'

import { PageProps } from 'types/page'
import { normalizeArray } from 'utils/graphql/normalize'
import Layout from 'Layout'
import { BookCardType } from 'types/book'
import { COLOR, FONT } from 'styles/tokens'
import { screenMin } from 'styles/responsive'
import BookCard from 'components/cards/BookCard'
import ArrowIcon from 'components/icons/ArrowIcon'
import Grid from 'components/Grid'
import GridItem from 'components/Grid/GridItem'
import InfiniteScroll from 'components/InfiniteScroll'
import {
  getTagsFromBooks,
  splitTagsByPrefix,
  filterBooksByTags,
} from 'utils/tags'
import FilterTrigger from './FilterTrigger'

interface BookProps {
  big: boolean
}

const StyledDetails = styled(GridItem)`
  background: ${COLOR.BACKGROUND_LIGHT};
  padding: 1em;
`

interface ArrowProps {
  $down: boolean
}
const StyledArrowIcon = styled(ArrowIcon)<ArrowProps>`
  margin: 0;
  transform: rotate(${({ $down }): number => ($down ? 90 : -90)}deg);
`

const StyledBook = styled(GridItem)<BookProps>`
  ${({ big }): SimpleInterpolation => screenMin.m`
    font-size: ${big ? '1.25em' : FONT.SIZE.S};
  `}
`

interface BookCardTypeWithTags extends BookCardType {
  tags: string[]
}

interface Props extends PageProps {
  data: {
    bookData: {
      edges: {
        node: BookCardTypeWithTags
      }[]
    }
  }
}

const BookListPage: React.FC<Props> = ({ data: { bookData }, location }) => {
  const books = normalizeArray(bookData) as BookCardTypeWithTags[]
  const tags = getTagsFromBooks(books)
  const splitTags = splitTagsByPrefix(tags)

  const [filterType, setFilterType] = useState(undefined)
  const [filterGenre, setFilterGenre] = useState(undefined)
  const [filterSubjects, setFilterSubjects] = useState([])

  const filteredBooks = filterBooksByTags(
    books,
    filterType,
    filterGenre,
    filterSubjects
  )

  return (
    <Layout
      location={location}
      navOpenOnDesktop
      navTitle="Book reviews"
      title="Book reviews"
    >
      <Grid as="ol" full>
        <StyledDetails span={2} spanFromM={6} spanFromL={4}>
          <p>
            Showing {filteredBooks.length} books
            <br />
            <FilterTrigger
              value={filterType}
              defaultLabel="fiction and non-fiction"
              options={splitTags.find((s) => s.prefix === 'Type').values}
              onChange={setFilterType}
            />
            <br />
            in {}
            <FilterTrigger
              value={filterGenre}
              defaultLabel="any genre"
              options={splitTags.find((s) => s.prefix === 'Genre').values}
              onChange={setFilterGenre}
            />
            <br />
            about {}
            <FilterTrigger
              valueArray={filterSubjects}
              defaultLabel="any subject"
              options={splitTags.find((s) => s.prefix === 'Subject').values}
              onChange={setFilterSubjects}
            />
            <br />
            sorted by date read&nbsp;
            <StyledArrowIcon thin $down={true} />
          </p>
        </StyledDetails>

        <InfiniteScroll
          items={filteredBooks}
          renderItem={(book: BookCardType): React.ReactNode => {
            const big = book.rating7 >= 6
            return (
              <StyledBook
                big={big}
                as="li"
                key={book.id}
                span={1}
                spanFromM={big ? 6 : 3}
                spanFromL={big ? 4 : 2}
                spanRowsFromM={big ? 2 : 1}
              >
                <BookCard book={book} featured={big} big={big} />
              </StyledBook>
            )
          }}
        />
      </Grid>
    </Layout>
  )
}

export const query = graphql`
  query BookListPage {
    bookData: allBook(sort: { fields: dateLastRead, order: DESC }) {
      edges {
        node {
          ...BookCardFields
          tags
        }
      }
    }
  }
`

export default BookListPage
