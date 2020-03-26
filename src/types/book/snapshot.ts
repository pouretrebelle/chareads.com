export interface BookSnapshot {
  slug: string
  title: string
  author: string
  rating7: number
  links: {
    long: {
      gr: string
      amzn: string
      bd: string
    }
  }
}
