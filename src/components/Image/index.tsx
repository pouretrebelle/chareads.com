import React from 'react'

import { Image as ImageType } from 'types/image'

export enum ImageColor {
  DarkMuted = 'darkMuted',
  DarkVibrant = 'darkVibrant',
  LightVibrant = 'lightVibrant',
  Muted = 'muted',
  Vibrant = 'vibrant',
  LightMuted = 'lightMuted',
}

export type ImageProps = {
  image: ImageType
  background?: ImageColor
} & React.ImgHTMLAttributes<HTMLImageElement>

const Image = ({ image, background, style, ...props }: ImageProps) => {
  return (
    <img
      src={image.publicURL}
      style={{
        backgroundColor:
          image.childImageColors[background || ImageColor.DarkMuted],
        ...(style || {}),
      }}
      {...props}
    />
  )
}

export default Image
