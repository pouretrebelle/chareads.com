import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import { Image as ImageType } from 'types/image'

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
  wrapperClassName?: string
} & React.ImgHTMLAttributes<HTMLImageElement>

const StyledWrapper = styled.div`
  background: var(--color-bg-card);
  position: relative;
  margin: 0;
  width: inherit;
  height: inherit;

  &[data-aspect-ratio='true'] {
    width: 100%;
    height: 0;
    overflow: hidden;
    padding-bottom: var(--aspect-ratio);
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
  wrapperClassName,
  style,
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

  const formatPath = ({ width }: { width: number }): string => {
    if (process.env.GATSBY_RESPONSIVE_IMAGES !== 'true') return image.publicURL

    return `https://wsrv.nl/?url=${process.env.GATSBY_ROOT_URL}${image.publicURL}&w=${width}`
  }

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

  /* eslint-disable jsx-a11y/alt-text, @next/next/no-img-element */
  return (
    <StyledWrapper
      className={wrapperClassName}
      ref={imageWrapperElement}
      data-aspect-ratio={!!aspectRatio}
      style={
        aspectRatio
          ? ({
              '--aspect-ratio': `${Math.round(aspectRatio * 10000) / 100}%`,
            } as React.CSSProperties)
          : {}
      }
    >
      {imageWidth !== 0 && (
        <StyledImage
          ref={imageElement}
          src={formatPath({ width: imageWidth })}
          onLoad={onLoad}
          loading={lazy ? 'lazy' : 'eager'}
          width={imageWidth}
          height={imageWidth * (aspectRatio || 1)}
          className={className}
          data-has-loaded={hasLoaded}
          style={{
            backgroundColor:
              image.childImageColors[background || ImageColor.DarkMuted],
            ...(style || {}),
          }}
          {...props}
        />
      )}
    </StyledWrapper>
  )
}

export default ResponsiveImage
