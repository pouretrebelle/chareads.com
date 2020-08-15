import { BookIntermediary } from '../goodreads/types'
import sanitizeYmlString from './sanitizeYmlString'

const bookTemplate = (book: BookIntermediary): string => `---
title: ${sanitizeYmlString(book.title)}
author: ${sanitizeYmlString(book.author)}
publisher: ${sanitizeYmlString(book.publisher)}
image: cover.jpg
dateBookPublished: ${book.dateBookPublished}
pageCount: ${book.pageCount}
bookHeight: ${book.bookHeight}
goodreadsReviewId: ${book.goodreadsReviewId}
isbn13: ${book.isbn13}

summary: |
  ${book.summary}
${
  book.series
    ? `
series:
  title: ${book.series.title}
  number: ${book.series.number}
`
    : ''
}${
  book.rating5
    ? `
rating5: ${book.rating5}`
    : ''
}
rating7: 

readDates: [[${book.readDates[0][0]}, ${book.readDates[0][1]}]]${
  book.dateRated
    ? `
dateRated: ${book.dateRated}`
    : ''
}${
  book.dateReviewed
    ? `
dateReviewed: ${book.dateReviewed}`
    : ''
}

tags: [${book.tags.join(', ')}]
---${
  book.review
    ? `

${book.review}`
    : ''
}
`

export default bookTemplate
