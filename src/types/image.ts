export interface ImageColors {
  darkMuted: string
  darkVibrant: string
  lightVibrant: string
  muted: string
  vibrant: string
  lightMuted: string
}

export interface ImageType {
  fields: {
    staticPath: string
  }
  childImageColors?: Partial<ImageColors>
}
