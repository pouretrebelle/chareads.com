export interface RawTimestamp {
  t: number
  text: string
  book?: {
    fields: {
      slug: string
      links?: {
        long?: {
          gr: string
          amzn: string
          bd: string
        }
        short?: {
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
      long?: {
        gr: string
        amzn: string
        bd: string
      }
      short?: {
        gr: string
        amzn: string
        bd: string
      }
    }
  }
}
