import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import { Book } from 'types/book'
import { VideoSnapshot } from 'types/video/snapshot'
import H from 'components/H'
import { formatTimestamp } from 'utils/formatting/time'

const StyledBookReview = styled.div`
  grid-column: 9 / 15;
`

type BookProps = Pick<Book, 'summary' | 'html'>

interface Props extends BookProps {
  timestampMentions: VideoSnapshot[]
  featuredVideos: VideoSnapshot[]
  bookId: string
}

const BookReview: React.FC<Props> = ({
  summary,
  html,
  timestampMentions,
  featuredVideos,
  bookId,
}) => (
  <StyledBookReview>
    {summary && (
      <details style={{ fontSize: '0.75em' }}>
        <summary>Book sumary</summary>
        {summary}
      </details>
    )}

    {html && <div dangerouslySetInnerHTML={{ __html: html }} />}

    {featuredVideos.length > 0 && (
      <>
        <H as="h3" size="M">
          Featured video{featuredVideos.length > 1 && 's'}
        </H>
        <ol>
          {featuredVideos.map(({ title, slug, image }) => (
            <li key={slug}>
              <Link to={slug}>
                {title}
                <figure style={{ maxWidth: 200, margin: 0 }}>
                  <Img
                    key={image.childImageSharp.fluid.src}
                    fluid={image.childImageSharp.fluid}
                  />
                </figure>
              </Link>
            </li>
          ))}
        </ol>
      </>
    )}

    {timestampMentions.length > 0 && (
      <>
        <H as="h3" size="M">
          Mentions in {featuredVideos.length > 0 && 'other '}videos
        </H>
        <ol>
          {timestampMentions.map((mention) => {
            const timestamp = formatTimestamp(
              mention.timestamps.find((t) => t.book && t.book.id === bookId).t
            )

            return (
              <li key={mention.slug}>
                <Link to={`${mention.slug}?at=${timestamp}`}>
                  {mention.title} at {timestamp}
                  <figure style={{ maxWidth: 200, margin: 0 }}>
                    <Img
                      key={mention.image.childImageSharp.fluid.src}
                      fluid={mention.image.childImageSharp.fluid}
                    />
                  </figure>
                </Link>
              </li>
            )
          })}
        </ol>
      </>
    )}
  </StyledBookReview>
)

export default BookReview
