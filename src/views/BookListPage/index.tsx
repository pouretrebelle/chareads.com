import React, { useState } from 'react'
import { graphql } from 'gatsby'
import styled, { SimpleInterpolation } from 'styled-components'

import { PageProps } from 'types/page'
import { normalizeArray } from 'utils/graphql/normalize'
import Layout from 'Layout'
import { BookCardType } from 'types/book'
import { COLOR, FONT } from 'styles/tokens'
import { screenMin } from 'styles/responsive'
import Link from 'components/links/Link'
import BookCard from 'components/cards/BookCard'
import Grid from 'components/Grid'
import GridItem from 'components/Grid/GridItem'
import InfiniteScroll from 'components/InfiniteScroll'
import { getTagsFromBooks, filterBooksByTags, TagPrefix } from 'utils/tags'
import FilterTrigger from './FilterTrigger'
import PATHS from 'routes/paths'
import useQueryParamSync from 'utils/hooks/useQueryParamSync'

interface BookProps {
  big: boolean
}

const StyledDetails = styled(GridItem)`
  background: ${COLOR.BACKGROUND_LIGHT};
  padding: 1em;
`

const StyledBook = styled(GridItem)<BookProps>`
  ${({ big }): SimpleInterpolation => screenMin.m`
    font-size: ${big ? '1.25em' : FONT.SIZE.S};
  `}
`

const StyledClearFilterButton = styled(Link)`
  font-size: 0.75em;
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

  const [filterType, setFilterType] = useState(undefined)
  const [filterGenre, setFilterGenre] = useState(undefined)
  const [filterSubjects, setFilterSubjects] = useState([])

  const [isInitialisingFilter] = useQueryParamSync(
    PATHS.BOOKS,
    location.search,
    [
      {
        key: 'type',
        value: filterType,
        setter: setFilterType,
        isArray: false,
      },
      {
        key: 'genre',
        value: filterGenre,
        setter: setFilterGenre,
        isArray: false,
      },
      {
        key: 'subject',
        value: filterSubjects,
        setter: setFilterSubjects,
        isArray: true,
      },
    ]
  )

  const filteredBooks = filterBooksByTags(
    books,
    filterType,
    filterGenre,
    filterSubjects
  )

  const hasFilter = filterType || filterGenre || filterSubjects.length > 0

  const getOptions = (prefix: TagPrefix): string[] => {
    const optionBooks = hasFilter
      ? filterBooksByTags(
          books,
          filterType,
          filterGenre,
          filterSubjects,
          prefix
        )
      : books
    return getTagsFromBooks(optionBooks, prefix)
  }

  return (
    <Layout
      location={location}
      navOpenOnDesktop
      navTitle="Book reviews"
      title="Book reviews"
    >
      {(!isInitialisingFilter || location.search === '') && (
        <Grid as="ol" full>
          <StyledDetails span={2} spanFromM={6} spanFromL={4}>
            <p>
              Showing {filteredBooks.length} books
              <br />
              <FilterTrigger
                value={filterType}
                defaultLabel="fiction and non-fiction"
                options={getOptions('type')}
                onChange={setFilterType}
              />
              <br />
              in {}
              <FilterTrigger
                value={filterGenre}
                defaultLabel="any genre"
                options={getOptions('genre')}
                onChange={setFilterGenre}
              />
              <br />
              about {}
              <FilterTrigger
                valueArray={filterSubjects}
                defaultLabel="any subject"
                options={getOptions('sub')}
                onChange={setFilterSubjects}
              />
              {hasFilter && (
                <>
                  <br />
                  <StyledClearFilterButton
                    as="button"
                    onClick={() => {
                      setFilterType(undefined)
                      setFilterGenre(undefined)
                      setFilterSubjects([])
                    }}
                  >
                    clear filter
                  </StyledClearFilterButton>
                </>
              )}
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
      )}
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
