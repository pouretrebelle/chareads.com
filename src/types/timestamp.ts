export interface RawTimestamp {
  t: number
  text: string
  book?: {
    fields: {
      slug: string
      links?: {
        short: {
          gr: string
          amzn: string
          bd: string
        }
      }
    }
    frontmatter: {
      title: string
      author: string
      rating7: number
    }
  }
}

export interface Timestamp {
  t: number
  text: string
  book?: {
    slug: string
    title: string
    author: string
    rating7: number
    links?: {
      short: {
        gr: string
        amzn: string
        bd: string
      }
    }
  }
}
