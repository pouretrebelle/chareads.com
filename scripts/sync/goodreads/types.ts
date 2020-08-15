export interface GoodreadsAuthor {
  name: string
}

export interface GoodreadsShelf {
  name: string
}

export interface GoodreadsReadStatus {
  status: 'read' | string
  updated_at: {
    _: string
  }
}

export interface GoodreadsReview {
  id: number
  book: {
    id: number
    isbn: number
    isbn13?: number
    text_reviews_count: number
    uri: string
    title: string
    title_without_series: string
    image_url: string
    small_image_url: string
    large_image_url: ''
    link: string
    num_pages: number
    format: string
    edition_information: ''
    publisher?: string
    publication_day: number
    publication_year: number
    publication_month: number
    average_rating: number
    ratings_count: number
    description: string
    authors: {
      author: GoodreadsAuthor | GoodreadsAuthor[]
    }
    published: number
  }
  rating: number
  votes: number
  spoiler_flag: false
  spoilers_state: string
  shelves: {
    shelf: GoodreadsShelf | GoodreadsShelf[]
  }
  started_at?: string
  read_at?: string
  read_statuses?: {
    read_status: GoodreadsReadStatus | GoodreadsReadStatus[]
  }
  date_added: string
  date_updated: string
  read_count: number
  body: string
  comments_count: number
  url: string
  link: string
  owned: number
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
  summary: string
  rating5?: number
  readDates: [string, string][]
  dateRated?: string
  dateReviewed?: string
  tags: string[]
  goodreadsReviewId: number
  bookHeight: number
  review?: string
  folder: string
  image: string
}
