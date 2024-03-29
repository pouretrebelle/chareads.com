import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import { ImageType as ImageType } from 'types/image'
import { formatImagePath } from 'utils/urls/image'

const INITIAL_WIDTH = 200

export enum ImageColor {
  DarkMuted = 'darkMuted',
  DarkVibrant = 'darkVibrant',
  LightVibrant = 'lightVibrant',
  Muted = 'muted',
  Vibrant = 'vibrant',
  LightMuted = 'lightMuted',
}

export type Props = {
  image: ImageType
  background?: ImageColor
  aspectRatio?: number
  lazy: boolean
} & React.ImgHTMLAttributes<HTMLImageElement>

const StyledWrapper = styled.div`
  background: var(--color-bg-card);
  position: relative;
  margin: 0;
  width: inherit;
  height: inherit;
  overflow: hidden;

  &[data-aspect-ratio='true'] {
    width: 100%;
    height: 0;
    overflow: hidden;
    padding-bottom: var(--aspect-ratio);

    img {
      position: absolute;
      height: 100%;
      object-fit: cover;
    }
  }
`

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  transition: opacity 0.1s linear;
  opacity: 0;

  &[data-has-loaded='true'],
  [data-js='false'] & {
    opacity: 1;
  }
`

const ResponsiveImage: React.FC<Props> = ({
  image,
  background,
  aspectRatio,
  className,
  lazy,
  style,
  children,
  ...props
}) => {
  const imageWrapperElement = useRef<HTMLDivElement>(null)
  const imageElement = useRef<HTMLImageElement>(null)
  const [imageWidth, setImageWidth] = useState(INITIAL_WIDTH)
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    setHasLoaded(false)
  }, [image])

  useEffect(() => {
    const newWidth = calculateWidth()

    // if the final image has already loaded after the JS initiates, show the image
    if (newWidth <= INITIAL_WIDTH && imageElement?.current?.complete) {
      onLoad()
    }

    window.addEventListener('resize', calculateWidth)

    return () => {
      window.removeEventListener('resize', calculateWidth)
    }
  }, [])

  const calculateWidth = (): number => {
    const pixelRatio = window.devicePixelRatio || 1
    const newWidth = imageWrapperElement?.current?.clientWidth

    // don't resize if it's smaller than the current
    if (!newWidth || newWidth * pixelRatio < imageWidth)
      return newWidth ?? INITIAL_WIDTH

    // round up to the nearest 50
    const roundedWidth = Math.ceil((newWidth * pixelRatio) / 50) * 50
    setImageWidth(roundedWidth)

    return roundedWidth
  }

  const onLoad = () => {
    setHasLoaded(true)
  }

  /* eslint-disable jsx-a11y/alt-text */
  return (
    <StyledWrapper
      className={className}
      ref={imageWrapperElement}
      data-aspect-ratio={!!aspectRatio}
      style={
        {
          backgroundColor: image.childImageColors
            ? image.childImageColors[background || ImageColor.DarkMuted]
            : undefined,
          '--aspect-ratio': aspectRatio
            ? `${Math.round(aspectRatio * 10000) / 100}%`
            : undefined,
          ...(style || {}),
        } as React.CSSProperties
      }
    >
      {imageWidth !== 0 && (
        <StyledImage
          ref={imageElement}
          src={formatImagePath(image.fields.staticPath, { w: imageWidth })}
          onLoad={onLoad}
          loading={lazy ? 'lazy' : 'eager'}
          width={imageWidth}
          height={imageWidth * (aspectRatio || 1)}
          data-has-loaded={hasLoaded}
          style={{}}
          {...props}
        />
      )}
      {children}
    </StyledWrapper>
  )
}

export default ResponsiveImage
