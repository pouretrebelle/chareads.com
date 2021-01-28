export interface GoodreadsBook {
  title: string
  author: string
  isbn13: string
  myRating: string
  publisher: string
  binding: string
  numberOfPages: string
  originalPublicationYear: string
  dateRead: string
  dateAdded: string
  bookshelves: string
  myReview: string
  exclusiveShelf: string
}

export interface DestructedBookTitle {
  title: string
  subtitle?: string
  series?: {
    title: string
    number: number
  }
}

export interface BookIntermediary extends DestructedBookTitle {
  author: string
  publisher?: string
  dateBookPublished: string
  pageCount?: number
  isbn13?: string
  rating5?: number
  readDates: [string, string][]
  dateRated?: string
  dateReviewed?: string
  tags: string[]
  bookHeight: number
  review?: string
  folder: string
}
