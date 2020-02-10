import React from 'react'
import { Link } from 'gatsby'

const timestampToString = (time) => `${Math.floor(time / 60)}:${time % 60}`

const TimestampList = ({ data, books }) => {
  const structuredData = data.map(({ reference, ...otherData }) => {
    const referredBook = books.find(
      (book) => reference && book.slug === reference.slug
    )

    return {
      ...otherData,
      reference: referredBook || null,
    }
  })

  return !structuredData.length ? null : (
    <ol>
      {structuredData.map(({ text, timestamp, reference }) => (
        <li key={timestamp}>
          <time>{timestampToString(timestamp)}</time>
          &ensp;
          <span>
            {reference ? <Link to={reference.slug}>{text}</Link> : text}
          </span>
        </li>
      ))}
    </ol>
  )
}

export default TimestampList
