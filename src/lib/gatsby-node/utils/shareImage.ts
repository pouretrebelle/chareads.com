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
const SVG_BUFFER = 40
const SHADOW_BLUR = 15
const SHADOW_OFFSET = 6
const SHADOW_OPACITY = 0.3

export const createBookShareImage = async (
  { image, bookHeight }: ShareBook,
  imagePath: string
): Promise<void> => {
  const stream = await sharp(`content/books/${image.relativePath}`)
  const { width, height } = await stream.metadata()

  const coverHeight = Math.round(2.4 * bookHeight)
  const coverWidth = Math.round((coverHeight * width) / height)

  const blur = await sharp(
    Buffer.from(`
      <svg
        width="${coverWidth + SVG_BUFFER * 2}"
        height="${coverHeight + SVG_BUFFER * 2}"
      >
        <rect
          width="${coverWidth}"
          height="${coverHeight}"
          x="${SVG_BUFFER}"
          y="${SVG_BUFFER + SHADOW_OFFSET}"
          fill="rgba(0, 0, 0, ${SHADOW_OPACITY})"
        />
      </svg>`)
  )
    .blur(SHADOW_BLUR)
    .toBuffer()

  const cover = await stream
    .resize({
      height: coverHeight,
      width: coverWidth,
    })
    .toBuffer()

  await sharp({
    create: {
      width: OUTPUT_WIDTH,
      height: OUTPUT_HEIGHT,
      channels: 3,
      background: image.colors.muted,
    },
  })
    .composite([
      { input: blur, blend: 'multiply' },
      { input: cover, blend: 'over' },
    ])
    .jpeg()
    .toFile(imagePath)
}
