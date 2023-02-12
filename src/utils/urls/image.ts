import qs from 'qs'

export const formatImagePath = (
  imagePath: string,
  args: Record<string, string | number>
): string => {
  if (process.env.GATSBY_RESPONSIVE_IMAGES !== 'true') return imagePath

  return `https://wsrv.nl/?url=${
    process.env.GATSBY_ROOT_URL
  }${imagePath}&${qs.stringify(args)}`
}
