import sharp from 'sharp'

export interface ShareBook {
  slug: string
  bookHeight: number
  image: {
    relativePath: string
    colors: {
      muted: string
    }
  }
}

const OUTPUT_WIDTH = 1200
const OUTPUT_HEIGHT = 630

export const createBookShareImage = async (
  { image, bookHeight }: ShareBook,
  imagePath: string
): Promise<void> => {
  const stream = await sharp(`content/books/${image.relativePath}`)
  const { width, height } = await stream.metadata()

  const coverHeight = Math.round(2.4 * bookHeight)
  const coverWidth = Math.round((coverHeight * width) / height)

  const padV = Math.round((OUTPUT_HEIGHT - coverHeight) / 2)
  const padH = Math.round((OUTPUT_WIDTH - coverWidth) / 2)

  await stream
    .resize({ height: coverHeight, width: coverWidth })
    .extend({
      top: padV,
      bottom: padV,
      left: padH,
      right: padH,
      background: image.colors.muted,
    })
    .toFile(imagePath)
}
